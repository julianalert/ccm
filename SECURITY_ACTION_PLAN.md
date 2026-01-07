# Security Remediation Action Plan

This document provides a detailed, step-by-step action plan to fix all identified security vulnerabilities.

---

## PHASE 1: CRITICAL FIXES (Week 1)

### 1.1 Fix XSS Vulnerabilities in CryptoDescription Component

**Priority:** CRITICAL  
**Estimated Time:** 2-3 hours  
**Files to Modify:** `src/components/CryptoDescription.tsx`

**Steps:**
1. Install DOMPurify: `npm install dompurify @types/dompurify`
2. Replace `dangerouslySetInnerHTML` with sanitized content
3. Add CSP headers to allow inline styles if needed

**Implementation:**
```typescript
import DOMPurify from 'dompurify'

// In renderSection function, replace:
<p key={index} className="text-gray-700 leading-relaxed mb-6" 
   dangerouslySetInnerHTML={{ __html: section.content as string }} />

// With:
<p key={index} className="text-gray-700 leading-relaxed mb-6" 
   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content as string) }} />

// Same for list items
<li key={itemIndex} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
```

**Note:** For server-side rendering, use `isomorphic-dompurify` instead.

---

### 1.2 Secure POST Endpoint for Sync

**Priority:** CRITICAL  
**Estimated Time:** 3-4 hours  
**Files to Modify:** `src/app/api/cryptocurrencies/sync/route.ts`, `src/components/Header.tsx`

**Steps:**
1. Create API key authentication middleware
2. Generate secure API keys for admin users
3. Store API keys in environment variables
4. Update POST handler to require authentication
5. Remove or secure the sync button in Header component

**Implementation:**
```typescript
// src/app/api/cryptocurrencies/sync/route.ts
export async function POST(request: NextRequest) {
  try {
    // Check for API key in header
    const apiKey = request.headers.get('x-api-key')
    const expectedApiKey = process.env.ADMIN_API_KEY
    
    if (!expectedApiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }
    
    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const result = await syncCryptocurrencies()
    // ... rest of code
  }
}
```

**Alternative:** Use Supabase Auth to verify authenticated admin users:
```typescript
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser(
    request.headers.get('authorization')?.replace('Bearer ', '')
  )
  
  if (error || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user is admin (requires admin table or role check)
  // ... rest of code
}
```

---

### 1.3 Add Security Headers

**Priority:** CRITICAL  
**Estimated Time:** 2-3 hours  
**Files to Modify:** `next.config.js`

**Implementation:**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.coinmarketcap.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://s3.tradingview.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co https://pro-api.coinmarketcap.com",
              "frame-src 'self' https://s3.tradingview.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

**Note:** Adjust CSP based on your actual requirements. Test thoroughly as CSP can break functionality if too restrictive.

---

### 1.4 Fix SQL Injection Risk in Search Endpoint

**Priority:** CRITICAL  
**Estimated Time:** 1-2 hours  
**Files to Modify:** `src/app/api/cryptocurrencies/search/route.ts`

**Implementation:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { z } from 'zod'

