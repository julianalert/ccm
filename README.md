# Salient

Salient is a [Tailwind Plus](https://tailwindcss.com/plus) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started with this template, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

You can start editing this template by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## Environment Variables

Make sure to set the following environment variables:

- `COINMARKETCAP_API_KEY` - Your CoinMarketCap API key for fetching cryptocurrency data
- `CRON_SECRET` (optional) - A secret token to protect the cron job endpoint from unauthorized access
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)
- `ADMIN_API_KEY` - A secret API key to protect the POST sync endpoint (generate a secure random string)

## Database Migration

After deploying, run the database migration to fix RLS policies:

```bash
# Using Supabase CLI
supabase db push

# Or manually run: supabase/migrations/005_fix_rls_policies.sql
```

This migration removes overly permissive database policies, ensuring only the service role can modify cryptocurrency data.

## Automatic Cryptocurrency Sync (Cron Job)

The application includes an automatic cryptocurrency sync that runs every hour. The sync fetches the latest cryptocurrency data from CoinMarketCap and updates the database.

### Setup on Vercel (Recommended)

If you're deploying on Vercel, the cron job is automatically configured via `vercel.json`. The sync will run every hour (at the top of each hour).

1. Deploy your application to Vercel
2. Make sure your environment variables are set in Vercel dashboard
3. The cron job will automatically be enabled

### Setup with External Cron Service

If you're not using Vercel, you can use an external cron service like [cron-job.org](https://cron-job.org) or [EasyCron](https://www.easycron.com):

1. Set up a cron job that calls: `GET https://your-domain.com/api/cryptocurrencies/sync`
2. If you've set `CRON_SECRET`, include it in the Authorization header: `Bearer YOUR_CRON_SECRET`
3. Set the schedule to run every hour (cron expression: `0 * * * *`)

### Manual Sync

You can manually trigger a sync by making a POST request to `/api/cryptocurrencies/sync` with the `x-api-key` header:

```bash
curl -X POST https://your-domain.com/api/cryptocurrencies/sync \
  -H "x-api-key: YOUR_ADMIN_API_KEY"
```

**Note:** The sync button in the header is disabled by default for security. The POST endpoint requires the `ADMIN_API_KEY` to be set in your environment variables.

## License

This site template is a commercial product and is licensed under the [Tailwind Plus license](https://tailwindcss.com/plus/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
