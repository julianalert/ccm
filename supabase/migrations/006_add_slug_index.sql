-- Add index on slug column for fast lookups on detail pages
-- This is critical for performance when querying by slug
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_slug 
ON cryptocurrencies(slug);

-- Also add a unique constraint on slug if it doesn't exist (should be unique anyway)
-- This helps with data integrity and query optimization
CREATE UNIQUE INDEX IF NOT EXISTS idx_cryptocurrencies_slug_unique 
ON cryptocurrencies(slug);

