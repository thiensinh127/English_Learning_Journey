import Link from 'next/link';
import type { Lesson } from '@/features/content/schema';
import { getLessonStatus } from '@/features/lessons/get-lesson-status';

export function LessonCard({ lesson }: { lesson: Lesson }) {
  const status = getLessonStatus(undefined);

  return (
    <article className="rounded-xl border border-sky-100 bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">{lesson.title}</h2>
      <p className="mt-1 text-sm text-slate-600">{status.label}</p>
      <Link
        className="mt-4 inline-flex rounded-md bg-sky-600 px-4 py-2 font-semibold text-white"
        href={`/lessons/${lesson.id}`}
      >
        Open lesson: {lesson.title}
      </Link>
    </article>
  );
}
