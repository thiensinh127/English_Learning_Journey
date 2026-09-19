# Extraction output contract

Every extracted page record contains:

```json
{
  "sourceId": "global-success-4-tap-1",
  "sourcePage": 12,
  "text": "...",
  "extractionMethod": "pdf-text",
  "needsReview": false
}
```

The normalized book map must cover Starter, Units 1–10, Review 1, Review 2,
and Wordlist, with page references and the book-map fields: competencies,
structures, vocabulary, and phonics. Text that cannot be reliably extracted is
marked for manual review rather than guessed or silently discarded.
