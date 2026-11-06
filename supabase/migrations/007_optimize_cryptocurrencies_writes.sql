-- Reduce write amplification on public.cryptocurrencies.
--
-- Background (from pg_stat_statements): the 15-minute sync upserts ~5000 rows
-- and rewrites every column of every row, whether or not anything changed.
-- Each rewrite also maintains a GIN index on the whole `quote` JSONB document
-- and a btree on `last_updated`, both of which change on every sync and are
-- not used by any query in the application.
--
-- This migration:
--   1. adds upsert_cryptocurrencies(jsonb): a change-aware upsert that only
--      touches rows whose ingested values actually differ;
--   2. drops indexes that are duplicates of unique constraints or unused;
--   3. lowers the table fillfactor so updates can stay on the same page (HOT).

-- ---------------------------------------------------------------------------
-- 1. Change-aware upsert
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.upsert_cryptocurrencies(rows jsonb)
RETURNS integer
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  affected integer;
BEGIN
  INSERT INTO public.cryptocurrencies (
    cmc_id, name, symbol, slug, cmc_rank, num_market_pairs,
    circulating_supply, total_supply, market_cap_by_total_supply, max_supply,
    infinite_supply, last_updated, date_added, tags,
    self_reported_circulating_supply, self_reported_market_cap, tvl_ratio,
    platform, quote
  )
  SELECT
    r.cmc_id, r.name, r.symbol, r.slug, r.cmc_rank, r.num_market_pairs,
    r.circulating_supply, r.total_supply, r.market_cap_by_total_supply, r.max_supply,
    COALESCE(r.infinite_supply, false), r.last_updated, r.date_added,
    COALESCE(r.tags, '[]'::jsonb),
    r.self_reported_circulating_supply, r.self_reported_market_cap, r.tvl_ratio,
    r.platform, COALESCE(r.quote, '{}'::jsonb)
  FROM jsonb_populate_recordset(NULL::public.cryptocurrencies, rows) AS r
  WHERE r.cmc_id IS NOT NULL
  ON CONFLICT (cmc_id) DO UPDATE SET
    name = EXCLUDED.name,
    symbol = EXCLUDED.symbol,
    slug = EXCLUDED.slug,
    cmc_rank = EXCLUDED.cmc_rank,
    num_market_pairs = EXCLUDED.num_market_pairs,
    circulating_supply = EXCLUDED.circulating_supply,
    total_supply = EXCLUDED.total_supply,
    market_cap_by_total_supply = EXCLUDED.market_cap_by_total_supply,
    max_supply = EXCLUDED.max_supply,
    infinite_supply = EXCLUDED.infinite_supply,
    last_updated = EXCLUDED.last_updated,
    date_added = EXCLUDED.date_added,
    tags = EXCLUDED.tags,
    self_reported_circulating_supply = EXCLUDED.self_reported_circulating_supply,
    self_reported_market_cap = EXCLUDED.self_reported_market_cap,
    tvl_ratio = EXCLUDED.tvl_ratio,
    platform = EXCLUDED.platform,
    quote = EXCLUDED.quote
  -- Skip the UPDATE entirely when nothing ingested has changed. Skipped rows
  -- are not rewritten, their indexes are untouched, and the updated_at
  -- trigger does not fire for them.
  WHERE (
    cryptocurrencies.name, cryptocurrencies.symbol, cryptocurrencies.slug,
    cryptocurrencies.cmc_rank, cryptocurrencies.num_market_pairs,
    cryptocurrencies.circulating_supply, cryptocurrencies.total_supply,
    cryptocurrencies.market_cap_by_total_supply, cryptocurrencies.max_supply,
    cryptocurrencies.infinite_supply, cryptocurrencies.last_updated,
    cryptocurrencies.date_added, cryptocurrencies.tags,
    cryptocurrencies.self_reported_circulating_supply,
    cryptocurrencies.self_reported_market_cap, cryptocurrencies.tvl_ratio,
    cryptocurrencies.platform, cryptocurrencies.quote
  ) IS DISTINCT FROM (
    EXCLUDED.name, EXCLUDED.symbol, EXCLUDED.slug,
    EXCLUDED.cmc_rank, EXCLUDED.num_market_pairs,
    EXCLUDED.circulating_supply, EXCLUDED.total_supply,
    EXCLUDED.market_cap_by_total_supply, EXCLUDED.max_supply,
    EXCLUDED.infinite_supply, EXCLUDED.last_updated,
    EXCLUDED.date_added, EXCLUDED.tags,
    EXCLUDED.self_reported_circulating_supply,
    EXCLUDED.self_reported_market_cap, EXCLUDED.tvl_ratio,
    EXCLUDED.platform, EXCLUDED.quote
  );

  GET DIAGNOSTICS affected = ROW_COUNT;
  RETURN affected;
END;
$$;

-- Only the server-side sync (service role) may call this.
REVOKE ALL ON FUNCTION public.upsert_cryptocurrencies(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.upsert_cryptocurrencies(jsonb) FROM anon;
REVOKE ALL ON FUNCTION public.upsert_cryptocurrencies(jsonb) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_cryptocurrencies(jsonb) TO service_role;

-- ---------------------------------------------------------------------------
-- 2. Index cleanup
-- ---------------------------------------------------------------------------
-- Duplicates: the UNIQUE constraint on cmc_id (cryptocurrencies_cmc_id_key)
-- and idx_cryptocurrencies_slug_unique already serve these lookups.
DROP INDEX IF EXISTS public.idx_cryptocurrencies_cmc_id;
DROP INDEX IF EXISTS public.idx_cryptocurrencies_slug;

-- Unused and expensive: nothing queries inside `quote` with JSONB operators,
-- and nothing filters or sorts on last_updated. Both columns change on every
-- sync, so these indexes are pure write overhead.
DROP INDEX IF EXISTS public.idx_cryptocurrencies_quote_gin;
DROP INDEX IF EXISTS public.idx_cryptocurrencies_last_updated;

-- Before dropping anything else, check real usage with:
--   SELECT indexrelname, idx_scan FROM pg_stat_user_indexes
--   WHERE relname = 'cryptocurrencies' ORDER BY idx_scan;

-- ---------------------------------------------------------------------------
-- 3. Leave room on each heap page for in-place (HOT) updates
-- ---------------------------------------------------------------------------
-- Takes effect for pages written after this point; a VACUUM FULL (or
-- pg_repack) would apply it to existing pages but locks the table.
ALTER TABLE public.cryptocurrencies SET (fillfactor = 80);
