import { createBrowserClient } from '@supabase/ssr';
import { getPublicSupabaseEnv } from '@/lib/env';

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getPublicSupabaseEnv();

  return createBrowserClient(url, anonKey);
}
