import json

import pytest

from content_pipeline.cli import _extract_pdf, _media_manifest


def test_media_manifest_command_writes_only_the_manifest_output(tmp_path):
    source = tmp_path / 'input.json'
    output = tmp_path / 'nested' / 'manifest.json'
    source.write_text(json.dumps({'records': []}), encoding='utf-8')

    _media_manifest(type('Args', (), {'input': source, 'output': output})())

    assert json.loads(output.read_text(encoding='utf-8')) == {
        'manifestVersion': 1,
        'assets': [],
    }


def test_extract_pdf_fails_closed_when_book_map_is_incomplete(tmp_path, monkeypatch):
    monkeypatch.setattr(
        'content_pipeline.cli.extract_pages',
        lambda pdf, source_id: [{'page': 1, 'sourcePage': 1, 'sourceId': source_id, 'text': 'Starter'}],
    )
    with pytest.raises(ValueError, match='missing book-map sections'):
        _extract_pdf(type('Args', (), {'pdf': tmp_path / 'input.pdf', 'output': tmp_path / 'out', 'source_id': 'book'})())
