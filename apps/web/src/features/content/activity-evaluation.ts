import type { Activity } from './activity-schema';

export type EvaluationResult = {
  correct: boolean;
  score: number;
  feedbackId?: string;
};

function answersMatch(expected: string | string[], actual: string | string[]) {
  if (Array.isArray(expected) !== Array.isArray(actual)) return false;
  if (Array.isArray(expected) && Array.isArray(actual)) {
    return expected.length === actual.length && expected.every((item, index) => item === actual[index]);
  }
  return expected === actual;
}

export function evaluateActivity(
  activity: Activity,
  answer: string | string[],
): EvaluationResult {
  return {
    correct: answersMatch(activity.answer, answer),
    score: answersMatch(activity.answer, answer) ? 1 : 0,
    feedbackId: activity.feedbackId,
  };
}

export function shuffleOptions(options: string[], seed: number): string[] {
  const result = [...options];
  let state = Math.abs(Math.trunc(seed)) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
