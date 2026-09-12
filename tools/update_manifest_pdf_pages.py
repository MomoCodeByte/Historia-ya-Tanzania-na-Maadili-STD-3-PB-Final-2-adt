"""Ensure every PDF-faithful page image is included in the SCORM manifest."""

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "imsmanifest.xml"


def main() -> None:
    source = MANIFEST.read_text(encoding="utf-8")
    entries = [
        f'      <file href="images/pdf-pages/pg{number:03}.jpg"/>'
        for number in range(2, 154)
    ]
    source = "\n".join(
        line
        for line in source.splitlines()
        if "images/pdf-pages/pg" not in line
    )
    anchor = "    </resource>"
    source = source.replace(anchor, "\n".join(entries) + "\n" + anchor, 1)
    MANIFEST.write_text(source + "\n", encoding="utf-8")
    print(f"Manifest now includes {len(entries)} faithful page images.")


if __name__ == "__main__":
    main()
