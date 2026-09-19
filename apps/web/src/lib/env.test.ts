import { expect, it } from 'vitest';
import { getPublicSupabaseEnv } from './env';

it('returns the public Supabase configuration when both values are valid', () => {
  expect(
    getPublicSupabaseEnv({
      NEXT_PUBLIC_SUPABASE_URL: 'https://example.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    }),
  ).toEqual({
    url: 'https://example.supabase.co',
    anonKey: 'test-anon-key',
  });
});

it('throws a clear error when public Supabase configuration is missing', () => {
  expect(() => getPublicSupabaseEnv({})).toThrow(
    'Missing or invalid public Supabase environment variables',
  );
});
