import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type pour les leads
export interface Lead {
  id?: string;
  service: string;
  city?: string | null;
  postal_code?: string | null;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  wants_waitlist?: boolean;
  status?: 'new' | 'contacted' | 'converted' | 'lost';
  created_at?: string;
}
