# Grade 4 English Learning App — Implementation Plan

## Goal

Build and validate a web-first MVP for Vietnamese grade 4 students to review vocabulary and sentence patterns lesson by lesson from one confirmed textbook.

## Execution rules

- Work one task at a time unless tasks are explicitly independent.
- Before coding a task, move it to `In Progress` in `docs/backlog.md`.
- Add or update tests with every behavior change.
- After implementation, run the task's verification commands and record evidence in `docs/progress.md`.
- Move a task to `Review` only when its Definition of Done is met.
- Move a task to `Done` only after review and verification.
- Keep textbook content separate from UI code.

## Phase 0 — Product and content readiness

### P0-01 Confirm textbook and content rights

Define the exact grade 4 textbook, units, lessons, and permitted content/audio/image sources.

Done when: textbook identity is recorded; content ownership/source notes exist; first three to five lessons are selected.

### P0-02 Define content schema and authoring format

Choose the canonical format for textbook, unit, lesson, vocabulary, sentence pattern, exercise, and question records.

Done when: schema examples validate; required fields and answer formats are documented.

### P0-03 Prepare pilot content

Create a small, reviewed content set for three to five lessons.

Done when: vocabulary, sentence patterns, exercises, answer keys, explanations, and media references are complete and reviewed.

## Phase 1 — Repository and application foundation

### P1-01 Initialize project

Create the Next.js App Router TypeScript application and baseline scripts.

Done when: local development, production build, lint, and typecheck commands work.

### P1-02 Establish quality tooling

Configure formatting, linting, Vitest, Playwright, and a basic CI verification command.

Done when: a sample unit test and smoke browser test pass locally.

### P1-03 Establish UI foundation

Create the responsive layout shell, typography, colors, accessible controls, loading state, empty state, and error state.

Done when: the shell works at mobile, tablet, and laptop widths and has no critical accessibility issues in a basic audit.

### P1-04 Set up Supabase boundaries

Create environment variable validation, server/client Supabase clients, migration conventions, and RLS policy conventions.

Done when: the app can connect using non-secret public configuration and protected operations do not bypass the server/security boundary.

### P1-05 Add project tracking workflow

Keep `AGENTS.md`, `docs/roadmap.md`, `docs/backlog.md`, `docs/progress.md`, and decision records current.

Done when: a new contributor or Codex session can identify the current task, commands, blockers, and next action.

## Phase 2 — Content and learning experience

### P2-01 Implement content ingestion

Load validated content into the database or a clearly isolated seed/import pipeline.

Done when: content can be loaded repeatably and invalid records fail with actionable errors.

### P2-02 Build textbook and lesson navigation

Implement textbook → unit → lesson navigation and lesson status display.

Done when: a student can find and start every pilot lesson without dead ends.

### P2-03 Build vocabulary learning

Implement image, word, meaning, example, pronunciation, and audio playback states.

Done when: a student can move through all vocabulary items and audio failures have a usable fallback.

### P2-04 Build sentence-pattern learning

Implement pattern, meaning, example dialogue, and audio states.

Done when: a student can study every pilot sentence pattern and return to the lesson flow.

### P2-05 Build exercise engine

Define the common exercise interface and implement matching, multiple choice, word ordering, fill-in-the-blank, and listening selection.

Done when: each exercise type has deterministic evaluation tests and works through the shared player.

### P2-06 Build feedback and results

Implement one-question-at-a-time feedback, concise explanations, score, completion, and retry flow.

Done when: correct and incorrect paths are understandable to a grade 4 student.

## Phase 3 — Progress, review, and motivation

### P3-01 Persist student progress

Store lesson attempts, item outcomes, completion, and mastery state.

Done when: progress survives refresh and returning to the app.

### P3-02 Implement review queue

Implement the deterministic priority rules from the design spec behind a replaceable service interface.

Done when: wrong items reappear, repeated correct answers lower priority, and unit tests cover transitions.

### P3-03 Build home progress view

Show continue learning, recommended review, lesson progress, and basic daily activity.

Done when: the next useful action is clear immediately after sign-in.

### P3-04 Add lightweight gamification

Implement points, streak, badges, and lesson progress without competitive ranking.

Done when: rewards are explainable, non-blocking, and covered by domain tests.

## Phase 4 — Validation and pilot

### P4-01 Full student journey test

Cover sign-in/session, lesson selection, learning, exercise, result, progress persistence, and review.

Done when: the critical journey passes in Playwright on supported viewport sizes.

### P4-02 Content and UX review

Review with representative students or an adult reviewer familiar with grade 4 English.

Done when: usability issues are logged, prioritized, and critical issues are resolved.

### P4-03 Performance and accessibility pass

Check loading, image/audio behavior, keyboard access, readable text, and error recovery.

Done when: no release-blocking issues remain.

### P4-04 Deploy validation release

Deploy to staging/production, verify environment configuration, migrations, storage, and monitoring.

Done when: a clean user can complete a lesson on the deployed URL and rollback instructions exist.

## Phase 5 — Controlled AI/model routing, after MVP validation

### P5-01 Define safe AI use cases

Select only bounded use cases such as generating draft exercises for human review or explaining a wrong answer from approved content.

Done when: inputs, outputs, refusal behavior, cost limits, and human review are specified.

### P5-02 Add model selection policy

Introduce a provider/model adapter only if a validated use case needs it. Route by task type, latency/cost budget, quality requirement, and fallback policy.

Done when: model selection is observable, deterministic for tests, and never allows unreviewed AI content to enter the student curriculum.

