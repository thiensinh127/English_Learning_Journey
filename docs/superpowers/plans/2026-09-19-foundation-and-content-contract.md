# Grade 4 English App Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a tested Next.js application foundation and a validated textbook-content contract that the later learning experience can consume.

**Architecture:** Keep the repository root for product documentation and place the deployable web app in `apps/web`. The app is a modular monolith: domain schemas and repository interfaces are framework-independent, while Next.js pages/components consume those interfaces. Supabase schema migrations define the future persistent boundary, but the initial UI is allowed to use a typed fixture repository until approved textbook content and Supabase credentials exist.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Zod, Vitest, Playwright, Supabase CLI and PostgreSQL migrations.

**Spec:** `docs/superpowers/specs/2026-09-19-grade4-english-learning-app-design.md`

## Global Constraints

- Target Vietnamese grade 4 student self-study; use short, encouraging copy.
- Keep all textbook content outside React components.
- Do not add free-form AI, model routing, speech assessment, parent/teacher features, or competitive leaderboards.
- Keep student data minimal; do not expose secrets or privileged answer data in public client state.
- Exercise evaluation and review rules must be deterministic.
- Use TypeScript, small modules, unit tests for domain rules, and Playwright for the primary student flow.
- Use task state transitions in `docs/backlog.md` and record verification evidence in `docs/progress.md`.
- Load lessons and media on demand; declare media dimensions; target p75 LCP ≤ 2.5s, INP ≤ 200ms, and CLS ≤ 0.1.
- Target API p95 ≤ 400ms for reads and ≤ 700ms for progress writes; index RLS filter columns and avoid unbounded/N+1 queries.

## Review Focus

- Missing or malformed content fields must fail validation with the precise field path rather than rendering a broken lesson.
- A lesson with no image or audio must still render and explain the unavailable media accessibly.
- A student must not reach a non-existent lesson URL or a blank page from lesson navigation.
- A mobile viewport must preserve the primary action without horizontal scrolling.
- Database policies must prevent one student from reading or changing another student's progress.

## File Structure

```text
apps/web/
  src/app/
    layout.tsx                         # Root metadata and global layout
    page.tsx                           # Temporary foundation home screen
    lessons/page.tsx                   # Lesson listing route
    lessons/[lessonId]/page.tsx        # Read-only lesson overview route
  src/components/
    app-shell.tsx                      # Navigation and responsive page frame
    lesson-card.tsx                    # Reusable lesson status card
    media-control.tsx                  # Image/audio fallback presentation
  src/features/content/
    schema.ts                          # Zod schemas and inferred domain types
    repository.ts                      # ContentRepository contract
    fixture-repository.ts              # Validated temporary fixture implementation
    fixture-content.ts                 # Non-textbook demo fixture records
  src/features/lessons/
    get-lesson-status.ts               # Pure presentation-state mapping
  src/lib/
    env.ts                             # Server/public environment validation
    supabase/
      browser.ts                       # Browser client factory
      server.ts                        # Server client factory
  src/test/
    setup.ts                           # Vitest DOM setup
  tests/e2e/
    lesson-navigation.spec.ts          # Critical navigation browser flow
  src/features/content/schema.test.ts  # Content validation tests
  src/features/lessons/get-lesson-status.test.ts
  vitest.config.ts
  playwright.config.ts
  .env.example
  package.json
supabase/
  migrations/0001_content_and_progress.sql
docs/
  content-authoring.md                 # Required data and media-source contract
  decisions/0001-web-app-layout.md     # Why deployable app lives in apps/web
```

## Tasks

### Task 1: Create the deployable application and baseline quality commands

**Files:**
- Create: `apps/web/` via the Next.js generator
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/src/test/setup.ts`
- Create: `apps/web/playwright.config.ts`
- Modify: `apps/web/package.json`
- Modify: `docs/backlog.md`
- Modify: `docs/progress.md`

**Consumes:** project tracking files in the repository root.

**Produces:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e`, and `npm run build` commands in `apps/web`.

- [ ] **Step 1: Move P1-01 to In Progress**

