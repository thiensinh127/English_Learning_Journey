import type { ReviewRecord } from './source-schema';
import { isPublishable } from './source-schema';
import type { Lesson } from './schema';
import type { ContentRepository } from './repository';

export function createApprovedContentRepository(
  lessons: Lesson[],
  reviews: ReviewRecord[],
): ContentRepository {
  const approvedContentIds = new Set(
    reviews.filter(isPublishable).map((review) => review.contentId),
  );
  const approvedLessons = lessons.filter((lesson) =>
    approvedContentIds.has(lesson.id),
  );

  return {
    async listLessons() {
      return approvedLessons;
    },
    async getLesson(lessonId) {
      return approvedLessons.find((lesson) => lesson.id === lessonId) ?? null;
    },
  };
}
