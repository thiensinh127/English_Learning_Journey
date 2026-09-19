import { describe, expect, it } from 'vitest';
import { activitySchema } from './activity-schema';

const sourceRef = {
  sourceId: 'global-success-4-tap-1',
  sourcePage: 12,
  extractionMethod: 'pdf-text' as const,
};

describe('activitySchema', () => {
  it.each([
    'flashcard',
    'picture-word-match',
    'listening-choice',
    'sentence-choice-order',
    'unit-quiz',
  ])('accepts the %s activity type', (activityType) => {
    const result = activitySchema.safeParse({
      id: `lesson-1-${activityType}`,
      lessonId: 'unit-1-lesson-1',
      activityType,
      prompt: 'Choose the answer.',
      options: ['Hello', 'Goodbye'],
      answer: 'Hello',
      sourceRefs: [sourceRef],
      feedback: 'Good job!',
    });

    expect(result.success).toBe(true);
  });

  it('accepts ordered answers and optional media IDs', () => {
    const result = activitySchema.safeParse({
      id: 'lesson-1-order',
      lessonId: 'unit-1-lesson-1',
      activityType: 'sentence-choice-order',
      prompt: 'Put the words in order.',
      options: ['Hello', 'my', 'friends'],
      answer: ['Hello', 'my', 'friends'],
      sourceRefs: [sourceRef],
      audioId: 'lesson-1-track-1',
      imageId: 'lesson-1-image-1',
      feedbackId: 'encouraging-correct',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an unknown activity type and an unbounded answer set', () => {
    const result = activitySchema.safeParse({
      id: 'lesson-1-unknown',
      lessonId: 'unit-1-lesson-1',
      activityType: 'free-writing',
      prompt: 'Write anything.',
      options: Array.from({ length: 13 }, (_, index) => String(index)),
      answer: 'anything',
      sourceRefs: [sourceRef],
    });

    expect(result.success).toBe(false);
  });
});
