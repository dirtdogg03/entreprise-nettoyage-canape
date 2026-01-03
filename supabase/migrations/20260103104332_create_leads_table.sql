-- Table leads pour stocker les demandes de devis
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  city TEXT,
  postal_code TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  wants_waitlist BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance (tri par date de creation)
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Index pour filtrer par statut
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Activer Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique: Permettre les insertions publiques (formulaire frontend)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- Politique: Seuls les utilisateurs authentifies peuvent lire
CREATE POLICY "Authenticated users can read" ON leads
  FOR SELECT TO authenticated
  USING (true);

-- Politique: Seuls les utilisateurs authentifies peuvent modifier
CREATE POLICY "Authenticated users can update" ON leads
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);
