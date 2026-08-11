"""Map ADT text tokens to their printed word boxes in the source PDF."""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path

import pymupdf


ROOT = Path(__file__).resolve().parents[1]


def normalized(value: str) -> str:
    return "".join(char.lower() for char in value if char.isalnum())


def spans(path: Path) -> list[tuple[str, str]]:
    source = path.read_text(encoding="utf-8")
    found = re.findall(r'<span\b[^>]*\bdata-id="([^"]+)"[^>]*>(.*?)</span>', source, re.DOTALL)
    return [(text_id, html.unescape(re.sub(r"<[^>]+>", "", value)).strip()) for text_id, value in found]


def find_sequence(haystack: list[str], needle: list[str], cursor: int) -> int | None:
    if not needle:
        return None
    starts = list(range(cursor, len(haystack) - len(needle) + 1))
    starts.extend(range(0, min(cursor, len(haystack) - len(needle) + 1)))
    for start in starts:
        if haystack[start:start + len(needle)] == needle:
            return start
    return None


def build(pdf_path: Path) -> None:
    document = pymupdf.open(pdf_path)
    output: dict[str, dict[str, list[dict | None]]] = {}
    matched = total = 0

    for page_number, page in enumerate(document, start=1):
        html_path = ROOT / ("index.html" if page_number == 1 else f"pg{page_number:03}_sec001.html")
        page_id = f"pg{page_number:03}_sec001"
        raw_words = [
            item for item in page.get_text("words", sort=True)
            if normalized(item[4]) not in {"for", "online", "reading", "only"}
        ]
        pdf_words = [normalized(item[4]) for item in raw_words]
        width, height = page.rect.width, page.rect.height
        cursor = 0
        page_map: dict[str, list[dict | None]] = {}

        for text_id, text in spans(html_path):
            display_tokens = re.findall(r"\S+", text)
            token_norms = [normalized(token) for token in display_tokens]
            searchable = [token for token in token_norms if token]
            total += len(searchable)
            start = find_sequence(pdf_words, searchable, cursor)
            boxes: list[dict | None] = [None] * len(display_tokens)
            if start is not None:
                pdf_index = start
                for display_index, token in enumerate(token_norms):
                    if not token:
                        continue
                    while pdf_index < len(pdf_words) and not pdf_words[pdf_index]:
                        pdf_index += 1
                    if pdf_index >= len(pdf_words) or pdf_words[pdf_index] != token:
                        break
                    x0, y0, x1, y1 = raw_words[pdf_index][:4]
                    boxes[display_index] = {
                        "x": round(100 * x0 / width, 4),
                        "y": round(100 * y0 / height, 4),
                        "w": round(100 * (x1 - x0) / width, 4),
                        "h": round(100 * (y1 - y0) / height, 4),
                    }
                    matched += 1
                    pdf_index += 1
                cursor = max(cursor, start + len(searchable))
            if any(boxes):
                page_map[text_id] = boxes
        output[page_id] = page_map

    destination = ROOT / "content" / "readalong-positions.json"
    destination.write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Mapped {matched}/{total} semantic tokens ({100 * matched / max(total, 1):.1f}%) across {len(output)} pages.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    args = parser.parse_args()
    build(args.pdf)


if __name__ == "__main__":
    main()
