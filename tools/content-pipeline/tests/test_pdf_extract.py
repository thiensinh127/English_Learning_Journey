from types import SimpleNamespace

from content_pipeline.pdf_extract import extract_page_records


def test_extract_page_records_preserves_source_id_and_one_based_page_numbers():
    pages = [SimpleNamespace(extract_text=lambda: "Starter"), SimpleNamespace(extract_text=lambda: "Unit 1")]

    result = extract_page_records(pages, "global-success-4-tap-1")

    assert result == [
        {
            "sourceId": "global-success-4-tap-1",
            "sourcePage": 1,
            "text": "Starter",
            "extractionMethod": "pdf-text",
            "needsReview": False,
        },
        {
            "sourceId": "global-success-4-tap-1",
            "sourcePage": 2,
            "text": "Unit 1",
            "extractionMethod": "pdf-text",
            "needsReview": False,
        },
    ]


def test_extract_page_records_marks_image_only_pages_for_manual_review():
    pages = [SimpleNamespace(extract_text=lambda: "")]

    result = extract_page_records(pages, "global-success-4-tap-1")

    assert result[0]["extractionMethod"] == "pdf-image"
    assert result[0]["needsReview"] is True
