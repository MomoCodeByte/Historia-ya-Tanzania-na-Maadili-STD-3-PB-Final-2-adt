#!/usr/bin/env python3
"""Refresh embedded ADT resources inside the generated offline preloader."""

from __future__ import annotations

import json
import re
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    data_bundle = root / "assets/offline-preloader-data.js"
    destination = data_bundle if data_bundle.exists() else root / "assets/offline-preloader.js"
    source = destination.read_text(encoding="utf-8")
    match = re.search(r"var INLINE = (\{.*?\});\r?\n  var BASE_DIR", source, re.S)
    if not match:
        raise RuntimeError("Could not locate INLINE resources in offline-preloader.js")
    inline = json.loads(match.group(1))
    for required in (
        "./assets/book-interactions.css",
        "./assets/book-interactions.js",
        "./assets/mobile-sheet-drag.css",
        "./assets/mobile-sheet-drag.js",
        "./assets/reader-toolbar.css",
        "./assets/reader-toolbar-overrides.css",
        "./assets/sign-language-video.css",
        "./assets/sign-language-video.js",
        "./assets/viewer-responsive.css",
    ):
        inline.setdefault(required, "")
    refreshed = {}
    for key in inline:
        path = root / key.removeprefix("./")
        if not path.exists():
            raise FileNotFoundError(f"Offline resource is missing: {key}")
        if path.suffix == ".json":
            refreshed[key] = json.loads(path.read_text(encoding="utf-8"))
        else:
            refreshed[key] = path.read_text(encoding="utf-8")
    payload = json.dumps(refreshed, ensure_ascii=False, separators=(",", ":"))
    updated = source[: match.start(1)] + payload + source[match.end(1) :]
    destination.write_text(updated, encoding="utf-8")
    print(f"Refreshed {len(refreshed)} offline resources")


if __name__ == "__main__":
    main()
