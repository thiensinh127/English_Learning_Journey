# Grade 4 Learning Vertical Slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver one deterministic student learning loop for approved Grade 4 Global Success pilot lessons: learn vocabulary and sentence patterns, practice, receive feedback, and retain progress for review.

**Architecture:** Extend the existing Next.js modular monolith with framework-independent learning domains. Keep approved textbook data in validated content records, keep exercise evaluation deterministic on the server boundary, and use Supabase only through repositories that enforce the authenticated student boundary.

**Tech Stack:** Next.js App Router, TypeScript, Zod, Vitest, Playwright, Supabase/PostgreSQL/RLS, Tailwind CSS, and native audio controls with lazy loading.

**Spec:** `docs/superpowers/specs/2026-09-19-grade4-english-learning-app-design.md`

**Foundation:** `docs/superpowers/plans/2026-09-19-foundation-and-content-contract.md`

## Global Constraints

- Target Vietnamese grade 4 student self-study; use short, encouraging copy.
- Keep all textbook content outside React components.
- Pilot scope is three approved lessons selected from the 24-unit, two-semester Tiếng Anh 4 — Global Success book.
- Do not copy or publish textbook text, images, or audio until ownership and allowed-use evidence are recorded.
- Do not add free-form AI, speech assessment, parent/teacher features, or competitive leaderboards.
- Exercise evaluation and review rules must be deterministic.
- Student-owned reads and writes must use the authenticated server/client boundary and RLS.
- Load lesson data and media on demand; do not preload an entire book or all audio.
- Target p75 LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1; target API p95 ≤ 400ms for reads and ≤ 700ms for progress writes.

## Review Focus

- An unapproved or incomplete lesson must never be published to a student route.
- A malformed answer, duplicate option, empty ordering list, or unsupported exercise type must fail validation before rendering.
- A retry must not create duplicate progress attempts or review items.
- A student must not read or mutate another student's progress, even when the client sends another student ID.
- Slow or missing media must preserve the primary learning action and must not create layout shift.

## Prerequisites and gates

Implementation starts only after these gates are recorded in `docs/progress.md`:

1. P0-01 records allowed-use evidence for the Học liệu.VN Global Success source.
2. P0-03 contains exactly three reviewed pilot lessons, including vocabulary, sentence patterns, exercises, answer keys, explanations, and media source records.
3. P1-04 applies the migration and proves cross-student RLS behavior with two authenticated test users.

Until the gates pass, use the existing clearly labelled demo fixture only for component and domain tests; never substitute it for pilot content.

## File map

```text
apps/web/src/features/content/
  pilot-manifest.ts                 # approved lesson IDs and review metadata
  pilot-import.ts                   # validate and load the approved batch
  pilot-import.test.ts
  repository.ts                     # read-only lesson access boundary
apps/web/src/features/exercises/
  schema.ts                         # exercise and answer contracts
  evaluate.ts                       # deterministic answer evaluation
  evaluate.test.ts                  # one test per exercise type and invalid input
apps/web/src/features/progress/
  repository.ts                     # authenticated progress interface
  record-attempt.ts                 # idempotent attempt command
  record-attempt.test.ts
apps/web/src/features/review/
  priority.ts                       # deterministic review priority transitions
  priority.test.ts
apps/web/src/features/gamification/
  rewards.ts                        # explainable points, streak, badge rules
  rewards.test.ts
apps/web/src/components/
  vocabulary-card.tsx
  sentence-pattern-card.tsx
  exercise-player.tsx
  feedback-panel.tsx
  progress-summary.tsx
apps/web/src/app/lessons/[lessonId]/learn/page.tsx
apps/web/src/app/lessons/[lessonId]/practice/page.tsx
apps/web/src/app/lessons/[lessonId]/results/page.tsx
apps/web/tests/e2e/student-learning-loop.spec.ts
supabase/migrations/0002_learning_attempts.sql
docs/content-review/
  pilot-lesson-1.md
  pilot-lesson-2.md
  pilot-lesson-3.md
```

