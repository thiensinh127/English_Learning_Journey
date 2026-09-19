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
    records = extract_page_records(reader.pages, source_id)
    if not any(record['needsReview'] for record in records):
        return records

    try:
        import pdfplumber

        with pdfplumber.open(str(pdf_path)) as document:
            fallback_texts = [page.extract_text() or '' for page in document.pages]
        for record, fallback_text in zip(records, fallback_texts):
            if record['needsReview'] and fallback_text.strip():
                record['text'] = fallback_text.strip()
                record['extractionMethod'] = 'pdf-text'
                record['needsReview'] = False
    except (ImportError, OSError, ValueError):
        pass
    return records
