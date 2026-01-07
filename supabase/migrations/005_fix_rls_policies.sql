-- Fix overly permissive RLS policies
-- Remove INSERT/UPDATE policies for authenticated users
-- Only service role should be able to modify cryptocurrency data

-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON cryptocurrencies;
DROP POLICY IF EXISTS "Allow authenticated users to update" ON cryptocurrencies;

-- Note: Public read access remains (for SELECT operations)
-- Note: Service role full access remains (for server-side operations via API)

-- If you need authenticated users to modify data in the future, create more restrictive policies:
-- Example (commented out):
-- CREATE POLICY "Allow authenticated users to update only custom fields"
--   ON cryptocurrencies
--   FOR UPDATE
--   TO authenticated
--   USING (true)
--   WITH CHECK (
--     -- Only allow updates to specific user-generated fields
--     -- Not core cryptocurrency data from CoinMarketCap
--     true  -- Add specific field checks here
--   );

