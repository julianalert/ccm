# Supabase Setup Guide

## Environment Variables

Add the following to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Service Role Key (for server-side operations)
# Get this from: Supabase Dashboard > Settings > API > service_role key
# ⚠️ NEVER expose this key in client-side code!
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# CoinMarketCap API Key
# Get this from: https://coinmarketcap.com/api/
# Sign up for an API key and add it here
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key
```

### Where to find these values:

1. **Project URL & Anon Key:**
   - Go to https://app.supabase.com
   - Select your project
   - Go to **Settings** → **API**
   - Copy the **Project URL** and **anon public** key

2. **Service Role Key:**
   - Same location: **Settings** → **API**
   - Copy the **service_role** key (keep this secret!)

## Running the Migration

### Option 1: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref your-project-ref
   ```

3. Run the migration:
   ```bash
   supabase db push
   ```

### Option 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_create_cryptocurrencies_table.sql`
4. Paste and run the SQL in the SQL Editor

## Table Structure

The `cryptocurrencies` table stores all data from the CoinMarketCap Listings Latest API:

- **Primary fields**: cmc_id, name, symbol, slug, cmc_rank, etc.
- **Quote data**: Stored as JSONB to support multiple currency conversions
- **Platform data**: Stored as JSONB for token platform metadata
- **Tags**: Stored as JSONB array
- **Timestamps**: `created_at` and `updated_at` for tracking

## Row Level Security (RLS)

The table has the following RLS policies:

- **Public read access**: Anyone can read cryptocurrency data
- **Authenticated users**: Can insert and update data
- **Service role**: Full access (for server-side operations)

## Usage Examples

### Server-side (API Routes or Server Components)

```typescript
import { upsertCryptocurrencies, getCryptocurrencies } from '@/lib/db/cryptocurrencies'

// Upsert data from CoinMarketCap API
await upsertCryptocurrencies(apiResponse.data)

// Get all cryptocurrencies
const cryptos = await getCryptocurrencies(100, 0)
```

### Client-side (React Components)

```typescript
import { supabase } from '@/lib/supabase'

// Query data
const { data, error } = await supabase
  .from('cryptocurrencies')
  .select('*')
  .order('cmc_rank')
  .limit(10)
```

