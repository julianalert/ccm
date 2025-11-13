-- Create cryptocurrencies table to store CoinMarketCap API data
CREATE TABLE IF NOT EXISTS cryptocurrencies (
  id BIGSERIAL PRIMARY KEY,
  cmc_id INTEGER UNIQUE NOT NULL, -- CoinMarketCap ID
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  slug TEXT NOT NULL,
  cmc_rank INTEGER,
  num_market_pairs INTEGER,
  circulating_supply NUMERIC,
  total_supply NUMERIC,
  market_cap_by_total_supply NUMERIC,
  max_supply NUMERIC,
  infinite_supply BOOLEAN DEFAULT FALSE,
  last_updated TIMESTAMPTZ,
  date_added TIMESTAMPTZ,
  tags JSONB DEFAULT '[]'::jsonb, -- Array of tags
  self_reported_circulating_supply NUMERIC,
  self_reported_market_cap NUMERIC,
  tvl_ratio NUMERIC,
  platform JSONB, -- Platform metadata (nullable)
  quote JSONB NOT NULL DEFAULT '{}'::jsonb, -- Market quotes in different currencies
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_cmc_id ON cryptocurrencies(cmc_id);
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_symbol ON cryptocurrencies(symbol);
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_cmc_rank ON cryptocurrencies(cmc_rank);
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_last_updated ON cryptocurrencies(last_updated);
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_quote_gin ON cryptocurrencies USING GIN (quote);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cryptocurrencies_updated_at
  BEFORE UPDATE ON cryptocurrencies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE cryptocurrencies ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access
CREATE POLICY "Allow public read access"
  ON cryptocurrencies
  FOR SELECT
  TO public
  USING (true);

-- Policy: Allow authenticated users to insert
CREATE POLICY "Allow authenticated users to insert"
  ON cryptocurrencies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Allow authenticated users to update
CREATE POLICY "Allow authenticated users to update"
  ON cryptocurrencies
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow service role to do everything (for server-side operations)
CREATE POLICY "Allow service role full access"
  ON cryptocurrencies
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

