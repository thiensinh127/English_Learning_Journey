import type { ContentRepository } from './repository';
import { fixtureLessons } from './fixture-content';

export const fixtureContentRepository: ContentRepository = {
  async listLessons() {
    return fixtureLessons;
  },
  async getLesson(lessonId) {
    return fixtureLessons.find((lesson) => lesson.id === lessonId) ?? null;
  },
};
