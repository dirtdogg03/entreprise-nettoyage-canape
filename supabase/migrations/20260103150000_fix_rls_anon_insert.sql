-- Fix RLS: Allow anon to INSERT into leads
-- Drop existing policy if it exists and recreate it

-- First ensure the policy exists with correct permissions
DROP POLICY IF EXISTS "Allow public insert" ON leads;

-- Recreate the INSERT policy for anon role
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Also ensure GRANT is correct
GRANT INSERT ON leads TO anon;

-- Add comment
COMMENT ON POLICY "Allow public insert" ON leads IS 'Allows anonymous users to submit contact forms';
