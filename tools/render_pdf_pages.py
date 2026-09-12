"""Render the source PDF as faithful ADT page images without its reading watermark."""

from __future__ import annotations

import argparse
from pathlib import Path

import pymupdf
from PIL import Image


WATERMARK = b"FOR ONLINE"


def remove_watermark_forms(document: pymupdf.Document) -> int:
    """Blank only Form XObjects that contain the known watermark text."""
    removed = 0
    seen: set[int] = set()
    for page in document:
        for xref, *_ in page.get_xobjects():
            if xref in seen:
                continue
            seen.add(xref)
            try:
                stream = document.xref_stream(xref)
            except Exception:
                continue
            if WATERMARK in stream.upper():
                document.update_stream(xref, b"q Q\n")
                removed += 1
    return removed


def render(pdf_path: Path, output_dir: Path, scale: float, quality: int) -> None:
    document = pymupdf.open(pdf_path)
    removed = remove_watermark_forms(document)
    output_dir.mkdir(parents=True, exist_ok=True)

    for page_number, page in enumerate(document, start=2):
        pixmap = page.get_pixmap(
            matrix=pymupdf.Matrix(scale, scale),
            colorspace=pymupdf.csRGB,
            alpha=False,
        )
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        image.save(
            output_dir / f"pg{page_number:03}.jpg",
            format="JPEG",
            quality=quality,
            subsampling=0,
            optimize=True,
        )

    print(f"Rendered {len(document)} pages; removed {removed} watermark forms.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--scale", type=float, default=2.0)
    parser.add_argument("--quality", type=int, default=92)
    args = parser.parse_args()
    render(args.pdf, args.output, args.scale, args.quality)


if __name__ == "__main__":
    main()