### Task 1: Register and approve the three-lesson pilot content

**Files:** `docs/content-authoring.md`, `docs/content-review/pilot-lesson-1.md`, `docs/content-review/pilot-lesson-2.md`, `docs/content-review/pilot-lesson-3.md`, `apps/web/src/features/content/pilot-manifest.ts`, `apps/web/src/features/content/pilot-import.ts`, `apps/web/src/features/content/pilot-import.test.ts`

**Interfaces:** Consume `lessonSchema` and the Học liệu.VN source record. Produce a manifest containing three approved lesson IDs, source references, review status, and media rights evidence. The manifest must not contain student-facing content until each record is `approved`.

- [ ] Record the book identity, publisher, edition, source URL, allowed-use decision, and reviewer in the content review records.
- [ ] Select one representative lesson from each of the first three textbook units (`My friends`, `Time and daily routines`, and `My week`) only after the corresponding pages are available through an allowed source.
- [ ] Author vocabulary, sentence patterns, examples, exercise answers, and media references in structured records; run `lessonSchema.safeParse` for every record.
- [ ] Write a failing import test for one malformed pilot record, then implement the import guard so the batch fails with lesson ID and field path.
- [ ] Run the content validation command and commit the reviewed pilot package separately from presentation code.

### Task 2: Define the deterministic exercise domain

**Files:** `apps/web/src/features/exercises/schema.ts`, `evaluate.ts`, `evaluate.test.ts`

**Interfaces:**

```ts
type Exercise =
  | { id: string; type: 'multiple-choice'; prompt: string; options: string[]; answerIndex: number }
  | { id: string; type: 'word-order'; prompt: string; tokens: string[]; answer: string[] }
  | { id: string; type: 'fill-blank'; prompt: string; answer: string }
  | { id: string; type: 'listening-selection'; prompt: string; options: string[]; answerIndex: number };

type Evaluation = {
  correct: boolean;
  normalizedAnswer: string;
  feedback: string;
};

function evaluateExercise(exercise: Exercise, answer: unknown): Evaluation;
```

- [ ] Write failing tests for correct and incorrect multiple choice, word order, fill-blank normalization, and listening selection.
- [ ] Write invalid-input tests for duplicate options, out-of-range answer indexes, empty tokens, and unknown exercise types.
- [ ] Implement Zod schemas and pure evaluation functions with no AI, network, clock, or random dependency.
- [ ] Verify the full unit suite and mutation-sensitive assertions before committing.

### Task 3: Build vocabulary and sentence-pattern learning cards

**Files:** `apps/web/src/components/vocabulary-card.tsx`, `apps/web/src/components/vocabulary-card.test.tsx`, `apps/web/src/components/sentence-pattern-card.tsx`, `apps/web/src/components/sentence-pattern-card.test.tsx`, `apps/web/src/app/lessons/[lessonId]/learn/page.tsx`.

**Interfaces:** Components receive validated `Lesson['vocabulary'][number]` or `Lesson['sentencePatterns'][number]` records and expose a completion callback; they must not fetch or embed textbook data themselves.

- [ ] Write component tests for English word, Vietnamese meaning, example, and missing-image/audio states in the two named component test files.
- [ ] Implement one-card-at-a-time navigation with keyboard-accessible previous/next controls and a visible item position.
- [ ] Use `preload="none"` for audio, reserve media dimensions, and keep the next learning action visible on a small screen.
- [ ] Add `/lessons/[lessonId]/learn` with separate vocabulary and sentence-pattern sections.
- [ ] Add a Playwright check that a student can finish the learn step for an approved pilot lesson.

### Task 4: Build the shared practice player and feedback

**Files:** `apps/web/src/components/exercise-player.tsx`, `apps/web/src/components/exercise-player.test.tsx`, `apps/web/src/components/feedback-panel.tsx`, `apps/web/src/components/feedback-panel.test.tsx`, `apps/web/src/app/lessons/[lessonId]/practice/page.tsx`, `apps/web/src/app/lessons/[lessonId]/results/page.tsx`.

