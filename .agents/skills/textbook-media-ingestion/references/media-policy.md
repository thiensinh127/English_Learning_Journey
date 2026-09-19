# Media policy

`content/review-records/approved-media-input.json` is the only input accepted
for downloads. Each record must include:

```json
{
  "id": "unit-1-lesson-1-track-1",
  "mediaType": "audio",
  "sourceUrl": "https://example.test/track.mp3",
  "sourceTrack": "Track 1",
  "rightsStatus": "confirmed",
  "rightsEvidence": "permission-record-001"
}
```

The manifest records the final MIME type, SHA-256 checksum, and playback or
dimension metadata. A URL without permission evidence is retained only as a
review reference and is not downloaded or exposed to students.
