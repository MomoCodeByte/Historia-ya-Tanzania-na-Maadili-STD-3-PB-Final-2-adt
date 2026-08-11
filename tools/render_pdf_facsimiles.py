"""Render the publisher PDF as lossless web facsimile pages."""

from pathlib import Path
import sys

import fitz
from PIL import Image


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: render_pdf_facsimiles.py SOURCE.pdf")

    source = Path(sys.argv[1]).resolve()
    output = Path(__file__).resolve().parents[1] / "images" / "pdf-pages"
    output.mkdir(parents=True, exist_ok=True)

    document = fitz.open(source)
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
        image = Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples)
        image.save(
            output / f"pdf-page-{index + 1:03d}.webp",
            "WEBP",
            lossless=True,
            method=6,
        )
        if (index + 1) % 20 == 0:
            print(f"Rendered {index + 1}/{len(document)}")

    print(f"Rendered {len(document)} PDF pages to {output}")


if __name__ == "__main__":
    main()