- [ ] Write failing tests for submit, correct feedback, incorrect feedback, retry, and completion transitions.
- [ ] Implement one exercise per screen; prevent submission until the answer shape is valid.
- [ ] Render concise, encouraging feedback from deterministic `Evaluation.feedback`; never generate a new student-facing explanation at runtime.
- [ ] Show score, completed count, retry action, and a link to review weak items on the results route.
- [ ] Add Playwright coverage for both correct and incorrect answer paths using approved fixture records in a test-only repository.

### Task 5: Persist attempts and protect student progress

**Files:** `supabase/migrations/0002_learning_attempts.sql`, `apps/web/src/features/progress/repository.ts`, `apps/web/src/features/progress/record-attempt.ts`, `apps/web/src/features/progress/record-attempt.test.ts`, `apps/web/src/app/api/progress/route.ts`, `apps/web/tests/integration/progress-rls.test.ts`.

**Interfaces:**

```ts
type AttemptInput = {
  lessonId: string;
  exerciseId: string;
  correct: boolean;
  normalizedAnswer: string;
  requestId: string;
};

type ProgressRepository = {
  recordAttempt(input: AttemptInput): Promise<void>;
  getLessonProgress(lessonId: string): Promise<{ completed: boolean; mastery: number }>;
};
```

- [ ] Write a failing idempotency test showing the same `requestId` produces one attempt and one progress event.
- [ ] Add a migration with a unique `(student_id, request_id)` constraint and indexes for student/lesson reads.
- [ ] Derive `student_id` from the authenticated server session; reject client-supplied identity fields.
- [ ] Add integration tests against the disposable Supabase project after P1-04 is unblocked.
- [ ] Re-run the two-user RLS verification query before marking this task Review.

### Task 6: Implement review priority and lightweight motivation

**Files:** `apps/web/src/features/review/priority.ts`, `apps/web/src/features/review/priority.test.ts`, `apps/web/src/features/gamification/rewards.ts`, `apps/web/src/features/gamification/rewards.test.ts`, `apps/web/src/components/review-queue.tsx`, `apps/web/src/components/reward-summary.tsx`, and `apps/web/src/app/review/page.tsx`.

- [ ] Write tests for incorrect answer increasing priority, correct-after-error lowering but retaining priority, and repeated correct answers reaching mastery.
- [ ] Implement priority transitions as pure functions behind a replaceable interface.
- [ ] Write tests for explainable points, a non-blocking streak, and a small fixed badge set; do not add ranking or competition.
- [ ] Add review items to results and home progress views only after persisted progress is available.

### Task 7: Validate the complete student journey and release quality

**Files:** `apps/web/tests/e2e/student-learning-loop.spec.ts`, `docs/progress.md`, and the release performance/accessibility evidence files under `docs/release/`.

- [ ] Add a Playwright journey: open approved lesson → learn vocabulary → study patterns → complete practice → view results → refresh → see progress/review.
- [ ] Run keyboard and mobile viewport checks; verify no horizontal scroll and that audio fallback preserves the primary action.
- [ ] Measure mobile and desktop LCP, INP, and CLS on the primary route; record p75 evidence against the project thresholds.
- [ ] Measure lesson read and progress write p95 latency with bounded pilot data; investigate any threshold breach before release.
- [ ] Run lint, typecheck, unit tests, all Playwright tests, and production build; update roadmap and backlog only from evidence.

## Commit sequence

Use one focused commit per task:

1. `feat: register approved pilot content`
2. `feat: add deterministic exercise domain`
3. `feat: add vocabulary and sentence learning cards`
4. `feat: add exercise player and feedback`
5. `feat: persist idempotent learning progress`
6. `feat: add review priority and motivation rules`
7. `test: validate student learning vertical slice`

## Current execution status

This plan is prepared and intentionally not executing content ingestion yet. P0-01 still needs allowed-use evidence, and P1-04 still needs live Supabase/RLS verification. The existing demo fixture remains the only safe source for UI/domain tests until both gates are recorded.
