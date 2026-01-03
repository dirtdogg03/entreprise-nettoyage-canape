-- Temporarily disable RLS to allow form submissions
-- This is a temporary fix - RLS should be re-enabled with proper policies later

ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Ensure anon has INSERT permission
GRANT INSERT ON leads TO anon;
GRANT SELECT ON leads TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- Comment to document this
COMMENT ON TABLE leads IS 'Lead capture - RLS temporarily disabled for form submissions';