Edit the `P1-01` row in `docs/backlog.md` from `Backlog` to `In Progress`.

- [ ] **Step 2: Generate the app in the agreed location**

Run from the repository root:

```bash
npx create-next-app@latest apps/web --ts --tailwind --eslint --app --src-dir --import-alias '@/*' --use-npm
```

- [ ] **Step 3: Add the testing dependencies and commands**

Run from `apps/web`:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test
npm pkg set scripts.typecheck='tsc --noEmit'
npm pkg set scripts.test='vitest run'
npm pkg set scripts.test:watch='vitest'
npm pkg set scripts.test:e2e='playwright test'
```

- [ ] **Step 4: Add a minimal Vitest configuration**

Create `apps/web/vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

Create `apps/web/src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 5: Run baseline checks and record evidence**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected: lint, typecheck, and production build pass.

- [ ] **Step 6: Update tracking and commit**

Move `P1-01` to `Review`; add command results to `docs/progress.md`; then commit:

```bash
git add apps/web docs/backlog.md docs/progress.md
git commit -m "chore: initialize web application"
```

### Task 2: Build the accessible responsive application shell

**Files:**
- Create: `apps/web/src/components/app-shell.tsx`
- Modify: `apps/web/src/app/layout.tsx`
- Modify: `apps/web/src/app/page.tsx`
- Modify: `apps/web/src/components/app-shell.test.tsx`
- Test: `apps/web/src/components/app-shell.test.tsx`

**Consumes:** the Task 1 test environment.

**Produces:** `AppShell({ children }: { children: React.ReactNode })` with a labelled banner, main landmark, skip link, and responsive content container.

- [ ] **Step 1: Write and run the failing shell test**

Create `apps/web/src/components/app-shell.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { AppShell } from './app-shell';

it('shows the student app name', () => {
  render(<AppShell>Lesson content</AppShell>);
  expect(screen.getByRole('banner', { name: 'English Explorer' })).toBeInTheDocument();
});
```

Run:

```bash
npm run test -- src/components/app-shell.test.tsx
```

Expected: FAIL because `./app-shell` does not yet exist.

- [ ] **Step 2: Add a mobile-first shell implementation**

Create `apps/web/src/components/app-shell.tsx`:

```tsx
import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-900">
      <a className="sr-only focus:not-sr-only" href="#main-content">Skip to lesson content</a>
      <header aria-label="English Explorer" className="border-b bg-white px-4 py-3">
        <div className="mx-auto max-w-5xl font-bold">English Explorer</div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
```

- [ ] **Step 3: Wrap the home page with the shell**

Replace the generated page body in `apps/web/src/app/page.tsx` with:

```tsx
import { AppShell } from '@/components/app-shell';

export default function HomePage() {
  return <AppShell><h1 className="text-3xl font-bold">Ready to learn English?</h1></AppShell>;
}
```

- [ ] **Step 4: Verify the test and build**

Run:

```bash
npm run test -- src/components/app-shell.test.tsx
npm run lint
npm run typecheck
npm run build
```

Expected: all commands pass.

- [ ] **Step 5: Update tracking and commit**

Move `P1-03` to `Review`; append results to `docs/progress.md`; commit:

```bash
git add apps/web docs/backlog.md docs/progress.md
git commit -m "feat: add responsive application shell"
```

### Task 3: Define and test the content contract

**Files:**
- Create: `apps/web/src/features/content/schema.ts`
- Create: `apps/web/src/features/content/schema.test.ts`
- Create: `docs/content-authoring.md`
- Modify: `docs/backlog.md`
- Modify: `docs/progress.md`

**Consumes:** TypeScript and Vitest from Task 1.

**Produces:** `lessonSchema`, `Lesson`, `vocabularyItemSchema`, and `sentencePatternSchema`; a published authoring contract.

- [ ] **Step 1: Move P0-02 to In Progress and write the failing validation tests**

Create `apps/web/src/features/content/schema.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { lessonSchema } from './schema';

