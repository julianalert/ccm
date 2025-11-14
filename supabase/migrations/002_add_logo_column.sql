-- Add logo column to cryptocurrencies table
ALTER TABLE cryptocurrencies 
ADD COLUMN IF NOT EXISTS logo TEXT;

-- Create index on logo for faster queries
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_logo ON cryptocurrencies(logo) WHERE logo IS NOT NULL;