// Input validation schema
const searchQuerySchema = z.object({
  q: z.string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Invalid characters in search query')
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const rawQuery = searchParams.get('q')
    
    // Validate input
    const validationResult = searchQuerySchema.safeParse({ q: rawQuery })
    if (!validationResult.success || !rawQuery) {
      return NextResponse.json({ data: [] })
    }
    
    const query = validationResult.data.q.trim().toLowerCase()
    
    if (query.length < 1) {
      return NextResponse.json({ data: [] })
    }

    const supabase = createServerClient()

    // Use proper Supabase query methods with parameterization
    const searchPattern = `%${query}%`
    const { data, error } = await supabase
      .from('cryptocurrencies')
      .select('id, name, symbol, slug, logo')
      .or(`name.ilike."${searchPattern}",symbol.ilike."${searchPattern}",slug.ilike."${searchPattern}"`)
      .order('cmc_rank', { ascending: true, nullsFirst: false })
      .limit(10)

    if (error) {
      console.error('Error searching cryptocurrencies:', error)
      return NextResponse.json(
        { error: 'Failed to search cryptocurrencies' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [] })
  } catch (error) {
    console.error('Error in search route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

**Install Zod:** `npm install zod`

---

### 1.5 Implement Input Validation and Sanitization

**Priority:** CRITICAL  
**Estimated Time:** 2-3 hours  
**Files to Create:** `src/lib/validation.ts`  
**Files to Modify:** All API routes

**Create validation utility:**
```typescript
// src/lib/validation.ts
import { z } from 'zod'

export const searchQuerySchema = z.object({
  q: z.string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9\s\-_]+$/)
    .transform(val => val.trim().toLowerCase())
})

export const slugSchema = z.string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/)

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000) // Max length
}
```

---

## PHASE 2: HIGH PRIORITY (Week 2-3)

### 2.1 Review and Tighten Database RLS Policies

**Priority:** HIGH  
**Estimated Time:** 2-3 hours  
**Files to Modify:** `supabase/migrations/001_create_cryptocurrencies_table.sql`

**Current Issue:** Policies allow any authenticated user to insert/update

**Fix:**
```sql
-- Remove overly permissive policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON cryptocurrencies;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON cryptocurrencies;

-- Only service role should modify data
-- Public read access is fine (already exists)
-- Service role full access is fine (already exists)
```

**If user modifications are needed later:**
```sql
-- Only allow updates to specific fields, with validation
CREATE POLICY "Allow authenticated users to update limited fields"
  ON cryptocurrencies
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (
    -- Only allow updates to user-generated content fields
    -- Not core cryptocurrency data
    true  -- Add specific field checks here
  );
```

---

### 2.2 Implement Rate Limiting

**Priority:** HIGH  
**Estimated Time:** 4-6 hours  
**Files to Create:** `src/lib/rate-limit.ts`, `src/middleware.ts`  
**Files to Modify:** All API routes

**Option 1: Using Upstash Redis (Recommended for Vercel)**
```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// src/lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Different limiters for different endpoints
export const searchLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
  analytics: true,
})

export const syncLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1, '1 h'), // 1 request per hour
  analytics: true,
})
```

```typescript
// src/app/api/cryptocurrencies/search/route.ts
import { searchLimiter } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Get client identifier (IP address)
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  
  const { success, limit, remaining } = await searchLimiter.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'Retry-After': '10'
        }
      }
    )
  }
  
  // ... rest of code
}
```

**Option 2: Simple in-memory rate limiting (for development)**
```typescript
// src/lib/rate-limit-simple.ts
const requestCounts = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const record = requestCounts.get(identifier)
  
  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs }
  }
  
  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt }
  }
  
  record.count++
  return { allowed: true, remaining: maxRequests - record.count, resetAt: record.resetAt }
}
```

---

### 2.3 Add Proper Error Handling

**Priority:** HIGH  
**Estimated Time:** 2-3 hours  
**Files to Create:** `src/lib/errors.ts`  
**Files to Modify:** All API routes

**Create error handling utility:**
```typescript
// src/lib/errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Log full error details server-side
  console.error('API Error:', {
    error,
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString()
  })
  
  // Return generic error to client
  if (error instanceof AppError && error.isOperational) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  
  // Don't expose internal errors
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  )
}
```

**Update API routes:**
```typescript
// src/app/api/cryptocurrencies/sync/route.ts
import { handleApiError } from '@/lib/errors'

export async function POST(request: NextRequest) {
  try {
    // ... code
  } catch (error) {
    return handleApiError(error)
  }
}
```

---

### 2.4 Add Input Validation with Length Limits

**Priority:** HIGH  
**Estimated Time:** Already covered in 1.4 and 1.5  
**Status:** ✅ Included in Phase 1 fixes

---

### 2.5 Configure HTTPS Enforcement and HSTS

**Priority:** HIGH  
**Estimated Time:** 1 hour  
**Files to Modify:** `next.config.js`, Vercel configuration

**Already covered in 1.3 (Security Headers)** - HSTS header is included.

**Additional Vercel Configuration:**
- Ensure HTTPS is enabled in Vercel project settings
- Redirect HTTP to HTTPS (usually automatic on Vercel)

---

## PHASE 3: MEDIUM PRIORITY (Week 4-5)

### 3.1 Implement CSRF Protection

**Priority:** MEDIUM  
**Estimated Time:** 3-4 hours  
**Files to Create:** `src/lib/csrf.ts`  
**Files to Modify:** API routes, forms

**Implementation:**
```typescript
// src/lib/csrf.ts
import { randomBytes } from 'crypto'

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  // In production, use secure session storage
  // For now, simple comparison
  return token === sessionToken && token.length === 64
}
```

**For Next.js App Router, use middleware:**
```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add CSRF token to response headers for state-changing requests
  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
    const response = NextResponse.next()
    // CSRF validation would happen in API routes
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```

---

### 3.2 Add Request Size Limits

**Priority:** MEDIUM  
**Estimated Time:** 1-2 hours  
**Files to Modify:** `next.config.js`

**Implementation:**
```javascript
// next.config.js
const nextConfig = {
  // ... existing config
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
  // API route body size is handled by Next.js default (1mb)
  // For custom limits, add validation in routes
}
```

**Add validation in routes:**
```typescript
// In API routes
const contentLength = request.headers.get('content-length')
if (contentLength && parseInt(contentLength) > 1024 * 1024) { // 1MB
  return NextResponse.json(
    { error: 'Request too large' },
    { status: 413 }
  )
}
```

---

### 3.3 Set Up Logging and Monitoring

**Priority:** MEDIUM  
**Estimated Time:** 4-6 hours  
**Files to Create:** `src/lib/logger.ts`

**Option 1: Using structured logging**
```typescript
// src/lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: Record<string, any>
}

export const logger = {
  info: (message: string, metadata?: Record<string, any>) => {
    log('info', message, metadata)
  },
  warn: (message: string, metadata?: Record<string, any>) => {
    log('warn', message, metadata)
  },
  error: (message: string, error?: Error, metadata?: Record<string, any>) => {
    log('error', message, { ...metadata, error: error?.message, stack: error?.stack })
  },
  debug: (message: string, metadata?: Record<string, any>) => {
    if (process.env.NODE_ENV === 'development') {
      log('debug', message, metadata)
    }
  }
}

function log(level: LogLevel, message: string, metadata?: Record<string, any>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(metadata && { metadata })
  }
  
  // In production, send to logging service (Sentry, LogRocket, etc.)
  console.log(JSON.stringify(entry))
}
```

**Option 2: Integrate Sentry**
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

---

### 3.4 Add Dependency Vulnerability Scanning

**Priority:** MEDIUM  
**Estimated Time:** 1-2 hours  
**Files to Create:** `.github/workflows/security.yml`

**Create GitHub Actions workflow:**
```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm audit --audit-level=moderate
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

**Add to package.json:**
```json
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix"
  }
}
```

---

### 3.5 Fix or Remove Non-Functional Authentication Pages

**Priority:** MEDIUM  
**Estimated Time:** 2-4 hours  
**Files to Modify:** `src/app/(auth)/login/page.tsx`, `src/app/(auth)/register/page.tsx`

**Option 1: Remove pages (if not needed)**
- Delete the `(auth)` directory
- Remove links to login/register

**Option 2: Implement Supabase Auth**
```typescript
// src/app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  // ... rest of component
}
```

---

## PHASE 4: BEST PRACTICES (Ongoing)

### 4.1 Create .env.example File

**Priority:** LOW  
**Estimated Time:** 30 minutes

**Create `.env.example`:**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# CoinMarketCap API
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key

# Admin API Key (for sync endpoint)
ADMIN_API_KEY=your-admin-api-key

# Cron Secret (optional)
CRON_SECRET=your-cron-secret

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

### 4.2 Document Security Practices

**Priority:** LOW  
**Estimated Time:** 2-3 hours

Create `SECURITY.md` with:
- Security reporting process
- Dependency update process
- Security review checklist
- Incident response plan

---

## IMPLEMENTATION CHECKLIST

### Phase 1 (Critical)
- [ ] Fix XSS in CryptoDescription.tsx
- [ ] Secure POST sync endpoint
- [ ] Add security headers
- [ ] Fix SQL injection risk
- [ ] Add input validation

### Phase 2 (High Priority)
- [ ] Tighten RLS policies
- [ ] Implement rate limiting
- [ ] Add error handling
- [ ] Configure HTTPS/HSTS

### Phase 3 (Medium Priority)
- [ ] CSRF protection
- [ ] Request size limits
- [ ] Logging/monitoring
- [ ] Dependency scanning
- [ ] Fix auth pages

### Phase 4 (Best Practices)
- [ ] Create .env.example
- [ ] Security documentation
- [ ] Regular security reviews

---

## TESTING AFTER FIXES

1. **Manual Testing:**
   - Test all API endpoints with invalid input
   - Verify rate limiting works
   - Check security headers with browser dev tools
   - Test XSS protection with malicious input

2. **Automated Testing:**
   - Run `npm audit`
   - Use securityheaders.com to test headers
   - Run OWASP ZAP scan
   - Test with Burp Suite

3. **Performance Testing:**
   - Verify rate limiting doesn't break legitimate use
   - Check that security headers don't impact performance

---

## ESTIMATED TIMELINE

- **Phase 1:** 1 week (40 hours)
- **Phase 2:** 1-2 weeks (30-40 hours)
- **Phase 3:** 1-2 weeks (20-30 hours)
- **Phase 4:** Ongoing (5-10 hours)

**Total:** 4-6 weeks for complete remediation

---

## NOTES

- Test each fix thoroughly before moving to the next
- Some fixes may require infrastructure changes (e.g., Redis for rate limiting)
- Consider staging environment for testing security fixes
- Document all changes for future reference

