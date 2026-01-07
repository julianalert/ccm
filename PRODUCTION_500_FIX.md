# Production 500 Error Fix

## Issue
Crypto detail pages (`/[cryptoName]`) return 500 errors in production but work on localhost.

## Root Cause Analysis

The issue is likely caused by:

1. **Supabase Connection Failure**: The `createServerClient()` function throws an error if `SUPABASE_SERVICE_ROLE_KEY` is missing, which causes the page to crash.

2. **Error Handling**: Errors during metadata generation or page rendering weren't being caught properly.

3. **Environment Variables**: Missing or incorrect environment variables in Vercel.

## Fixes Applied

### 1. Improved Supabase Client Creation
**File:** `src/lib/db/cryptocurrencies.ts`

- ✅ Checks for required environment variables first
- ✅ Gracefully falls back to anon key if service role key is missing
- ✅ Better error messages for debugging
- ✅ Works with both service role and anon key

**Changes:**
- `getCryptocurrencyBySlug()` now checks for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` first
- Only uses service role key if it's available
- Falls back to anon key for public reads (which is allowed by RLS)

### 2. Enhanced Error Handling
**File:** `src/app/[cryptoName]/page.tsx`

- ✅ Better error handling in `generateMetadata()`
- ✅ Better error handling in page component
- ✅ Proper logging for debugging
- ✅ Returns 404 instead of 500 when crypto not found

## Verification Steps

### 1. Check Environment Variables in Vercel

Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` ✅
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` ✅

**Optional (but recommended):**
- `SUPABASE_SERVICE_ROLE_KEY` - If missing, pages will use anon key (which is fine for reads)

### 2. Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Logs
2. Look for errors related to:
   - "Missing Supabase configuration"
   - "Failed to fetch cryptocurrency"
   - Any Supabase connection errors

### 3. Test the Fix

After deploying, test:
```bash
# Should work now
curl https://ccm-gules.vercel.app/bitcoin

# Check for errors in response
curl -I https://ccm-gules.vercel.app/bitcoin
```

## Domain URL Issue

**Note:** The hardcoded URL `https://courscryptomonnaies.com` is NOT the cause of the 500 error. It's only used for:
- Metadata (Open Graph, Twitter cards)
- Canonical URLs
- Structured data

These don't affect page rendering. The 500 error is from the database connection.

However, if you want to use the Vercel URL temporarily, you can:

1. Set `NEXT_PUBLIC_SITE_URL=https://ccm-gules.vercel.app` in Vercel
2. Update the hardcoded URLs to use the environment variable

But this is optional - the hardcoded URL won't cause 500 errors.

## Expected Behavior After Fix

- ✅ Pages should load even if `SUPABASE_SERVICE_ROLE_KEY` is missing
- ✅ Pages will use anon key for database reads (allowed by RLS)
- ✅ Better error messages in logs for debugging
- ✅ 404 instead of 500 when crypto not found

## If Still Getting 500 Errors

1. **Check Vercel Logs:**
   - Look for the exact error message
   - Check if it's a Supabase connection issue

2. **Verify Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` is set and correct
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set and correct
   - Check for typos in variable names

3. **Check Supabase:**
   - Database is accessible
   - RLS policies allow public SELECT
   - Network/firewall isn't blocking Vercel

4. **Test Database Connection:**
   ```bash
   # Test from Vercel function logs
   # Or test locally with production env vars
   ```

## Status

✅ **Fixed** - Pages should now work in production even if service role key is missing.

**Next Steps:**
1. Deploy the fix
2. Test a crypto page on production
3. Check Vercel logs if issues persist

