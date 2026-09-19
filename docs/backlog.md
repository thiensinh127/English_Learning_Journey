# Project Backlog

Status values: `Backlog`, `Ready`, `In Progress`, `Review`, `Done`, `Blocked`, `Deferred`.

| ID | Priority | Task | Status | Depends on |
|---|---|---|---|---|
| P0-01 | P0 | Confirm textbook and content rights | Ready | — |
| P0-02 | P0 | Define content schema and authoring format | Review | P0-01 |
| P0-03 | P0 | Prepare pilot content | Backlog | P0-02 |
| P1-01 | P0 | Initialize Next.js project | Review | — |
| P1-02 | P0 | Establish quality tooling | Review | P1-01 |
| P1-03 | P1 | Establish UI foundation | Review | P1-01 |
| P1-04 | P0 | Set up Supabase boundaries | Blocked | P1-01 |
| P1-05 | P0 | Add project tracking workflow | Backlog | P1-01 |
| P2-01 | P0 | Implement content ingestion | Backlog | P0-03, P1-04 |
| P2-02 | P0 | Build textbook and lesson navigation | Review | P2-01, P1-03 |
| P2-03 | P0 | Build vocabulary learning | Backlog | P2-02 |
| P2-04 | P0 | Build sentence-pattern learning | Backlog | P2-02 |
| P2-05 | P0 | Build exercise engine | Backlog | P2-01 |
| P2-06 | P0 | Build feedback and results | Backlog | P2-05 |
| P3-01 | P0 | Persist student progress | Backlog | P2-06, P1-04 |
| P3-02 | P0 | Implement review queue | Backlog | P3-01 |
| P3-03 | P1 | Build home progress view | Backlog | P3-01, P3-02 |
| P3-04 | P1 | Add lightweight gamification | Backlog | P3-01 |
| P4-01 | P0 | Full student journey test | Backlog | P3-03, P3-04 |
| P4-02 | P0 | Content and UX review | Backlog | P4-01 |
| P4-03 | P0 | Performance and accessibility pass | Backlog | P4-01 |
| P4-04 | P0 | Deploy validation release | Backlog | P4-02, P4-03 |
| P5-01 | P2 | Define safe AI use cases | Deferred | M5 |
| P5-02 | P2 | Add model selection policy | Deferred | P5-01 |

## Task update template

```text
### TASK-ID — title
- Status:
- Owner:
- Dependencies:
- Acceptance criteria:
- Verification:
- Notes/blockers:
```
