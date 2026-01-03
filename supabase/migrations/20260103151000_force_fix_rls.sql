-- Force fix RLS: Temporarily disable and reconfigure properly

-- Disable RLS first
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert" ON leads;
DROP POLICY IF EXISTS "Authenticated users can read" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update" ON leads;
DROP POLICY IF EXISTS "Only service_role can select" ON leads;

-- Re-enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Force enable RLS for all roles except service_role (which bypasses RLS)
ALTER TABLE leads FORCE ROW LEVEL SECURITY;

-- Create INSERT policy for anon (public form submissions)
CREATE POLICY "anon_can_insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create SELECT policy for authenticated users (admin dashboard)
CREATE POLICY "authenticated_can_read" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create UPDATE policy for authenticated users
CREATE POLICY "authenticated_can_update" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Ensure GRANT permissions are correct
GRANT INSERT ON leads TO anon;
GRANT SELECT, UPDATE ON leads TO authenticated;

-- Verify the policies are in place
COMMENT ON TABLE leads IS 'Lead capture table with RLS enabled. Anon can INSERT, authenticated can SELECT/UPDATE.';
