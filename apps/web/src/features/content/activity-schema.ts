import { z } from 'zod';
import { sourceRefSchema } from './source-schema';

const idSchema = z.string().min(1).regex(/^[a-z0-9-]+$/);
const answerSchema = z.union([
  z.string().min(1),
  z.array(z.string().min(1)).min(1).max(12),
]);

export const activitySchema = z.object({
  id: idSchema,
  lessonId: idSchema,
  activityType: z.enum([
    'flashcard',
    'picture-word-match',
    'listening-choice',
    'sentence-choice-order',
    'unit-quiz',
  ]),
  prompt: z.string().trim().min(1),
  options: z.array(z.string().trim().min(1)).max(12).optional(),
  answer: answerSchema,
  sourceRefs: z.array(sourceRefSchema).min(1),
  feedback: z.string().trim().min(1).optional(),
  feedbackId: idSchema.optional(),
  audioId: idSchema.optional(),
  imageId: idSchema.optional(),
});

export type Activity = z.infer<typeof activitySchema>;
