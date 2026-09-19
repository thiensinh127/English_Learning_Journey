# Content authoring contract

This contract keeps approved Grade 4 textbook content separate from interface
code. It applies to every lesson submitted for review.

## Current source candidate

The product owner identified the target source as **Tiếng Anh 4 Global
Success**, Học liệu.VN e-book ID `3`:
<https://hoclieu.vn/e-book/3?pageNumber=1>

This source is currently a reference candidate only. Do not copy, ingest, or
publish textbook pages, audio, or images until the allowed-use scope and source
ownership are recorded in the review record below.

## Lesson data

Each lesson must pass `lessonSchema` in
`apps/web/src/features/content/schema.ts`.

- `id` and `unitId` use lowercase letters, numbers, and hyphens only.
- `title` is required.
- Every vocabulary item requires an `id`, English `word`, Vietnamese
  `meaning`, and child-friendly English `example`.
- Every sentence pattern requires an `id`, `pattern`, and Vietnamese
  `meaning`; an English `example` is recommended.
- `imageUrl` and `audioUrl` are optional valid URLs. A missing asset must not
  block a lesson from rendering.

## Source and review record

Each lesson submission must have a separate, non-student-facing review record
linked by `lessonId`. The record must include:

- textbook title, publisher, edition, and lesson/page reference;
- source URL or storage location for each copied or adapted text, image, and
  audio asset;
- copyright owner, allowed use, and permission or licence evidence;
- author/adaptor, submission date, and reviewer;
- review status: `draft`, `in_review`, `approved`, or `rejected`;
- reviewer decision date and notes, including required corrections.

Only records with status `approved` may be published to students. No
AI-generated or manually drafted student-facing text is published until a
qualified content reviewer confirms the source, rights, age appropriateness,
and Vietnamese meaning.

## Authoring checklist

1. Create structured lesson data; never place textbook text in a React
   component.
2. Validate the lesson with `lessonSchema.safeParse`.
3. Attach the source and review record with evidence for every media asset.
4. Resolve reviewer feedback and obtain `approved` status before release.
