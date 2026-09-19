import { describe, expect, it } from 'vitest';
import { lessonSchema } from './schema';

describe('lessonSchema', () => {
  it('accepts a lesson with vocabulary and sentence patterns', () => {
    const result = lessonSchema.safeParse({
      id: 'unit-1-lesson-1',
      unitId: 'unit-1',
      title: 'Hello friends',
      vocabulary: [
        {
          id: 'hello',
          word: 'hello',
          meaning: 'xin chào',
          example: 'Hello, Nam!',
        },
      ],
      sentencePatterns: [
        {
          id: 'greeting',
          pattern: 'Hello, {name}!',
          meaning: 'Xin chào, {tên}!',
        },
      ],
    });

    expect(result.success).toBe(true);
  });

  it('rejects a vocabulary item with no Vietnamese meaning', () => {
    const result = lessonSchema.safeParse({
      id: 'l1',
      unitId: 'u1',
      title: 'Lesson',
      vocabulary: [{ id: 'hello', word: 'hello' }],
      sentencePatterns: [],
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain('meaning');
  });
});
