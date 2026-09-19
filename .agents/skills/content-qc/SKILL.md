---
name: content-qc
description: Use when adding or reviewing Grade 4 vocabulary, sentence patterns, exercises, answer keys, audio, images, or textbook source records.
---

# Content QC

Use this workflow to keep reviewed textbook-derived content separate from UI
code and safe for Grade 4 self-study.

## Required context

Read `docs/content-authoring.md` and the current task in
`docs/backlog.md` before editing content. Inspect the relevant schema in
`apps/web/src/features/content/schema.ts` and existing tests.

## Review gates

- Do not copy, ingest, adapt, or publish source text, images, or audio while
  ownership or allowed-use evidence is pending.
- Validate every lesson with `lessonSchema.safeParse`.
- Check required IDs, English spelling, Vietnamese meaning, child-friendly
  examples, and optional media URLs.
- Check every copied or adapted asset has a source reference, copyright owner,
  allowed-use evidence, author/adaptor, reviewer, and review status.
- Only `approved` review records may reach student-facing routes.
- Do not publish AI-generated student-facing content without human review,
  source grounding, age appropriateness, and a documented safety boundary.

## Evidence

Run focused schema/content tests, then the relevant package checks. Record the
review result, corrections, evidence locations, and remaining blocker in
`docs/progress.md`. Keep content records in the content feature or authoring
data; never hide textbook text inside React components.
