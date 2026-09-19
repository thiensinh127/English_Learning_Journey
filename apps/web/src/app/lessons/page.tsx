import { AppShell } from '@/components/app-shell';
import { LessonCard } from '@/components/lesson-card';
import { getStudentContentRepository } from '@/features/content/student-content-repository';

export default async function LessonsPage(props: {
  searchParams: Promise<{ demo?: string }>;
}) {
  const { demo } = await props.searchParams;
  const isDemo = demo === '1';
  const lessons = await getStudentContentRepository({ demo: isDemo }).listLessons();

  return (
    <AppShell>
      {isDemo ? (
        <p className="rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
          Demo content — not approved for study.
        </p>
      ) : null}
      <h1 className="mt-6 text-3xl font-bold">Lessons</h1>
      {lessons.length > 0 ? (
        <div className="mt-6 grid gap-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} demo={isDemo} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl bg-white p-5 shadow-sm" role="status">
          No approved lessons are available yet.
        </p>
      )}
    </AppShell>
  );
}
