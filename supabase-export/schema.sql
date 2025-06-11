
-- Pants table schema
CREATE TABLE IF NOT EXISTS pants (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    description TEXT,
    sizes TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    stock INTEGER DEFAULT 0,
    category TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pants_category ON pants(category);
CREATE INDEX IF NOT EXISTS idx_pants_created_at ON pants(created_at);
CREATE INDEX IF NOT EXISTS idx_pants_price ON pants(price);

-- Enable Row Level Security (RLS)
ALTER TABLE pants ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON pants
    FOR SELECT USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON pants
    FOR ALL USING (auth.role() = 'authenticated');
