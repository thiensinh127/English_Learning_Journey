import { z } from 'zod';

const idSchema = z.string().min(1).regex(/^[a-z0-9-]+$/);

export const vocabularyItemSchema = z.object({
  id: idSchema,
  word: z.string().min(1),
  meaning: z.string().min(1),
  example: z.string().min(1),
  imageUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
});

export const sentencePatternSchema = z.object({
  id: idSchema,
  pattern: z.string().min(1),
  meaning: z.string().min(1),
  example: z.string().min(1).optional(),
  audioUrl: z.string().url().optional(),
});

export const lessonSchema = z.object({
  id: idSchema,
  unitId: idSchema,
  title: z.string().min(1),
  vocabulary: z.array(vocabularyItemSchema),
  sentencePatterns: z.array(sentencePatternSchema),
});

export type Lesson = z.infer<typeof lessonSchema>;
