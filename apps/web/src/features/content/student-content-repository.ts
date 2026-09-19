import { fixtureContentRepository } from './fixture-repository';
import { createApprovedContentRepository } from './approved-content-repository';
import { approvedLessonRecords, approvedReviewRecords } from './generated-content';
import { lessonSchema } from './schema';
import { reviewRecordSchema } from './source-schema';

// Content is loaded from the source-controlled, reviewed data boundary. The
// repository still returns nothing until the review record is publishable.
const approvedStudentRepository = createApprovedContentRepository(
  [lessonSchema.parse(approvedLessonRecords[0])],
  [reviewRecordSchema.parse(approvedReviewRecords[0])],
);

export function getStudentContentRepository(options?: { demo?: boolean }) {
  if (options?.demo && process.env.NODE_ENV !== 'production') {
    return fixtureContentRepository;
  }
  return approvedStudentRepository;
}
