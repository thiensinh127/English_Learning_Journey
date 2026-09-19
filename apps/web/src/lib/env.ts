import { z } from 'zod';

const publicSupabaseEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export function getPublicSupabaseEnv(
  source: Record<string, string | undefined> = process.env,
) {
  const result = publicSupabaseEnvSchema.safeParse(source);

  if (!result.success) {
    throw new Error('Missing or invalid public Supabase environment variables');
  }

  return {
    url: result.data.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: result.data.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}
