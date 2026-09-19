---
name: lesson-game-authoring
description: Use when turning an approved textbook lesson into deterministic vocabulary, listening, sentence, matching, or quiz activities for grades 1–4.
---

# Lesson game authoring

Read `docs/content-authoring.md`, the relevant source records, and the active
task before authoring. Use the activity schema from
`apps/web/src/features/content/activity-schema.ts`.

Rules:

- Map every activity to a lesson and one or more source references.
- Keep prompts short, answer sets bounded, and feedback reviewed for children.
- Use only approved vocabulary, sentence patterns, images, and audio IDs.
- Evaluate answers through the pure deterministic evaluator; seeded option
  order may change presentation but never correctness.
- Start with flashcards, picture/word matching, listening choice, sentence
  choice/order, and a short unit quiz.
- Do not add AI-generated student-facing wording without human review.

Verify with:

```bash
npm run test -- src/features/content/activity-evaluation.test.ts
npm run typecheck
```
