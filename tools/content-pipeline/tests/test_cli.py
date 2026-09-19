import json

from content_pipeline.cli import _media_manifest


def test_media_manifest_command_writes_only_the_manifest_output(tmp_path):
    source = tmp_path / 'input.json'
    output = tmp_path / 'nested' / 'manifest.json'
    source.write_text(json.dumps({'records': []}), encoding='utf-8')

    _media_manifest(type('Args', (), {'input': source, 'output': output})())

    assert json.loads(output.read_text(encoding='utf-8')) == {
        'manifestVersion': 1,
        'assets': [],
    }
