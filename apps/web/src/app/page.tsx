import { AppShell } from '@/components/app-shell';
import Link from 'next/link';

export default function HomePage() {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">English Explorer</h1>
      <p className="mt-3">Explore the learning experience with a safe demo.</p>
      <Link
        className="mt-6 inline-flex rounded-md bg-sky-600 px-4 py-2 font-semibold text-white"
        href="/lessons"
      >
        View demo lessons
      </Link>
    </AppShell>
  );
}
