---
name: textbook-media-ingestion
description: Use when mapping or importing approved textbook audio and images with provenance, rights, checksums, and on-demand delivery metadata.
---

# Textbook media ingestion

Read `docs/content-authoring.md`, the active task in `docs/backlog.md`, and
`references/media-policy.md` before handling media.

Use an explicit reviewed input list; do not crawl the viewer broadly:

```bash
tools/content-pipeline/.venv/bin/python -m content_pipeline media-manifest \
  --input content/review-records/approved-media-input.json \
  --output content/media/media-manifest.json
```

Rules:

- Every asset needs a stable ID, source URL/page/track, rights evidence, MIME
  type, checksum, and optional duration/dimensions.
- Download only `rightsStatus=confirmed` assets from the allowlist.
- Keep media outside the initial lesson bundle and resolve it on demand.
- Never publish an asset just because it is reachable from a public viewer.
- Missing or invalid media must produce a review failure and an accessible app
  fallback, not a broken lesson.
