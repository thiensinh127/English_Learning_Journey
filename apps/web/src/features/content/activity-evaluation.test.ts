import { describe, expect, it } from 'vitest';
import { evaluateActivity, shuffleOptions } from './activity-evaluation';
import { activitySchema } from './activity-schema';

const sourceRef = {
  sourceId: 'global-success-4-tap-1',
  sourcePage: 12,
  extractionMethod: 'web-reference' as const,
};

const choiceActivity = activitySchema.parse({
  id: 'unit-1-lesson-1-country-choice',
  lessonId: 'unit-1-lesson-1',
  activityType: 'listening-choice',
  prompt: 'Where is Minh from?',
  options: ['Viet Nam', 'Britain', 'Australia'],
  answer: 'Viet Nam',
  sourceRefs: [sourceRef],
  feedbackId: 'encouraging-correct',
});

describe('activity evaluation', () => {
  it('returns a correct result for the exact answer', () => {
    expect(evaluateActivity(choiceActivity, 'Viet Nam')).toEqual({
      correct: true,
      score: 1,
      feedbackId: 'encouraging-correct',
    });
  });

  it('returns an incorrect result without changing the answer key', () => {
    expect(evaluateActivity(choiceActivity, 'Britain')).toEqual({
      correct: false,
      score: 0,
      feedbackId: 'encouraging-correct',
    });
  });

  it('evaluates ordered answers in order', () => {
    const activity = activitySchema.parse({
      ...choiceActivity,
      id: 'unit-1-lesson-1-sentence-order',
      activityType: 'sentence-choice-order',
      options: ['I\'m', 'from', 'Viet Nam'],
      answer: ["I'm", 'from', 'Viet Nam'],
    });

    expect(evaluateActivity(activity, ["I'm", 'from', 'Viet Nam']).correct).toBe(true);
    expect(evaluateActivity(activity, ['Viet Nam', 'from', "I'm"]).correct).toBe(false);
  });

  it('shuffles options deterministically for the same seed', () => {
    const options = ['Viet Nam', 'Britain', 'Australia'];

    expect(shuffleOptions(options, 7)).toEqual(shuffleOptions(options, 7));
    expect(shuffleOptions(options, 7)).toHaveLength(options.length);
  });
});