describe('lessonSchema', () => {
  it('accepts a lesson with vocabulary and sentence patterns', () => {
    const result = lessonSchema.safeParse({
      id: 'unit-1-lesson-1',
      unitId: 'unit-1',
      title: 'Hello friends',
      vocabulary: [{ id: 'hello', word: 'hello', meaning: 'xin chào', example: 'Hello, Nam!' }],
      sentencePatterns: [{ id: 'greeting', pattern: 'Hello, {name}!', meaning: 'Xin chào, {tên}!' }],
    });
    expect(result.success).toBe(true);
  });

  it('rejects a vocabulary item with no Vietnamese meaning', () => {
    const result = lessonSchema.safeParse({ id: 'l1', unitId: 'u1', title: 'Lesson', vocabulary: [{ id: 'hello', word: 'hello' }], sentencePatterns: [] });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path).toContain('meaning');
  });
});
```

- [ ] **Step 2: Confirm the tests fail**

Run:

```bash
npm run test -- src/features/content/schema.test.ts
```

Expected: FAIL because `./schema` does not exist.

- [ ] **Step 3: Implement the Zod schemas**

Create `apps/web/src/features/content/schema.ts`:

```ts
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
```

- [ ] **Step 4: Document the authoring contract**

Create `docs/content-authoring.md` with the required IDs, Vietnamese meaning, examples, optional media URLs, source/ownership fields, review status, and a note that no student-facing text is published before review.

- [ ] **Step 5: Verify valid and invalid content behavior**

Run:

```bash
npm run test -- src/features/content/schema.test.ts
npm run typecheck
```

Expected: both commands pass.

- [ ] **Step 6: Update tracking and commit**

Move `P0-02` to `Review`; record verification; commit:

```bash
git add apps/web/src/features/content docs/content-authoring.md docs/backlog.md docs/progress.md
git commit -m "feat: define validated lesson content contract"
```

### Task 4: Add a replaceable fixture content repository and lesson navigation

**Files:**
- Create: `apps/web/src/features/content/repository.ts`
- Create: `apps/web/src/features/content/fixture-content.ts`
- Create: `apps/web/src/features/content/fixture-repository.ts`
- Create: `apps/web/src/features/lessons/get-lesson-status.ts`
- Create: `apps/web/src/features/lessons/get-lesson-status.test.ts`
- Create: `apps/web/src/components/lesson-card.tsx`
- Create: `apps/web/src/components/media-control.tsx`
- Create: `apps/web/src/components/media-control.test.tsx`
- Create: `apps/web/src/app/lessons/page.tsx`
- Create: `apps/web/src/app/lessons/[lessonId]/page.tsx`
- Create: `apps/web/tests/e2e/lesson-navigation.spec.ts`
- Modify: `apps/web/src/app/page.tsx`

**Consumes:** `Lesson` from `schema.ts`.

**Produces:** `ContentRepository`, `fixtureContentRepository`, `getLessonStatus`, `/lessons`, and `/lessons/[lessonId]` routes.

- [ ] **Step 1: Write the status-mapping test**

Create `apps/web/src/features/lessons/get-lesson-status.test.ts`:

```ts
import { expect, it } from 'vitest';
import { getLessonStatus } from './get-lesson-status';

it('labels a lesson with no attempt as not started', () => {
  expect(getLessonStatus(undefined)).toEqual({ label: 'Not started', tone: 'neutral' });
});

it('labels a completed lesson as mastered', () => {
  expect(getLessonStatus({ completed: true, mastery: 1 })).toEqual({ label: 'Mastered', tone: 'success' });
});
```

- [ ] **Step 2: Confirm the test fails**

Run:

```bash
npm run test -- src/features/lessons/get-lesson-status.test.ts
```

Expected: FAIL because `get-lesson-status.ts` does not exist.

- [ ] **Step 3: Implement the repository interface and fixture**

Create `apps/web/src/features/content/repository.ts`:

```ts
import type { Lesson } from './schema';

