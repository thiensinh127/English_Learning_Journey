import { AppShell } from '@/components/app-shell';
import { LessonCard } from '@/components/lesson-card';
import { fixtureContentRepository } from '@/features/content/fixture-repository';

export default async function LessonsPage() {
  const lessons = await fixtureContentRepository.listLessons();

  return (
    <AppShell>
      <p className="rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
        Demo content — not approved for study.
      </p>
      <h1 className="mt-6 text-3xl font-bold">Demo lessons</h1>
      <div className="mt-6 grid gap-4">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </AppShell>
  );
}
