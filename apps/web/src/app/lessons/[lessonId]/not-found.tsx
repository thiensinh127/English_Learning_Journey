import { AppShell } from '@/components/app-shell';

export default function LessonNotFound() {
  return (
    <AppShell>
      <h1 className="text-3xl font-bold">Lesson not found</h1>
      <p className="mt-3">Choose a lesson from the lesson list and try again.</p>
    </AppShell>
  );
}
