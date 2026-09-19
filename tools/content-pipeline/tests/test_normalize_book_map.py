import pytest

from content_pipeline.normalize_book_map import normalize_book_map, validate_book_map_coverage


def test_normalize_book_map_extracts_book_sections_and_page_references():
    pages = [
        {"sourceId": "book", "sourcePage": 6, "text": "Book map\nUnit 1 My friends\nUnit 2 Time and daily routines"},
        {"sourceId": "book", "sourcePage": 7, "text": "Unit 6 Our school facilities\nReview 2 & Extension activities"},
    ]

    result = normalize_book_map(pages)

    assert result["sourceId"] == "book"
    assert [(entry["id"], entry["sourcePage"]) for entry in result["entries"]] == [
        ("unit-01", 6),
        ("unit-02", 6),
        ("unit-06", 7),
        ("review-02", 7),
    ]


def test_normalize_book_map_keeps_unmatched_pages_out_of_book_map():
    result = normalize_book_map([
        {"sourceId": "book", "sourcePage": 1, "text": "Copyright page"},
    ])

    assert result["entries"] == []


def test_validate_book_map_coverage_reports_missing_sections():
    with pytest.raises(ValueError, match='missing book-map sections'):
        validate_book_map_coverage({'entries': [{'id': 'starter'}]})


def test_validate_book_map_coverage_accepts_volume_one_map():
    ids = ['starter', *(f'unit-{index:02d}' for index in range(1, 11)), 'review-01', 'review-02', 'wordlist']

    validate_book_map_coverage({'entries': [{'id': item} for item in ids]})
