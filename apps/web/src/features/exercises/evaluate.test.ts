import { describe, expect, it } from 'vitest';
import { evaluateExercise } from './evaluate';
import { exerciseSchema } from './schema';

describe('exerciseSchema', () => {
  it('rejects duplicate options and invalid answer indexes', () => {
    expect(exerciseSchema.safeParse({
      id: 'choice-1',
      type: 'multiple-choice',
      prompt: 'Pick one',
      options: ['A', 'A'],
      answerIndex: 0,
    }).success).toBe(false);
    expect(exerciseSchema.safeParse({
      id: 'choice-2',
      type: 'multiple-choice',
      prompt: 'Pick one',
      options: ['A', 'B'],
      answerIndex: 2,
    }).success).toBe(false);
  });

  it('rejects empty word-order tokens and unknown exercise types', () => {
    expect(exerciseSchema.safeParse({
      id: 'order-1',
      type: 'word-order',
      prompt: 'Order it',
      tokens: [''],
      answer: ['Hello'],
    }).success).toBe(false);
    expect(exerciseSchema.safeParse({ id: 'unknown', type: 'essay' }).success).toBe(false);
  });
});

describe('evaluateExercise', () => {
  it('evaluates multiple choice and listening selection by answer index', () => {
    const exercise = exerciseSchema.parse({
      id: 'choice-1', type: 'multiple-choice', prompt: 'Pick one',
      options: ['A', 'B'], answerIndex: 1,
    });

    expect(evaluateExercise(exercise, 1)).toEqual({
      correct: true, normalizedAnswer: 'B', feedback: 'Correct! Well done.',
    });
    const listening = exerciseSchema.parse({
      id: 'listening-1', type: 'listening-selection', prompt: 'Listen',
      options: ['A', 'B'], answerIndex: 1,
    });
    expect(evaluateExercise(listening, 1).correct).toBe(true);
    expect(evaluateExercise(listening, 0).correct).toBe(false);
  });

  it('evaluates word order exactly and reports a stable feedback message', () => {
    const exercise = exerciseSchema.parse({
      id: 'order-1', type: 'word-order', prompt: 'Order it',
      tokens: ['Hello', 'Nam'], answer: ['Hello', 'Nam'],
    });

    expect(evaluateExercise(exercise, ['Hello', 'Nam'])).toEqual({
      correct: true, normalizedAnswer: 'Hello Nam', feedback: 'Correct! Well done.',
    });
    expect(evaluateExercise(exercise, ['Nam', 'Hello']).correct).toBe(false);
  });

  it('normalizes fill-in-the-blank answers case-insensitively', () => {
    const exercise = exerciseSchema.parse({
      id: 'blank-1', type: 'fill-blank', prompt: 'Complete it', answer: 'hello',
    });

    expect(evaluateExercise(exercise, '  HELLO ')).toEqual({
      correct: true, normalizedAnswer: 'hello', feedback: 'Correct! Well done.',
    });
    expect(evaluateExercise(exercise, 'bye')).toEqual({
      correct: false, normalizedAnswer: 'bye', feedback: 'Not yet. Try again.',
    });
  });
});
