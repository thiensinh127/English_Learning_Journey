from __future__ import annotations

import re
import hashlib
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlparse
from typing import Any


CHECKSUM_PATTERN = re.compile(r'^[0-9a-fA-F]{64}$')


def _require_text(record: dict[str, Any], field: str) -> str:
    value = record.get(field)
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f'{field} must be non-empty')
    return value.strip()


def build_media_manifest(records: list[dict[str, Any]]) -> dict[str, Any]:
    assets: list[dict[str, Any]] = []
    seen_ids: set[str] = set()
    for record in records:
        asset_id = _require_text(record, 'id')
        if asset_id in seen_ids:
            raise ValueError(f'duplicate media id: {asset_id}')
        seen_ids.add(asset_id)

        media_type = _require_text(record, 'mediaType')
        if media_type not in {'audio', 'image'}:
            raise ValueError('mediaType must be audio or image')
        source_url = _require_text(record, 'sourceUrl')
        if urlparse(source_url).scheme not in {'http', 'https'}:
            raise ValueError('sourceUrl must use http or https')
        rights_status = _require_text(record, 'rightsStatus')
        if rights_status != 'confirmed':
            raise ValueError('rightsStatus must be confirmed before download')
        _require_text(record, 'rightsEvidence')
        if not record.get('sourcePage') and not record.get('sourceTrack'):
            raise ValueError('sourcePage or sourceTrack is required')
        mime_type = _require_text(record, 'mimeType')
        if not mime_type.startswith(f'{media_type}/'):
            raise ValueError(f'mimeType must match mediaType: {media_type}')
        checksum = _require_text(record, 'checksum')
        if not CHECKSUM_PATTERN.fullmatch(checksum):
            raise ValueError('checksum must be a SHA-256 hex digest')

        asset = {
            'id': asset_id,
            'mediaType': media_type,
            'sourceUrl': source_url,
            'rightsStatus': rights_status,
            'rightsEvidence': record['rightsEvidence'].strip(),
            'mimeType': mime_type,
            'checksum': checksum.lower(),
        }
        for optional_field in ('sourcePage', 'sourceTrack', 'durationSeconds', 'width', 'height'):
            if optional_field in record:
                asset[optional_field] = record[optional_field]
        assets.append(asset)
    return {'manifestVersion': 1, 'assets': assets}


def download_approved_media(
    record: dict[str, Any], output_dir: str | Path, *, max_bytes: int = 25_000_000
) -> Path:
    """Download one already validated asset and verify its declared checksum."""
    build_media_manifest([record])
    output = Path(output_dir)
    output.mkdir(parents=True, exist_ok=True)
    request = Request(record['sourceUrl'], headers={'User-Agent': 'EnglishLearningJourney/1.0'})
    digest = hashlib.sha256()
    destination = output / record['id']
    total = 0
    try:
        response = urlopen(request, timeout=20)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    try:
        with response:
            if getattr(response, 'status', 200) != 200:
                raise ValueError('media response was not successful')
            response_type = response.headers.get_content_type()
            if not response_type.startswith(f"{record['mediaType']}/"):
                raise ValueError('media response MIME type mismatch')
            with destination.open('wb') as handle:
                while chunk := response.read(1024 * 64):
                    total += len(chunk)
                    if total > max_bytes:
                        raise ValueError('media exceeds max_bytes')
                    digest.update(chunk)
                    handle.write(chunk)
    except Exception:
        destination.unlink(missing_ok=True)
        raise
    if digest.hexdigest() != record['checksum'].lower():
        destination.unlink(missing_ok=True)
        raise ValueError('downloaded media checksum mismatch')
    return destination
