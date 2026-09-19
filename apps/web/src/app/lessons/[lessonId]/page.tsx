import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { MediaControl } from '@/components/media-control';
import { fixtureContentRepository } from '@/features/content/fixture-repository';

export default async function LessonPage(props: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await props.params;
  const lesson = await fixtureContentRepository.getLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <AppShell>
      <p className="rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
        Demo content — not approved for study.
      </p>
      <Link className="mt-6 inline-block font-semibold text-sky-700" href="/lessons">
        Back to lessons
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{lesson.title}</h1>
      <section className="mt-6" aria-labelledby="vocabulary-heading">
        <h2 id="vocabulary-heading" className="text-2xl font-bold">
          Vocabulary
        </h2>
        <ul className="mt-3 space-y-4">
          {lesson.vocabulary.map((item) => (
            <li key={item.id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-bold">{item.word}</p>
              <p>{item.meaning}</p>
              <p className="text-slate-600">{item.example}</p>
              <MediaControl audioUrl={item.audioUrl} label={item.word} />
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-6" aria-labelledby="patterns-heading">
        <h2 id="patterns-heading" className="text-2xl font-bold">
          Sentence patterns
        </h2>
        <ul className="mt-3 space-y-4">
          {lesson.sentencePatterns.map((item) => (
            <li key={item.id} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="font-bold">{item.pattern}</p>
              <p>{item.meaning}</p>
              {item.example ? <p className="text-slate-600">{item.example}</p> : null}
              <MediaControl audioUrl={item.audioUrl} label={item.pattern} />
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
