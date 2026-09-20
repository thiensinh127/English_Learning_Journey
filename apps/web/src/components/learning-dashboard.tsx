import Image from 'next/image';
import { LearningMapStage } from './learning-map-stage';

const missions = [
  ['Học từ mới', '0/5'],
  ['Nghe và chọn đáp án', '0/3'],
  ['Làm quiz', '0/2'],
];

export function LearningDashboard() {
  return (
    <section aria-label="Bảng điều khiển học tập" className="space-y-6 font-sans md:flex md:h-[calc(100dvh-11rem)] md:flex-col md:gap-6 md:space-y-0 lg:h-[calc(100dvh-3rem)]">
      <LearningMapStage />

      <div className="grid gap-5 md:shrink-0 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr]">
        <section className="rounded-3xl border border-journey-orange/10 bg-journey-cream p-6 shadow-[0_12px_30px_-20px_rgba(17,27,94,0.3)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-journey-orange">Hôm nay</p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-journey-navy">Nhiệm vụ của An</h2>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-journey-orange shadow-sm">3 việc</span>
          </div>
          <ul className="mt-5 space-y-2.5">
            {missions.map(([label, progress]) => (
              <li className="flex min-h-14 items-center justify-between rounded-2xl border border-white bg-white px-4 shadow-sm" key={label}>
                <span className="font-bold text-journey-ink">{label}</span>
                <span className="rounded-full bg-journey-sky px-2.5 py-1 text-sm font-extrabold text-journey-blue">{progress}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_-20px_rgba(17,27,94,0.3)]">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-journey-blue">Hành trình</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-journey-navy">Tiến độ của An</h2>
          <dl className="mt-5 grid grid-cols-3 gap-2.5 text-center">
            <div className="rounded-2xl bg-journey-sky px-2 py-3">
              <dt className="text-xs font-bold text-journey-muted">Ngày học</dt>
              <dd className="mt-1 text-2xl font-black text-journey-orange">5</dd>
            </div>
            <div className="rounded-2xl bg-journey-sky px-2 py-3">
              <dt className="text-xs font-bold text-journey-muted">Bài học</dt>
              <dd className="mt-1 text-2xl font-black text-journey-green">48</dd>
            </div>
            <div className="rounded-2xl bg-journey-cream px-2 py-3">
              <dt className="text-xs font-bold text-journey-muted">XP</dt>
              <dd className="mt-1 text-2xl font-black text-journey-orange">850</dd>
            </div>
          </dl>
        </section>

        <section className="relative min-h-56 overflow-hidden rounded-3xl bg-journey-sky p-6 shadow-[0_12px_30px_-20px_rgba(17,27,94,0.3)]">
          <div className="relative sm:max-w-[12rem]">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-journey-blue">Cùng khám phá</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-journey-navy">Bạn đồng hành</h2>
            <p className="mt-2 text-base font-bold leading-snug text-journey-ink">Cùng học tiếp nào! Bạn làm rất tốt.</p>
          </div>
          <Image
            alt="Bạn đồng hành với rương phần thưởng"
            className="mt-6 h-32 w-full rounded-2xl object-cover object-left opacity-80 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:h-36 sm:w-48 sm:rounded-none"
            height={279}
            sizes="(max-width: 640px) 100vw, 192px"
            src="/dashboard/companion.jpeg"
            width={512}
          />
        </section>
      </div>
    </section>
  );
}
