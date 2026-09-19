import { expect, it } from 'vitest';
import { getLessonStatus } from './get-lesson-status';

it('labels a lesson with no attempt as not started', () => {
  expect(getLessonStatus(undefined)).toEqual({
    label: 'Not started',
    tone: 'neutral',
  });
});

it('labels a completed lesson as mastered', () => {
  expect(getLessonStatus({ completed: true, mastery: 1 })).toEqual({
    label: 'Mastered',
    tone: 'success',
  });
});

it('labels an unfinished lesson as in progress', () => {
  expect(getLessonStatus({ completed: false, mastery: 0.5 })).toEqual({
    label: 'In progress',
    tone: 'active',
  });
});
