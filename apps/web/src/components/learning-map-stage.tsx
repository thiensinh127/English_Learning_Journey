import Image from 'next/image';
import Link from 'next/link';

const checkpoints = [
  {
    ariaLabel: 'Từ vựng: My Birthday',
    className: 'size-14 bg-journey-green text-white',
    icon: '✓',
    key: 'vocabulary',
    position: 'left-[16%] top-[67%]',
    tooltip: 'Từ vựng',
  },
  {
    ariaLabel: 'Nghe & chọn',
    className: 'size-16 bg-journey-blue text-white',
    icon: '2',
    key: 'listening',
    position: 'left-[45%] top-[58%]',
    tooltip: 'Nghe & chọn',
  },
  {
    ariaLabel: 'Quiz: Thử thách',
    className: 'size-14 bg-journey-coral text-white',
    icon: '3',
    key: 'quiz',
    position: 'left-[77%] top-[64%]',
    tooltip: 'Quiz',
  },
] as const;

export function LearningMapStage() {
  return (
    <section
      aria-label="Bản đồ hành trình học tập"
      className="overflow-hidden rounded-3xl bg-journey-sky shadow-sm md:min-h-0 md:flex-1"
    >
      <div className="md:h-full">
        <div className="relative md:h-full">
          <Image
            alt="Bản đồ đảo học tiếng Anh với các chặng từ vựng, nghe, nói và quiz"
            className="h-auto w-full md:h-full md:object-cover"
            height={941}
            preload
            sizes="(max-width: 1024px) 760px, 1152px"
            src="/dashboard/map-stage-v2.png"
            width={1672}
          />

          <Link
            aria-label="Tiếp tục học Unit 4: My Birthday"
            className="absolute left-[45%] top-[32%] hidden w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-white/95 p-4 text-journey-ink shadow-[0_18px_32px_-16px_rgba(17,27,94,0.45)] outline-offset-4 transition hover:-translate-y-[55%] focus-visible:outline-4 focus-visible:outline-journey-blue sm:block"
            href="/lessons"
          >
            <span className="flex items-center gap-2 text-sm font-bold text-journey-blue">
              <span className="size-2 rounded-full bg-journey-blue" /> Tiếp tục hành trình
            </span>
            <span className="mt-1 block font-sans text-xl font-black leading-tight">Unit 4: My Birthday</span>
            <span className="mt-3 flex items-center gap-2 text-sm font-bold">
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-journey-blue/15">
                <span className="block h-full w-3/4 rounded-full bg-journey-blue" />
              </span>
              75%
            </span>
            <span className="mt-3 inline-flex min-h-12 items-center rounded-xl bg-journey-blue px-4 font-sans text-sm font-extrabold text-white shadow-[0_8px_16px_-8px_rgba(37,99,235,0.8)] transition-colors hover:bg-blue-700">
              Tiếp tục học <span aria-hidden="true" className="ml-2 text-lg leading-none">→</span>
            </span>
          </Link>

          {checkpoints.map((checkpoint) => (
            <Link
              aria-label={checkpoint.ariaLabel}
              className={`group absolute hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/90 text-2xl font-black shadow-[0_10px_20px_-10px_rgba(17,27,94,0.65)] outline-offset-4 transition hover:scale-110 focus-visible:outline-4 focus-visible:outline-white sm:flex ${checkpoint.position} ${checkpoint.className}`}
              data-checkpoint={checkpoint.key}
              href="/lessons"
              key={checkpoint.key}
            >
              <span aria-hidden="true">{checkpoint.icon}</span>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max -translate-x-1/2 rounded-lg bg-journey-navy px-3 py-2 text-xs font-extrabold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {checkpoint.tooltip}
              </span>
            </Link>
          ))}

          <button
            aria-label="Đảo Muôn Loài đang khoá"
            className="absolute left-[89%] top-[24%] hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white/90 bg-white/80 text-xl text-journey-muted shadow-[0_10px_20px_-10px_rgba(17,27,94,0.45)] sm:flex"
            disabled
            type="button"
          >
            <span aria-hidden="true">🔒</span>
          </button>
        </div>
      </div>
      <Link
        aria-label="Bắt đầu Unit 4: My Birthday trên điện thoại"
        className="mx-4 mb-4 flex min-h-14 items-center justify-center rounded-2xl bg-journey-blue px-5 font-sans text-base font-extrabold text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.8)] outline-offset-4 transition-colors hover:bg-blue-700 focus-visible:outline-4 focus-visible:outline-journey-blue sm:hidden"
        href="/lessons"
      >
        Tiếp tục học Unit 4: My Birthday <span aria-hidden="true" className="ml-2">→</span>
      </Link>
    </section>
  );
}
