import { z } from 'zod';

const id = z.string().min(1).regex(/^[a-z0-9-]+$/);
const prompt = z.string().trim().min(1);
const options = z.array(z.string().trim().min(1)).min(2).refine(
  (items) => new Set(items).size === items.length,
  'Options must be unique',
);

const choice = z.object({
  id,
  prompt,
  options,
  answerIndex: z.number().int(),
}).superRefine((value, context) => {
  if (value.answerIndex < 0 || value.answerIndex >= value.options.length) {
    context.addIssue({ code: 'custom', path: ['answerIndex'], message: 'Answer index is out of range' });
  }
});

const wordOrder = z.object({
  id,
  prompt,
  tokens: z.array(z.string().trim().min(1)).min(1),
  answer: z.array(z.string().trim().min(1)).min(1),
});

export const exerciseSchema = z.discriminatedUnion('type', [
  choice.extend({ type: z.literal('multiple-choice') }),
  wordOrder.extend({ type: z.literal('word-order') }),
  z.object({ id, type: z.literal('fill-blank'), prompt, answer: z.string().trim().min(1) }),
  choice.extend({ type: z.literal('listening-selection') }),
]);

export type Exercise = z.infer<typeof exerciseSchema>;
