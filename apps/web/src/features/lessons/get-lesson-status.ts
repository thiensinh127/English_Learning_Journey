type LessonAttempt = { completed: boolean; mastery: number };

export function getLessonStatus(attempt: LessonAttempt | undefined) {
  if (!attempt) return { label: 'Not started', tone: 'neutral' as const };
  if (attempt.completed && attempt.mastery >= 1) {
    return { label: 'Mastered', tone: 'success' as const };
  }

  return { label: 'In progress', tone: 'active' as const };
}
