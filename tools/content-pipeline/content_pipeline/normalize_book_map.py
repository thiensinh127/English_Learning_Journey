from __future__ import annotations

import re
from typing import Any


SECTION_PATTERN = re.compile(
    r'(?im)^\s*(Starter|Unit\s+(\d{1,2})(?:\s+[^\n]*)?|Review\s+([12])(?:\s+[^\n]*)?|Wordlist)\s*$'
)
EXPECTED_SECTION_IDS = {'starter', *(f'unit-{index:02d}' for index in range(1, 11)), 'review-01', 'review-02', 'wordlist'}


def _section_id(label: str) -> str:
    normalized = label.lower().strip()
    if normalized == 'starter':
        return 'starter'
    if normalized == 'wordlist':
        return 'wordlist'
    unit = re.match(r'unit\s+(\d+)', normalized)
    if unit:
        return f'unit-{int(unit.group(1)):02d}'
    review = re.match(r'review\s+(\d+)', normalized)
    if review:
        return f'review-{int(review.group(1)):02d}'
    raise ValueError(f'Unsupported book-map section: {label}')


def normalize_book_map(page_records: list[dict[str, Any]]) -> dict[str, Any]:
    entries: list[dict[str, Any]] = []
    source_id = page_records[0]['sourceId'] if page_records else ''
    for page in page_records:
        for match in SECTION_PATTERN.finditer(page.get('text', '')):
            label = ' '.join(match.group(1).split())
            entries.append(
                {
                    'id': _section_id(label),
                    'title': label,
                    'sourcePage': page['sourcePage'],
                    'sourceId': page['sourceId'],
                }
            )
    return {'sourceId': source_id, 'entries': entries}


def validate_book_map_coverage(book_map: dict[str, Any]) -> None:
    found = {entry['id'] for entry in book_map.get('entries', [])}
    missing = sorted(EXPECTED_SECTION_IDS - found)
    if missing:
        raise ValueError(f'missing book-map sections: {", ".join(missing)}')
