import { describe, expect, it } from 'vitest';
import {
  isPublishable,
  mediaAssetSchema,
  reviewRecordSchema,
  sourceRefSchema,
} from './source-schema';

const sourceRef = {
  sourceId: 'global-success-4-tap-1',
  sourceUrl: 'https://example.com/source',
  sourcePage: 12,
  extractionMethod: 'pdf-text' as const,
};

describe('source and review schemas', () => {
  it('accepts a page-backed source reference', () => {
    expect(sourceRefSchema.safeParse(sourceRef).success).toBe(true);
  });

  it('rejects a review record with no rights evidence', () => {
    const result = reviewRecordSchema.safeParse({
      contentId: 'unit-1-lesson-1',
      rightsStatus: 'confirmed',
      rightsEvidence: '',
      sourceRefs: [],
      authorOrAdaptor: 'team',
      status: 'approved',
    });

    expect(result.success).toBe(false);
  });

  it('requires approved rights and a source reference before publishing', () => {
    const review = reviewRecordSchema.parse({
      contentId: 'unit-1-lesson-1',
      rightsStatus: 'confirmed',
      rightsEvidence: 'permission-record-001',
      sourceRefs: [sourceRef],
      authorOrAdaptor: 'team',
      reviewer: 'content-reviewer',
      status: 'approved',
    });

    expect(isPublishable(review)).toBe(true);
    expect(
      isPublishable({ ...review, rightsEvidence: '   ' }),
    ).toBe(false);
    expect(isPublishable({ ...review, sourceRefs: [] })).toBe(false);
    expect(isPublishable({ ...review, status: 'in_review' })).toBe(false);
  });

  it('accepts audio metadata with optional playback information', () => {
    const result = mediaAssetSchema.safeParse({
      id: 'unit-1-lesson-1-track-1',
      mediaType: 'audio',
      sourceRefs: [sourceRef],
      mimeType: 'audio/mpeg',
      checksum: 'a'.repeat(64),
      durationSeconds: 4.2,
    });

    expect(result.success).toBe(true);
  });

  it('rejects media metadata with a mismatched MIME family', () => {
    const result = mediaAssetSchema.safeParse({
      id: 'unit-1-lesson-1-image-1',
      mediaType: 'image',
      sourceRefs: [sourceRef],
      mimeType: 'audio/mpeg',
      checksum: 'b'.repeat(64),
    });

    expect(result.success).toBe(false);
  });
});
