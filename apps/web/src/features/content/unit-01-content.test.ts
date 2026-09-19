import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { activitySchema } from './activity-schema';
import { isPublishable, reviewRecordSchema } from './source-schema';
import { lessonSchema } from './schema';

const contentPath = (relativePath: string) =>
  path.resolve(process.cwd(), '../../content', relativePath);

describe('Unit 1 pilot content', () => {
  it('matches the lesson contract', () => {
    const lesson = JSON.parse(
      readFileSync(
        contentPath('source/global-success-4/tap-1/units/unit-01/lessons/lesson-01.json'),
        'utf8',
      ),
    );

    expect(lessonSchema.safeParse(lesson).success).toBe(true);
  });

  it('validates five deterministic activity records', () => {
    const activities = JSON.parse(
      readFileSync(
        contentPath('source/global-success-4/tap-1/units/unit-01/activities.json'),
        'utf8',
      ),
    );

    expect(activities).toHaveLength(5);
    expect(activities.every((activity: unknown) => activitySchema.safeParse(activity).success)).toBe(true);
  });

  it('keeps the pilot out of student publication while it is in review', () => {
    const review = JSON.parse(
      readFileSync(contentPath('review-records/unit-01-lesson-01.json'), 'utf8'),
    );

    const parsed = reviewRecordSchema.parse(review);
    expect(parsed.status).toBe('in_review');
    expect(isPublishable(parsed)).toBe(false);
  });
});