export interface ContentRepository {
  listLessons(): Promise<Lesson[]>;
  getLesson(lessonId: string): Promise<Lesson | null>;
}
```

Create the fixture repository so it parses every fixture record with `lessonSchema.parse` before returning it. Use non-textbook demo content only, labelled as demo content in the UI.

- [ ] **Step 4: Implement lesson status mapping**

Create `apps/web/src/features/lessons/get-lesson-status.ts`:

```ts
type LessonAttempt = { completed: boolean; mastery: number };

export function getLessonStatus(attempt: LessonAttempt | undefined) {
  if (!attempt) return { label: 'Not started', tone: 'neutral' as const };
  if (attempt.completed && attempt.mastery >= 1) return { label: 'Mastered', tone: 'success' as const };
  return { label: 'In progress', tone: 'active' as const };
}
```

- [ ] **Step 5: Build the lesson list and safe lesson route**

Render fixture lessons through `LessonCard`. If `getLesson` returns `null`, call Next.js `notFound()` from the dynamic route. Show a visible `Demo content` label and preserve the `AppShell` main landmark.

- [ ] **Step 6: Add the accessible missing-media fallback before rendering media**

Create `apps/web/src/components/media-control.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { MediaControl } from './media-control';

it('explains when no audio is available', () => {
  render(<MediaControl audioUrl={undefined} label="hello" />);
  expect(screen.getByText('Audio is not available for hello.')).toBeVisible();
});
```

Run:

```bash
npm run test -- src/components/media-control.test.tsx
```

Expected: FAIL because `./media-control` does not exist.

Create `apps/web/src/components/media-control.tsx`:

```tsx
export function MediaControl({ audioUrl, label }: { audioUrl?: string; label: string }) {
  if (!audioUrl) return <p role="status">Audio is not available for {label}.</p>;
  return <audio aria-label={`Listen to ${label}`} controls preload="none" src={audioUrl} />;
}
```

Run:

```bash
npm run test -- src/components/media-control.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Add and run the browser navigation test**

Create `apps/web/tests/e2e/lesson-navigation.spec.ts`:

```ts
import { expect, test } from '@playwright/test';

test('student can open a listed lesson and sees a safe missing-lesson response', async ({ page }) => {
  await page.goto('/lessons');
  await page.getByRole('link', { name: /open lesson/i }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.goto('/lessons/does-not-exist');
  await expect(page.getByText(/not found/i)).toBeVisible();
});
```

Run:

```bash
npx playwright install --with-deps chromium
npm run test
npm run test:e2e -- tests/e2e/lesson-navigation.spec.ts
npm run lint
npm run typecheck
npm run build
```

Expected: all commands pass; fixture content renders; missing IDs do not render a blank lesson.

- [ ] **Step 8: Update tracking and commit**

Move `P2-02` to `Review`; record the test evidence; commit:

```bash
git add apps/web docs/backlog.md docs/progress.md
git commit -m "feat: add lesson navigation foundation"
```

### Task 5: Establish the Supabase schema and secure access boundary

**Files:**
- Create: `supabase/migrations/0001_content_and_progress.sql`
- Create: `apps/web/src/lib/env.ts`
- Create: `apps/web/src/lib/supabase/browser.ts`
- Create: `apps/web/src/lib/supabase/server.ts`
- Create: `apps/web/.env.example`
- Create: `docs/decisions/0001-web-app-layout.md`
- Modify: `docs/backlog.md`
- Modify: `docs/progress.md`

**Consumes:** content identifiers from `schema.ts` and Next.js from Task 1.

**Produces:** versioned database schema, RLS policies, validated environment variables, and browser/server Supabase client factories.

- [ ] **Step 1: Write the migration verification query before the migration**

Create a local SQL scratch/query file outside the committed migration during development that checks: `student_progress.student_id` equals `auth.uid()` for visible rows and that insert/update policies reject a mismatched student ID.

- [ ] **Step 2: Define migration tables and RLS**

Create `supabase/migrations/0001_content_and_progress.sql` with `textbooks`, `units`, `lessons`, `vocabulary_items`, `sentence_patterns`, `student_progress`, and `review_items`. Enable RLS on `student_progress` and `review_items`. Add `select`, `insert`, and `update` policies using `auth.uid() = student_id`; content tables are readable only through the intended public/published policy.

