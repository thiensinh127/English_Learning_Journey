import pytest
from email.message import Message

from content_pipeline.media_manifest import build_media_manifest, download_approved_media


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


def test_build_media_manifest_requires_page_or_track_provenance():
    record = {**approved_audio(), 'sourcePage': None, 'sourceTrack': None}

    with pytest.raises(ValueError, match='sourcePage or sourceTrack'):
        build_media_manifest([record])


class FakeResponse:
    status = 200

    def __init__(self, body: bytes, content_type: str):
        self.body = body
        self.headers = Message()
        self.headers['Content-Type'] = content_type

    def __enter__(self):
        return self

    def __exit__(self, *args):
        return None

    def read(self, _size):
        value, self.body = self.body, b''
        return value


def test_downloader_rejects_response_mime_and_cleans_destination(tmp_path, monkeypatch):
    record = {**approved_audio(), 'checksum': 'b' * 64}
    monkeypatch.setattr(
        'content_pipeline.media_manifest.urlopen',
        lambda request, timeout: FakeResponse(b'<html>', 'text/html'),
    )

    with pytest.raises(ValueError, match='MIME'):
        download_approved_media(record, tmp_path)

    assert not (tmp_path / record['id']).exists()
