# MVP Delivery Timeline

## Planning assumptions

- One developer works about 20 focused hours per week with Codex support.
- The product owner supplies the confirmed grade 4 textbook, content permission/source information, and reviews pilot content promptly.
- The MVP covers three to five lessons only; parent/teacher features, speech assessment, and student-facing AI remain out of scope.
- The calendar starts when P1-01 begins. Content preparation and technical foundation run in parallel where dependencies permit.

## Recommended timeline: 8 weeks part-time

| Week | Milestone | Deliverable | Exit criteria |
|---|---|---|---|
| 0 | Scope and content kickoff | Confirmed textbook, selected pilot lessons, source/ownership register | P0-01 is Done; no unlicensed content enters the repo |
| 1 | Architecture foundation | Git, Next.js, TypeScript, test tooling, tracking, responsive shell | `lint`, typecheck, unit tests, and production build pass |
| 2 | Content contract | Validated schema, authoring guide, demo lesson navigation, Supabase migration/RLS design | Invalid content fails validation; missing lesson/media has safe UI fallback |
| 3 | Learning cards | Vocabulary and sentence-pattern study screens with audio fallback | Student can complete study content of one pilot lesson without adult guidance |
| 4 | Exercise vertical slice | Five exercise types, deterministic evaluation, feedback, result screen | Every exercise evaluator has unit tests; critical lesson path has browser test |
| 5 | Progress and review | Persisted attempts, mastery, deterministic review queue, home recommendation | Refresh preserves progress; incorrect items reappear according to rules |
| 6 | Motivation and content loading | Points, streak, badges, three to five reviewed lessons | Gamification does not block learning; pilot content passes content QC |
| 7 | Pilot and release hardening | Child-facing usability review, performance/accessibility fixes, monitoring | No release-blocking UX, security, accessibility, or performance issue remains |
| 8 | Validation release | Staging/production deploy and learner test | Clean student account completes a lesson; rollback and support notes exist |

## Fast-track timeline: 5–6 weeks full-time

This is feasible only when the textbook content and media rights are ready at the start. Combine weeks 1–2, 3–4, and 6–7, but do not skip automated tests, content QC, or pilot validation.

## Delivery gates

### Gate A — after Week 2

Proceed only if the content format is validated, the foundation checks pass, and the exact textbook/pilot lessons are available. If content rights or source data are unclear, keep building fixture-only UI and do not publish textbook content.

### Gate B — after Week 5

Proceed to pilot only if a student can finish one complete lesson, progress persists, and weak items enter review correctly. If not, defer gamification and focus on the learning loop.

### Gate C — before Week 8 release

Release only if the full student journey passes, RLS prevents cross-student access, no critical accessibility issue remains, and the primary routes meet the documented performance standards.

## Tracking rhythm

- At the start of each work session: choose one `Ready` task in `docs/backlog.md` and move it to `In Progress`.
- At the end of each work session: update `docs/progress.md` with verification evidence, blockers, and next action.
- At the end of each week: update milestone status in `docs/roadmap.md`, compare actual progress against this timeline, and adjust scope before moving dates.
- Do not mark a milestone Done solely because its planned week ended; all exit criteria must be met.

## Main delivery risks

| Risk | Early signal | Response |
|---|---|---|
| Textbook content or media source is delayed | P0-01 remains open after Week 1 | Continue fixture-based UI; do not begin production content ingestion |
| Exercise engine expands beyond MVP | More than five types or special cases appear | Keep five approved types and log new types as post-MVP backlog |
| Child usability is weak | Students need adult explanation to continue | Simplify copy/navigation before adding rewards or new features |
| Performance drops on mobile | Core Web Vitals or route tests miss targets | Optimize media, route loading, and data queries before feature expansion |
| Scope expansion | New dashboard, AI tutor, or multi-grade request appears | Add to Deferred backlog and preserve current milestone boundary |

