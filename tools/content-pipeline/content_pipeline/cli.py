from __future__ import annotations

import argparse
import json
from pathlib import Path

from .normalize_book_map import normalize_book_map
from .pdf_extract import extract_pages


def _extract_pdf(args: argparse.Namespace) -> None:
    output = Path(args.output)
    output.mkdir(parents=True, exist_ok=True)
    pages = extract_pages(args.pdf, args.source_id)
    (output / 'raw-pages.json').write_text(
        json.dumps(pages, ensure_ascii=False, indent=2) + '\n', encoding='utf-8'
    )
    (output / 'book-map.json').write_text(
        json.dumps(normalize_book_map(pages), ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description='English Learning content pipeline')
    commands = parser.add_subparsers(dest='command', required=True)
    extract = commands.add_parser('extract-pdf', help='Extract PDF pages and book map')
    extract.add_argument('--pdf', required=True, type=Path)
    extract.add_argument('--output', required=True, type=Path)
    extract.add_argument('--source-id', required=True)
    extract.set_defaults(handler=_extract_pdf)
    return parser


def main() -> None:
    args = build_parser().parse_args()
    args.handler(args)


if __name__ == '__main__':
    main()
