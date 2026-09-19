import type { Lesson } from './schema';

export interface ContentRepository {
  listLessons(): Promise<Lesson[]>;
  getLesson(lessonId: string): Promise<Lesson | null>;
}
