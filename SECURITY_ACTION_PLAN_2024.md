# Security Action Plan - Production Release
**Date:** December 2024  
**Priority:** 🔴 **CRITICAL - DO NOT DEPLOY WITHOUT FIXES**

---

## Quick Summary

**18 vulnerabilities found** - **4 CRITICAL** must be fixed before production.

**Estimated Time to Production-Ready:** 2-3 days for critical fixes.

---

## 🚨 PHASE 1: CRITICAL FIXES (MUST FIX BEFORE PRODUCTION)

### 1. Fix SQL Injection Risk in Search Endpoint
**File:** `src/app/api/cryptocurrencies/search/route.ts:62`  
**Time:** 2 hours  
**Priority:** 🔴 CRITICAL

**Current Code:**
```typescript
.or(`name.ilike."${searchPattern}",symbol.ilike."${searchPattern}",slug.ilike."${searchPattern}"`)
```

**Fix:**
```typescript
// Remove quotes around searchPattern - let Supabase handle escaping
const escapedPattern = query.replace(/%/g, '\\%').replace(/_/g, '\\_')
const { data, error } = await supabase
  .from('cryptocurrencies')
  .select('id, name, symbol, slug, logo')
  .or(`name.ilike.%${escapedPattern}%,symbol.ilike.%${escapedPattern}%,slug.ilike.%${escapedPattern}%`)
  .order('cmc_rank', { ascending: true, nullsFirst: false })
  .limit(10)
```

**Test:** Try search queries with special characters: `%`, `_`, `'`, `"`, `;`

---

### 2. Fix CSRF Token Storage (HttpOnly Issue)
**File:** `src/middleware.ts:28`  
**Time:** 2 hours  
**Priority:** 🔴 CRITICAL

**Current Code:**
```typescript
httpOnly: false, // Allow JavaScript to read it
```

**Fix Option A (Recommended - Double Submit Cookie):**
```typescript
// Set HttpOnly cookie for server validation
response.cookies.set('csrf-token', token, {
  httpOnly: true, // Changed to true
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24,
  path: '/',
})

// Set separate non-HttpOnly cookie for client-side reading
response.cookies.set('csrf-token-header', token, {
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24,
  path: '/',
})
```

**Then update client code** to read from `csrf-token-header` cookie instead of `csrf-token`.

**Fix Option B (Header-based):**
```typescript
// Set HttpOnly cookie
response.cookies.set('csrf-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 24,
  path: '/',
})

// Add to response header for client-side access
response.headers.set('X-CSRF-Token', token)
```

**Test:** Verify CSRF protection still works after change.

---

### 3. Harden Content Security Policy
**File:** `next.config.js:56`  
**Time:** 3-4 hours  
**Priority:** 🔴 CRITICAL

**Current Code:**
```javascript
"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://s3.tradingview.com ..."
```

**Fix:**
1. **Remove `unsafe-eval`** - Test TradingView compatibility first
2. **Implement nonces for inline scripts**:

