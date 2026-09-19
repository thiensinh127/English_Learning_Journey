import { AppShell } from '@/components/app-shell';

export default function NotFound() {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-3">Please return to the lesson list and try again.</p>
    </AppShell>
  );
}
