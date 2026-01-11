# Vercel Deployment Checklist

## ✅ Build Status
**Local Build:** ✅ Successful
- All pages compile correctly
- No TypeScript errors
- No linting errors
- Middleware compiles successfully

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- ✅ `COINMARKETCAP_API_KEY` - Your CoinMarketCap API key
- ✅ `ADMIN_API_KEY` - Secret API key for POST sync endpoint (generate with `openssl rand -hex 32`)

**Optional but Recommended:**
- `NEXT_PUBLIC_SITE_URL` - Your production domain (e.g., `https://yourdomain.com`)
  - Fixes metadataBase warning
  - Required for proper Open Graph images
- `CRON_SECRET` - Secret for external cron services (if not using Vercel cron)

### 2. Database Migration
**Important:** Run the RLS policy fix migration in Supabase:

```sql
-- Run this in Supabase SQL Editor
-- File: supabase/migrations/005_fix_rls_policies.sql
```

Or via Supabase CLI:
```bash
supabase db push
```

### 3. Vercel Configuration
✅ `vercel.json` is configured correctly:
- Cron job set to run every 15 minutes
- Path: `/api/cryptocurrencies/sync`

### 4. Build Configuration
✅ `next.config.js` is configured:
- Security headers configured
- Image domains whitelisted
- CSP policy configured for TradingView

## 🚀 Deployment Steps

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Security fixes and deployment ready"
   git push
   ```

2. **Deploy to Vercel**
   - If connected via Git: Push will auto-deploy
   - If manual: Use Vercel CLI or dashboard

3. **Set Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all required variables listed above
   - Make sure to set them for Production, Preview, and Development environments

4. **Verify Deployment**
   - Check build logs for any errors
   - Test the homepage loads
   - Test search functionality
   - Test a cryptocurrency detail page
   - Verify TradingView charts load

5. **Test Cron Job**
   - Wait for the next hour (cron runs at :00)
   - Or manually trigger: `GET https://your-domain.com/api/cryptocurrencies/sync`
   - Check Vercel logs for cron execution

## 🔍 Post-Deployment Verification

### Test These Endpoints:

1. **Homepage**
   ```
   GET https://your-domain.com/
   ```
   - Should load without errors
   - Check browser console for CSP violations

2. **Search API**
   ```
   GET https://your-domain.com/api/cryptocurrencies/search?q=bitcoin
   ```
   - Should return results
   - Check rate limiting headers

3. **Crypto Detail Page**
   ```
   GET https://your-domain.com/bitcoin
   ```
   - Should load cryptocurrency details
   - TradingView chart should render
   - No CSP blocking errors

4. **Sync Endpoint (Protected)**
   ```
   POST https://your-domain.com/api/cryptocurrencies/sync
   Headers: x-api-key: YOUR_ADMIN_API_KEY
   ```
   - Should return 401 without API key
   - Should work with valid API key

5. **Cron Endpoint**
   ```
   GET https://your-domain.com/api/cryptocurrencies/sync
   ```
   - Should work (Vercel cron automatically includes x-vercel-cron header)

### Check Security Headers

Use a tool like [securityheaders.com](https://securityheaders.com) to verify:
- ✅ HSTS header present
- ✅ CSP header present
- ✅ X-Frame-Options present
- ✅ X-Content-Type-Options present

### Check Browser Console

- No CSP violations
- No JavaScript errors
- TradingView widget loads correctly

## ⚠️ Common Issues & Solutions

### Issue: metadataBase Warning
**Solution:** Set `NEXT_PUBLIC_SITE_URL` environment variable in Vercel

### Issue: TradingView Charts Blocked
**Solution:** Already fixed - CSP allows TradingView domains. If still blocked, check browser console for specific CSP violations.

### Issue: Cron Job Not Running
**Solution:** 
- Verify `vercel.json` is in root directory
- Check Vercel Dashboard → Settings → Cron Jobs
- Verify environment variables are set

### Issue: API Routes Return 500
**Solution:**
- Check Vercel function logs
- Verify all environment variables are set
- Check Supabase connection

### Issue: Rate Limiting Not Working
**Solution:** 
- In-memory rate limiting resets on server restart (expected)
- For production, consider Upstash Redis for persistent rate limiting

## 📊 Monitoring

After deployment, monitor:

1. **Vercel Analytics**
   - Function execution times
   - Error rates
   - Build success rates

2. **Error Logs**
   - Check Vercel Dashboard → Logs
   - Set up alerts for errors

3. **Rate Limiting**
   - Monitor 429 responses
   - Adjust limits if needed

4. **Cron Job**
   - Verify it runs every 15 minutes
   - Check sync success in logs

## 🔐 Security Verification

After deployment, verify:

- ✅ Security headers are present (use securityheaders.com)
- ✅ HTTPS is enforced (HSTS header)
- ✅ CSP is working (no violations in console)
- ✅ API endpoints require authentication where needed
- ✅ Rate limiting is active
- ✅ Error messages don't expose internal details

## 📝 Notes

- The metadataBase warning is expected if `NEXT_PUBLIC_SITE_URL` is not set
- In-memory rate limiting resets on server restart (this is normal)
- CSRF tokens are generated per-request in middleware
- Database RLS policies must be updated via migration

## ✅ Ready for Deployment

All checks passed! The application is ready for Vercel deployment.

**Last Verified:** Build successful ✅
**Status:** Ready to deploy 🚀

