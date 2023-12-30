import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY;
const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

if (!supabaseKey) {
  throw new Error('Supabase key is not set in environment variables');
}

if (!supabaseUrl) {
  throw new Error('Supabase URL is not set in environment variables');
}

/**
 * Used for interacting with Supabase where the High Score data is stored.
 */
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
