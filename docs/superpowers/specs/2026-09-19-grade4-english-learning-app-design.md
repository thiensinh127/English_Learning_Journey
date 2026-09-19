# Grade 4 English Learning App — Product and Technical Design

## Product brief

Build a responsive web app/PWA for Vietnamese grade 4 students to self-study English. The first release reviews vocabulary and sentence patterns lesson by lesson from one grade 4 textbook supplied by the product owner.

The student is the primary user. Parent and teacher dashboards are deferred until the learning loop is validated.

## Learning model

Each session follows: `Learn → Practice → Recall → Check → Review weak items`.

Sessions target 5–10 minutes. Feedback is immediate, encouraging, and brings incorrectly answered items back into a review queue.

## MVP scope

In scope:

- One confirmed grade 4 textbook and three to five pilot lessons.
- Vocabulary cards: image, word, Vietnamese meaning, example, pronunciation, and audio when available.
- Sentence-pattern cards: short explanation, examples, and audio when available.
- Image/word matching, multiple choice, word ordering, fill-in-the-blank, and listening selection exercises.
- Immediate feedback, results, persisted progress, mastery status, review queue, points, streaks, badges, and responsive student UI.

Out of scope:

- Parent/teacher dashboards, speech assessment, competitive leaderboards, multiple grades or textbook series.
- Free-form AI tutor and automated AI-generated student content.
- Microservices and a separate model-router platform.

## Product structure

Main screens: Home, lesson list, vocabulary learning, sentence-pattern learning, exercise player, and results.

Canonical content hierarchy:

```text
Textbook → Unit → Lesson → Vocabulary / SentencePattern / Exercise → Question
```

Content is structured data, never hard-coded into interface components.

## Technical architecture

- Next.js App Router and TypeScript for the responsive web application.
- Tailwind CSS and accessible reusable UI components.
- Supabase PostgreSQL, Auth, Storage, and Row Level Security.
- Vercel deployment.
- Vitest unit/domain tests and Playwright browser-flow tests.
- Minimal product analytics; collect only data needed to improve learning.

Use a modular monolith. Keep content, learning session, exercise evaluation, progress, review queue, and gamification as separate domain modules.

## Core rules

Exercise evaluation returns correct/incorrect, normalized answer, feedback, mastery/progress event, and optional review update. It is deterministic for approved MVP content.

Review priority is deterministic:

- Incorrect answers add or raise priority.
- A correct answer after an error lowers priority but retains the item for review.
- Repeated correct answers mark the item mastered.
- Daily review presents highest-priority items first.

The review algorithm is behind an interface so it can later evolve into spaced repetition without changing UI code.

## Safety and quality

- Minimize student data; do not collect unnecessary personal information.
- Use server-side authorization and RLS for student-owned data.
- Validate content before publishing it.
- Keep source/ownership records for all text, audio, and images.
- Support keyboard access and small screens.
- Cover content loading, answer evaluation, progress, review prioritization, and the primary student journey with tests.

## Performance and reliability standards

- Measure Core Web Vitals at the 75th percentile by mobile and desktop: LCP ≤ 2.5 seconds, INP ≤ 200 milliseconds, and CLS ≤ 0.1.
- Load lesson data, images, and audio only when needed. Do not preload the complete textbook or all media assets.
- Declare image and media dimensions, provide an accessible missing-media fallback, and avoid layout shifts during loading.
- Target API p95 latency of ≤ 400 milliseconds for reads and ≤ 700 milliseconds for progress writes under expected MVP usage.
- Progress writes must be idempotent so a retry cannot create duplicate attempts or review items.
- Index foreign keys, common filter/sort fields, and every non-primary-key column used in an RLS policy. Avoid N+1 and unbounded list queries.
- Use monitoring to capture client errors, API failures, slow queries, and Web Vitals. Optimize only after measurement identifies a bottleneck.

## Delivery phases

1. Confirm textbook and content rights; prepare pilot content.
2. Set up application, quality tooling, UI foundation, and Supabase boundary.
3. Build lesson navigation, learning cards, exercise engine, feedback, and results.
4. Add persisted progress, review queue, home view, and gamification.
5. Validate content/UX, accessibility, performance, and deployment.
6. Consider controlled AI use cases only after MVP validation.

## Success criteria

- A student completes one lesson without adult help.
- Incorrect answers get clear feedback and appear in review.
- Progress remains after refresh or return.
- A reviewer can change lesson content without changing UI code.
- The main student journey has automated browser coverage.
- Content and media sources are documented.
- The primary student routes meet the performance and reliability standards before the validation release.
