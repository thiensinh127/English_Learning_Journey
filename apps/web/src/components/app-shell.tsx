import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <a className="sr-only focus:not-sr-only" href="#main-content">
        Skip to lesson content
      </a>
      <header
        aria-label="English Explorer"
        className="border-b bg-white px-4 py-3"
      >
        <div className="mx-auto max-w-5xl font-bold">English Explorer</div>
      </header>
      <main
        id="main-content"
        className="mx-auto w-full max-w-5xl px-4 py-6"
      >
        {children}
      </main>
    </div>
  );
}
