"""Install the visible word-synchronized read-along helper throughout the ADT."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPT_TAG = '  <script src="./assets/readalong-sw.js?v=3"></script>'


def update_html() -> int:
    changed = 0
    for path in [ROOT / "index.html", *ROOT.glob("pg*.html"), *ROOT.glob("qz*.html")]:
        source = path.read_text(encoding="utf-8")
        if "assets/readalong-sw.js" in source:
            source = re.sub(r'<script src="\./assets/readalong-sw\.js\?v=\d+"></script>', SCRIPT_TAG.strip(), source)
        else:
            source = source.replace("</body>", SCRIPT_TAG + "\n</body>")
        path.write_text(source, encoding="utf-8")
        changed += 1
    return changed


def update_preloader() -> None:
    path = ROOT / "assets" / "offline-preloader.js"
    source = path.read_text(encoding="utf-8")
    marker = "var INLINE = "
    start = source.index(marker) + len(marker)
    end = source.index(";\n", start)
    inline = json.loads(source[start:end])

    for key in list(inline):
        candidate = ROOT / key.removeprefix("./")
        if candidate.is_file() and candidate.suffix.lower() in {".html", ".json", ".js"}:
            if candidate.suffix.lower() == ".json":
                inline[key] = json.loads(candidate.read_text(encoding="utf-8"))
            else:
                inline[key] = candidate.read_text(encoding="utf-8")
    inline["./assets/readalong-sw.js"] = (ROOT / "assets" / "readalong-sw.js").read_text(encoding="utf-8")
    inline["./content/readalong-positions.json"] = json.loads(
        (ROOT / "content" / "readalong-positions.json").read_text(encoding="utf-8")
    )

    compact = json.dumps(inline, ensure_ascii=False, separators=(",", ":"))
    path.write_text(source[:start] + compact + source[end:], encoding="utf-8")


def update_manifest() -> None:
    path = ROOT / "imsmanifest.xml"
    source = path.read_text(encoding="utf-8")
    entries = [
        '      <file href="assets/readalong-sw.js"/>',
        '      <file href="content/readalong-positions.json"/>',
    ]
    for entry in entries:
        if entry not in source:
            source = source.replace("    </resource>", entry + "\n    </resource>", 1)
        path.write_text(source, encoding="utf-8")


def main() -> None:
    changed = update_html()
    update_preloader()
    update_manifest()
    print(f"Installed Swahili read-along on {changed} HTML files.")


if __name__ == "__main__":
    main()
