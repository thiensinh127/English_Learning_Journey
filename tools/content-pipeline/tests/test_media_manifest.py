import pytest

from content_pipeline.media_manifest import build_media_manifest


def approved_audio():
    return {
        'id': 'unit-1-lesson-1-track-1',
        'mediaType': 'audio',
        'sourceUrl': 'https://example.test/track-1.mp3',
        'sourceTrack': 'Track 1',
        'rightsStatus': 'confirmed',
        'rightsEvidence': 'permission-record-001',
        'mimeType': 'audio/mpeg',
        'checksum': 'a' * 64,
    }


def test_build_media_manifest_accepts_approved_audio():
    result = build_media_manifest([approved_audio()])

    assert result['assets'][0]['id'] == 'unit-1-lesson-1-track-1'
    assert result['assets'][0]['checksum'] == 'a' * 64


def test_build_media_manifest_rejects_missing_rights_evidence():
    record = {**approved_audio(), 'rightsEvidence': ''}

    with pytest.raises(ValueError, match='rightsEvidence'):
        build_media_manifest([record])


def test_build_media_manifest_rejects_mismatched_mime_family():
    record = {**approved_audio(), 'mimeType': 'image/png'}

    with pytest.raises(ValueError, match='mimeType'):
        build_media_manifest([record])


def test_build_media_manifest_rejects_duplicate_ids_and_bad_checksum():
    with pytest.raises(ValueError, match='duplicate'):
        build_media_manifest([approved_audio(), approved_audio()])

    with pytest.raises(ValueError, match='checksum'):
        build_media_manifest([{**approved_audio(), 'checksum': 'bad'}])