- [ ] **Step 3: Add environment validation**

Create `apps/web/src/lib/env.ts` that validates `NEXT_PUBLIC_SUPABASE_URL` as a URL and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as a non-empty string. It must throw a clear startup error if either is missing.

- [ ] **Step 4: Create separate client factories**

Create `browser.ts` for the browser Supabase client and `server.ts` for the server client. Do not place a service-role key in client code or `.env.example`.

- [ ] **Step 5: Add an environment example and decision record**

Create `.env.example` with only non-secret example values. Record in `docs/decisions/0001-web-app-layout.md` that documentation remains at the root and the deployable Next.js app lives in `apps/web`.

- [ ] **Step 6: Apply the migration to a disposable local/staging Supabase project and test policy behavior**

Run the project-standard migration command after Supabase CLI configuration exists. Execute the Step 1 verification query with two distinct authenticated test users.

Expected: a user can only select, insert, or update their own progress/review records; cross-user attempts are rejected.

- [ ] **Step 7: Run application checks and update tracking**

Run from `apps/web`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected: all commands pass. Move `P1-04` to `Review`, log the RLS verification evidence, then commit:

```bash
git add apps/web supabase docs/decisions docs/backlog.md docs/progress.md
git commit -m "feat: add secure Supabase foundation"
```

### Task 6: Complete foundation review and prepare the vertical-slice plan

**Files:**
- Modify: `docs/backlog.md`
- Modify: `docs/progress.md`
- Modify: `docs/roadmap.md`
- Create: `docs/superpowers/plans/2026-09-19-learning-vertical-slice.md`

**Consumes:** completed Tasks 1–5 and the confirmed textbook/content material from P0-01.

**Produces:** reviewed foundation and a separate approved plan for vocabulary cards, sentence patterns, exercise engine, feedback, progress, and review queue.

- [ ] **Step 1: Run the complete foundation verification suite**

Run from `apps/web`:

```bash
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

Expected: all commands pass.

- [ ] **Step 2: Review all foundation acceptance and performance criteria**

Confirm: app shell is responsive, schemas reject invalid content, list/detail routes are safe, fixture data is isolated, environment variables are validated, RLS blocks cross-student access, media dimensions/fallbacks prevent layout shifts, and performance instrumentation has a documented route for the validation release.

- [ ] **Step 3: Update the tracking records**

Move reviewed P0/P1/P2 tasks to `Done`, update M2 in `docs/roadmap.md`, and record the exact command output summary in `docs/progress.md`.

- [ ] **Step 4: Write the vertical-slice plan only after textbook content is confirmed**

Use the supplied textbook structure to create a separate plan covering P0-03, P2-03 through P3-04. The plan must use real content fields, exact exercise examples, and the confirmed media-source workflow.

- [ ] **Step 5: Commit the foundation closeout**

```bash
git add docs/backlog.md docs/progress.md docs/roadmap.md docs/superpowers/plans
git commit -m "docs: close application foundation milestone"
```

## Plan self-review

### Spec coverage

- Responsive web app, modular content boundary, testing, accessibility, secure student data, and content validation are covered by Tasks 1–5.
- Vocabulary learning, sentence-pattern learning, exercises, feedback, progress, review algorithm, and gamification require confirmed textbook content and are explicitly carried into the separate vertical-slice plan in Task 6.
- Parent/teacher capabilities and AI/model routing remain intentionally excluded.

### Type consistency

- `Lesson` is inferred from `lessonSchema` and is used by `ContentRepository`.
- `getLessonStatus` accepts only the explicitly defined `{ completed, mastery }` shape.
- Route code receives `Lesson | null` and must handle `null` with `notFound()`.

### Review-focus coverage

- Malformed content: Task 3 schema test.
- Missing media: Task 4 component/render requirement for fallback UI.
- Missing lesson: Task 4 Playwright test.
- Mobile layout: Task 2 responsive shell acceptance and Task 6 review.
- Cross-user progress access: Task 5 RLS verification query.
