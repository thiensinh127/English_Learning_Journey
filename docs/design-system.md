# English Learning Journey — design system

This document is the visual source of truth for the student product and its
responsive web/PWA surfaces. It translates the approved responsive mockup into
rules that are easy to apply consistently in React and Tailwind.

Approved visual reference: [`apps/web/public/design/english-learning-journey-responsive-mockup.png`](../apps/web/public/design/english-learning-journey-responsive-mockup.png)

## Product personality

- Audience: children in grades 1–4, with a separate calmer parent/teacher view.
- Student UI: playful exploration, map progression, friendly rewards, and one
  obvious next action per screen.
- Parent/teacher UI: quieter surfaces, clearer metrics, and less game decoration.
- Keep the experience encouraging and simple; do not make it look like an
  admin dashboard or a baby app.

## Typography

Use the bundled CSS font variables from the root layout:

- `font-display`: Baloo 2 — screen titles, game-world labels, reward moments,
  and large CTAs.
- `font-sans`: Nunito — body copy, navigation, controls, lesson content, and
  data labels.
- `font-mono`: reserved for technical/debug output only.

Rules:

- Use sentence case for Vietnamese copy. Avoid all-caps except for short,
  high-priority labels such as `NHIỆM VỤ HÔM NAY`.
- Minimum body size is 16px on student surfaces and 14px only for secondary
  metadata. Never use text smaller than 12px.
- Prefer `font-semibold` or `font-bold` for child-facing labels and maintain
  strong contrast against the background.

## Color tokens

Use semantic tokens instead of one-off hex values in components.

| Token | Hex | Use |
| --- | --- | --- |
| `journey-navy` | `#111B5E` | Primary text, dark map labels |
| `journey-ink` | `#1F2552` | Body text and headings |
| `journey-blue` | `#2563EB` | Primary action, active navigation |
| `journey-sky` | `#E8F7FF` | App background, sky panels |
| `journey-teal` | `#14B8A6` | Success, listening, progress |
| `journey-green` | `#22C55E` | Completed state and positive feedback |
| `journey-yellow` | `#FBBF24` | XP, stars, rewards |
| `journey-orange` | `#F59E0B` | Streak, map accents, attention |
| `journey-coral` | `#FB7185` | Friendly warning and incorrect answer |
| `journey-cream` | `#FFFDF7` | Cards and reading surfaces |
| `journey-muted` | `#64748B` | Secondary text |

Accessibility rules:

- Use `journey-navy` or `journey-ink` for text on light surfaces.
- Do not communicate correct/incorrect state through color alone; pair it
  with a check/cross icon and a short message.
- Keep focus indicators visible with at least a 2px `journey-blue` outline.

## Shape, spacing, and elevation

- Base spacing follows an 8px rhythm: `8, 16, 24, 32, 40, 48`.
- Cards use 20–24px radius; buttons use 14–18px radius; map nodes are round.
- Student touch targets are at least 48×48px. Primary CTAs should be 52–56px
  high on mobile.
- Use soft, shallow shadows only. Avoid glassmorphism, heavy blur, and 3D UI.
- Reserve illustration/media dimensions before loading to prevent layout shift.

## Responsive composition

- Mobile: one-column flow, bottom navigation, one primary CTA, map/lesson
  content before secondary cards.
- Tablet: two-column student home with the learning map as the visual anchor;
  progress and missions sit beside it.
- Desktop: persistent side navigation, wide map/hero area, and grouped cards.
  Parent/teacher desktop views may use denser charts but keep the same tokens.

## Interaction language

- Prefer verbs: `Tiếp tục học`, `Bắt đầu`, `Ôn lại`, `Nghe`, `Làm quiz`.
- Keep one dominant action per viewport.
- Rewards should reinforce learning: stars, XP, streaks, badges, and map unlocks.
- Correct/wrong feedback should be immediate, friendly, and deterministic.

## Implementation contract

- Use `font-display`, `font-sans`, and semantic `journey-*` color utilities.
- Do not introduce a new font, color, gradient, or component radius without
  updating this document and reviewing contrast/responsive impact.
- Keep content records separate from presentation components.
