#!/usr/bin/env python3
"""Rebuild the SCORM resource list from the deployable ADT files."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "imsmanifest.xml"


def main() -> None:
    pages = json.loads((ROOT / "content" / "pages.json").read_text(encoding="utf-8"))
    paths = {ROOT / entry["href"] for entry in pages}
    paths.add(ROOT / "cover.png")
    for directory_name in ("assets", "content", "images"):
        paths.update(
            path for path in (ROOT / directory_name).rglob("*") if path.is_file()
        )

    missing = sorted(path for path in paths if not path.exists())
    if missing:
        raise FileNotFoundError(f"Deployable files are missing: {missing}")

    hrefs = sorted(path.relative_to(ROOT).as_posix() for path in paths)
    source = MANIFEST.read_text(encoding="utf-8")
    resource_start = source.index("<resource ")
    body_start = source.index(">", resource_start) + 1
    body_end = source.index("</resource>", body_start)
    entries = "\n".join(f'      <file href="{href}"/>' for href in hrefs)
    updated = source[:body_start] + "\n" + entries + "\n    " + source[body_end:]
    MANIFEST.write_text(updated, encoding="utf-8")
    print(f"Manifest rebuilt with {len(hrefs)} deployable files.")


if __name__ == "__main__":
    main()
