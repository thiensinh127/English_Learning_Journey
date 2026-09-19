import { describe, expect, it } from 'vitest';
import { createApprovedContentRepository } from './approved-content-repository';
import { lessonSchema, type Lesson } from './schema';
import { reviewRecordSchema } from './source-schema';

const lesson: Lesson = lessonSchema.parse({
  id: 'unit-1-lesson-1',
  unitId: 'unit-01',
  title: 'Where are you from?',
  vocabulary: [],
  sentencePatterns: [],
});

const sourceRef = {
  sourceId: 'global-success-4-tap-1',
  sourcePage: 12,
  extractionMethod: 'web-reference' as const,
};

function review(status: 'approved' | 'in_review') {
  return reviewRecordSchema.parse({
    contentId: lesson.id,
    rightsStatus: 'confirmed',
    rightsEvidence: 'permission-record-001',
    sourceRefs: [sourceRef],
    authorOrAdaptor: 'content-team',
    reviewer: 'content-reviewer',
    status,
  });
}

describe('createApprovedContentRepository', () => {
  it('returns approved lessons only', async () => {
    const repository = createApprovedContentRepository([lesson], [review('approved')]);

    await expect(repository.listLessons()).resolves.toEqual([lesson]);
    await expect(repository.getLesson(lesson.id)).resolves.toEqual(lesson);
  });

  it('hides lessons still in review', async () => {
    const repository = createApprovedContentRepository([lesson], [review('in_review')]);

    await expect(repository.listLessons()).resolves.toEqual([]);
    await expect(repository.getLesson(lesson.id)).resolves.toBeNull();
  });

  it('returns null for a lesson without a review record', async () => {
    const repository = createApprovedContentRepository([lesson], []);

    await expect(repository.getLesson(lesson.id)).resolves.toBeNull();
  });
});
