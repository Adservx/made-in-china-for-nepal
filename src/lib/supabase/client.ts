import { createBrowserClient } from '@supabase/ssr'

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Missing Supabase environment variables. Some features may not work.');
    supabaseInstance = createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
    return supabaseInstance;
  }

  supabaseInstance = createBrowserClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}
