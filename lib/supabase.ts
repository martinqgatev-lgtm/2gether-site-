import { createClient } from '@supabase/supabase-js';

// IMPORTANT: It must use 'import.meta.env' to read the keys from Vercel
// We safely access the environment object to prevent crashes if it's undefined (e.g. during certain build steps or runtime environments)
const env = (import.meta as any).env || {};

const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || '';

// Initialize client with fallback values to prevent 'supabaseUrl is required' errors on startup if env vars are missing.
// Authentication will fail if keys are invalid, but the app won't crash.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);