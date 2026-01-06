-- Add custom description fields to cryptocurrencies table
ALTER TABLE cryptocurrencies 
ADD COLUMN IF NOT EXISTS description_text TEXT,
ADD COLUMN IF NOT EXISTS description_image TEXT,
ADD COLUMN IF NOT EXISTS description_list JSONB DEFAULT '[]'::jsonb;

-- Create index on description_image for faster queries
CREATE INDEX IF NOT EXISTS idx_cryptocurrencies_description_image ON cryptocurrencies(description_image) WHERE description_image IS NOT NULL;

