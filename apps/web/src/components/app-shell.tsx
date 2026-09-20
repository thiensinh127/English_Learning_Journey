import type { ReactNode } from 'react';

const navigation = [
  ['Trang chủ', '/'],
  ['Bản đồ học tập', '/'],
  ['Nhiệm vụ', '/lessons'],
  ['Huy hiệu', '/'],
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-journey-sky text-journey-ink">
      <a className="sr-only focus:not-sr-only" href="#main-content">
        Skip to lesson content
      </a>
      <aside className="fixed inset-y-0 left-0 hidden w-[230px] border-r border-slate-100 bg-white px-4 py-5 lg:flex lg:flex-col">
        <div className="px-2 font-sans leading-none">
          <p className="text-lg font-black tracking-tight text-journey-blue">English</p>
          <p className="mt-1 text-xs font-extrabold tracking-wide text-journey-blue/80">Learning Journey</p>
        </div>
        <nav aria-label="Điều hướng học tập" className="mt-8 space-y-1.5">
          {navigation.map(([label, href], index) => (
            <a
              className={`flex min-h-12 items-center rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-journey-blue ${
                index === 0
                  ? 'bg-journey-cream text-journey-orange shadow-sm'
                  : 'text-journey-muted hover:bg-journey-sky hover:text-journey-ink'
              }`}
              href={href}
              key={label}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <header aria-label="English Learning Journey" className="border-b border-slate-100 bg-white px-4 py-4 lg:hidden">
        <div className="mx-auto max-w-6xl font-sans text-lg font-black tracking-tight text-journey-blue lg:hidden">English Learning Journey</div>
      </header>
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 lg:ml-[230px] lg:w-auto lg:max-w-none lg:px-8 lg:pb-8"
      >
        {children}
      </main>
      <nav aria-label="Điều hướng học tập" className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-journey-blue/10 bg-white px-2 py-2 lg:hidden">
        {navigation.map(([label, href]) => (
          <a className="min-h-12 rounded-xl px-3 py-2 text-center text-xs font-bold text-journey-ink focus-visible:outline-2 focus-visible:outline-journey-blue" href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
