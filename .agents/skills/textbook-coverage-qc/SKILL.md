---
name: textbook-coverage-qc
description: Use before publishing textbook-derived Units, lessons, reviews, wordlists, games, audio, or images to verify source coverage, rights, schemas, and answer keys.
---

# Textbook coverage QC

Read `docs/content-authoring.md`, `docs/backlog.md`, the source book map, and
the relevant `content-qc` skill. Check the normalized records before any
student route can use them.

Required checks:

- Starter/Unit/Review/Wordlist coverage matches the approved book map.
- Every lesson/activity/media item has a source page or track reference.
- Rights evidence, reviewer, and `approved` status exist for published items.
- Zod schemas accept the record; invalid records fail with useful paths.
- Every exercise has a deterministic answer key and reviewed feedback.
- Media IDs resolve to approved manifest records or show a safe fallback.
- No textbook text or unreviewed content is hidden in React components.

Record failures and evidence in `docs/progress.md`. Use `student-flow-qa` for
the child-facing responsive flow after content passes this gate.