```javascript
// In middleware, generate nonce
const nonce = crypto.randomBytes(16).toString('base64')
response.headers.set('X-CSP-Nonce', nonce)

// In next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            `script-src 'self' 'nonce-{nonce}' https://s3.tradingview.com https://*.tradingview.com`,
            // Remove 'unsafe-eval' and 'unsafe-inline'
            "style-src 'self' 'unsafe-inline' https://*.tradingview.com", // Keep unsafe-inline for now if needed
            // ... rest of CSP
          ].join('; ')
        }
      ]
    }
  ]
}
```

**Note:** Next.js doesn't support dynamic nonces in `next.config.js` easily. Consider:
- Using middleware to set CSP header dynamically
- Or use `next-safe` package for CSP management

**Test:** Verify TradingView charts still work, no CSP violations in console.

---

### 4. Fix Google Analytics XSS Risk
**File:** `src/components/GoogleAnalytics.tsx:37`  
**Time:** 1 hour  
**Priority:** 🔴 CRITICAL

**Current Code:**
```typescript
gtag('config', '${gaId}', {
```

**Fix:**
```typescript
// Validate and sanitize gaId
const sanitizedGaId = gaId?.replace(/[^a-zA-Z0-9-]/g, '') || ''
if (!sanitizedGaId || sanitizedGaId.length > 20) {
  return null // Invalid GA ID
}

gtag('config', '${sanitizedGaId}', {
  page_path: window.location.pathname,
});
```

**Test:** Try setting `NEXT_PUBLIC_GA_ID` to malicious values, verify it's sanitized.

---

### 5. Fix DOMPurify SSR Issue
**File:** `src/components/CryptoDescription.tsx:14-26`  
**Time:** 2 hours  
**Priority:** 🔴 CRITICAL

**Current Code:**
```typescript
if (typeof window !== 'undefined' && DOMPurify) {
  return DOMPurify.sanitize(html, {...})
}
return html // Unsanitized during SSR!
```

**Fix:**
```bash
npm install isomorphic-dompurify
```

```typescript
import DOMPurify from 'isomorphic-dompurify'

function sanitizeHTML(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
    ALLOWED_TAGS: ['a', 'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  })
}
```

**Test:** Verify HTML is sanitized during SSR (check server-rendered HTML).

---

### 6. Add Slug Parameter Validation
**File:** `src/app/[cryptoName]/page.tsx:57`  
**Time:** 1 hour  
**Priority:** 🔴 CRITICAL

**Current Code:**
```typescript
const { cryptoName } = await params
crypto = await getCryptocurrencyBySlug(cryptoName)
```

**Fix:**
```typescript
import { z } from 'zod'

const slugSchema = z.string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Invalid slug format')

const { cryptoName } = await params
const validation = slugSchema.safeParse(cryptoName)

if (!validation.success) {
  notFound()
}

crypto = await getCryptocurrencyBySlug(validation.data)
```

**Test:** Try accessing URLs with invalid slugs, special characters, very long slugs.

---

## ⚠️ PHASE 2: HIGH PRIORITY FIXES (Fix This Week)

### 7. Implement Distributed Rate Limiting
**File:** `src/lib/rate-limit.ts`  
**Time:** 4-6 hours  
**Priority:** 🟠 HIGH

**Issue:** In-memory rate limiting won't work in serverless/multi-instance environments.

**Fix:**
```bash
npm install @upstash/redis
```

Set up Upstash Redis (free tier available):
1. Create account at https://upstash.com
2. Create Redis database
3. Get REST URL and token
4. Add to environment variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

**Update `src/lib/rate-limit.ts`:**
```typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export async function checkRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = `ratelimit:${identifier}`
  const windowSeconds = Math.ceil(windowMs / 1000)
  
  const count = await redis.incr(key)
  
  if (count === 1) {
    await redis.expire(key, windowSeconds)
  }
  
  const ttl = await redis.ttl(key)
  const resetAt = Date.now() + (ttl * 1000)
  
  return {
    allowed: count <= maxRequests,
    remaining: Math.max(0, maxRequests - count),
    resetAt,
  }
}
```

**Test:** Verify rate limiting works across multiple requests.

---

### 8. Verify Database RLS Migration
**File:** `supabase/migrations/005_fix_rls_policies.sql`  
**Time:** 1 hour  
**Priority:** 🟠 HIGH

**Action:**
1. Log into Supabase dashboard
2. Go to SQL Editor
3. Run this query to check policies:
   ```sql
   SELECT 
     schemaname,
     tablename,
     policyname,
     permissive,
     roles,
     cmd,
     qual,
     with_check
   FROM pg_policies
   WHERE tablename = 'cryptocurrencies';
   ```

4. Verify that policies "Allow authenticated users to insert" and "Allow authenticated users to update" do NOT exist
5. If they exist, run migration `005_fix_rls_policies.sql`

**Document:** Add verification step to deployment checklist.

---

### 9. Improve API Key Security
**File:** `src/app/api/cryptocurrencies/sync/route.ts:165`  
**Time:** 2-3 hours  
**Priority:** 🟠 HIGH

**Fix 1: Constant-time comparison**
```typescript
import { timingSafeEqual } from 'crypto'

// Replace simple comparison
if (!apiKey || apiKey !== expectedApiKey) {

// With constant-time comparison
const providedKey = Buffer.from(apiKey || '', 'utf8')
const expectedKey = Buffer.from(expectedApiKey, 'utf8')

if (providedKey.length !== expectedKey.length || 
    !timingSafeEqual(providedKey, expectedKey)) {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  )
}
```

**Fix 2: Add audit logging**
```typescript
import { logger } from '@/lib/errors'
import { getClientIdentifier } from '@/lib/rate-limit'

// After API key check
logger.info('API key usage', {
  endpoint: '/api/cryptocurrencies/sync',
  ip: getClientIdentifier(request),
  success: true, // or false if unauthorized
  timestamp: new Date().toISOString(),
})
```

**Test:** Verify logging works, test timing attack resistance (optional).

---

## 📋 PHASE 3: MEDIUM PRIORITY (This Month)

### 10. Add Dependency Scanning
**Time:** 2 hours  
**Priority:** 🟡 MEDIUM

**Action:**
1. Add to `.github/workflows/ci.yml` (or create it):
   ```yaml
   name: Security Scan
   on: [push, pull_request]
   jobs:
     audit:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm audit --audit-level=moderate
   ```

2. Enable Dependabot in GitHub:
   - Go to Settings → Security → Dependabot alerts
   - Enable Dependabot security updates

---

### 11. Implement Security Monitoring
**Time:** 4-6 hours  
**Priority:** 🟡 MEDIUM

**Action:**
1. Set up Sentry (free tier available):
   ```bash
   npm install @sentry/nextjs
   ```

2. Configure in `sentry.client.config.ts` and `sentry.server.config.ts`

3. Add security event logging:
   ```typescript
   // In API routes
   logger.warn('Security event', {
     type: 'rate_limit_exceeded',
     ip: getClientIdentifier(request),
     endpoint: request.nextUrl.pathname,
     timestamp: new Date().toISOString(),
   })
   ```

4. Set up alerts for:
   - Multiple failed auth attempts
   - Rate limit violations
   - Unusual API usage

---

### 12. Improve Cron Security
**File:** `src/app/api/cryptocurrencies/sync/route.ts:185`  
**Time:** 2-3 hours  
**Priority:** 🟡 MEDIUM

**Fix:** Add HMAC signature verification for external cron services:
```typescript
// For external cron services (not Vercel)
if (cronSecret && !isVercelCron) {
  const signature = request.headers.get('x-cron-signature')
  const expectedSignature = crypto
    .createHmac('sha256', cronSecret)
    .update(request.url + request.method)
    .digest('hex')
  
  if (signature !== expectedSignature) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
```

**Test:** Verify cron still works with Vercel, test external cron with signature.

---

## ✅ CHECKLIST BEFORE PRODUCTION

### Critical Fixes (Must Complete)
- [ ] Fix SQL injection in search endpoint
- [ ] Fix CSRF token HttpOnly issue
- [ ] Remove unsafe-eval from CSP (test TradingView)
- [ ] Fix Google Analytics XSS risk
- [ ] Fix DOMPurify SSR issue
- [ ] Add slug parameter validation

### High Priority Fixes (Should Complete)
- [ ] Implement distributed rate limiting
- [ ] Verify database RLS migration applied
- [ ] Improve API key security (constant-time comparison, logging)

### Testing
- [ ] Test all fixes work correctly
- [ ] Verify no functionality broken
- [ ] Test with malicious input
- [ ] Check CSP violations in browser console
- [ ] Verify rate limiting works
- [ ] Test API authentication

### Documentation
- [ ] Update deployment checklist
- [ ] Document security measures
- [ ] Create incident response plan

---

## 📊 ESTIMATED TIME

- **Phase 1 (Critical):** 11-13 hours (2-3 days)
- **Phase 2 (High Priority):** 7-10 hours (1-2 days)
- **Phase 3 (Medium Priority):** 9-13 hours (ongoing)

**Total for Production-Ready:** 18-23 hours (3-5 days)

---

## 🚀 DEPLOYMENT RECOMMENDATION

**DO NOT DEPLOY** until all Phase 1 (Critical) fixes are:
1. ✅ Completed
2. ✅ Tested
3. ✅ Verified
4. ✅ Documented

After Phase 1 fixes, the application will be **production-ready** from a security perspective, though Phase 2 fixes should be completed within the first week.

---

**Last Updated:** December 2024  
**Next Review:** After Phase 1 fixes are applied

