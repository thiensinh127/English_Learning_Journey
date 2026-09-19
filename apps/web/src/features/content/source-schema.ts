import { z } from 'zod';

const idSchema = z.string().min(1).regex(/^[a-z0-9-]+$/);

export const sourceRefSchema = z.object({
  sourceId: idSchema,
  sourceUrl: z.string().url().optional(),
  sourcePage: z.number().int().positive().optional(),
  sourceTrack: z.string().min(1).optional(),
  extractionMethod: z.enum([
    'pdf-text',
    'pdf-image',
    'manual',
    'web-reference',
  ]),
});

export type SourceRef = z.infer<typeof sourceRefSchema>;

export const reviewRecordSchema = z.object({
  contentId: idSchema,
  rightsStatus: z.enum(['pending', 'confirmed', 'restricted']),
  rightsEvidence: z.string().trim().min(1),
  sourceRefs: z.array(sourceRefSchema),
  authorOrAdaptor: z.string().trim().min(1),
  reviewer: z.string().trim().min(1),
  status: z.enum(['draft', 'in_review', 'approved', 'rejected']),
  notes: z.string().optional(),
});

export type ReviewRecord = z.infer<typeof reviewRecordSchema>;

export const mediaAssetSchema = z
  .object({
    id: idSchema,
    mediaType: z.enum(['audio', 'image']),
    sourceRefs: z.array(sourceRefSchema).min(1),
    mimeType: z.string().regex(/^[a-z]+\/[a-z0-9.+-]+$/),
    checksum: z.string().trim().min(1),
    durationSeconds: z.number().finite().nonnegative().optional(),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
  })
  .superRefine((asset, context) => {
    const expectedFamily = `${asset.mediaType}/`;
    if (!asset.mimeType.startsWith(expectedFamily)) {
      context.addIssue({
        code: 'custom',
        path: ['mimeType'],
        message: `MIME type must start with ${expectedFamily}`,
      });
    }
  });

export type MediaAsset = z.infer<typeof mediaAssetSchema>;

export function isPublishable(review: ReviewRecord): boolean {
  return (
    review.status === 'approved' &&
    review.rightsStatus === 'confirmed' &&
    review.rightsEvidence.trim().length > 0 &&
    review.sourceRefs.length > 0 &&
    review.sourceRefs.every(
      (sourceRef) => sourceRef.sourcePage !== undefined || sourceRef.sourceTrack !== undefined,
    )
  );
}
