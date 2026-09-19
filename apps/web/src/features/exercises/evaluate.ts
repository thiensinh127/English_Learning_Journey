import type { Exercise } from './schema';

export type Evaluation = {
  correct: boolean;
  normalizedAnswer: string;
  feedback: string;
};

const feedback = (correct: boolean) => correct ? 'Correct! Well done.' : 'Not yet. Try again.';

export function evaluateExercise(exercise: Exercise, answer: unknown): Evaluation {
  if (exercise.type === 'fill-blank') {
    const normalizedAnswer = typeof answer === 'string' ? answer.trim().toLowerCase() : String(answer ?? '').trim().toLowerCase();
    const correct = normalizedAnswer === exercise.answer.trim().toLowerCase();
    return { correct, normalizedAnswer, feedback: feedback(correct) };
  }

  if (exercise.type === 'word-order') {
    const normalized = Array.isArray(answer) && answer.every((item) => typeof item === 'string') ? answer.map((item) => item.trim()) : [];
    const normalizedAnswer = normalized.join(' ');
    const correct = normalized.length === exercise.answer.length && normalized.every((item, index) => item === exercise.answer[index].trim());
    return { correct, normalizedAnswer, feedback: feedback(correct) };
  }

  const selected = typeof answer === 'number' && Number.isInteger(answer) ? exercise.options[answer] : undefined;
  const normalizedAnswer = selected ?? String(answer ?? '').trim();
  const correct = typeof answer === 'number' && answer === exercise.answerIndex;
  return { correct, normalizedAnswer, feedback: feedback(correct) };
}
