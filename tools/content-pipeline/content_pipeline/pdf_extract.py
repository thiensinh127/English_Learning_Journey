from __future__ import annotations

from pathlib import Path
from typing import Any


def extract_page_records(pages: list[Any], source_id: str) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for page_number, page in enumerate(pages, start=1):
        text = (page.extract_text() or '').strip()
        records.append(
            {
                'sourceId': source_id,
                'sourcePage': page_number,
                'text': text,
                'extractionMethod': 'pdf-text' if text else 'pdf-image',
                'needsReview': not bool(text),
            }
        )
    return records


def extract_pages(pdf_path: str | Path, source_id: str) -> list[dict[str, Any]]:
    from pypdf import PdfReader

    reader = PdfReader(str(pdf_path))
    return extract_page_records(reader.pages, source_id)
