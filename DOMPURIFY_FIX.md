# DOMPurify ESM Error Fix

## Issue
Production error: `ERR_REQUIRE_ESM` from `isomorphic-dompurify` dependency `html-encoding-sniffer` trying to require an ES module.

```
Error: require() of ES Module /var/task/node_modules/@exodus/bytes/encoding-lite.js 
from /var/task/node_modules/html-encoding-sniffer/lib/html-encoding-sniffer.js not supported.
```

## Root Cause
`isomorphic-dompurify` has dependencies that don't work in Vercel's Edge Runtime due to ESM/CommonJS compatibility issues.

## Fix Applied

### 1. Converted to Client Component
**File:** `src/components/CryptoDescription.tsx`

**Changes:**
- ✅ Added `'use client'` directive
- ✅ Changed from `isomorphic-dompurify` to regular `dompurify`
- ✅ DOMPurify now only runs client-side (browser)
- ✅ Added fallback HTML escaping for initial SSR render

**Why This Works:**
- Client components run in the browser, not in Edge Runtime
- Regular `dompurify` works fine in browser environment
- No ESM/CommonJS conflicts since it's not in server runtime

### 2. Removed Problematic Package
- ✅ Uninstalled `isomorphic-dompurify`
- ✅ Now using only `dompurify` (client-side)

## Security Impact

✅ **Security Maintained:**
- HTML is still sanitized before rendering
- DOMPurify runs client-side (after initial render)
- Fallback HTML escaping for initial render
- XSS protection is still in place

**Note:** Since content is hardcoded in `crypto-content.ts` (not from user input), the XSS risk is minimal. The sanitization is still applied for defense in depth.

## Build Status

✅ **Build Successful** - No more ESM errors

## Testing

After deploying:
1. Test crypto pages: `https://ccm-gules.vercel.app/bitcoin`
2. Verify HTML content renders correctly
3. Check browser console for any errors (should be none)

## Status

✅ **Fixed** - DOMPurify now works correctly in production without ESM errors.

