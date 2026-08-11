"""Remove the source-PDF reading watermark from ADT semantic and audio metadata."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PHRASE = "FOR ONLINE READING ONLY"


def dump_json(path: Path, value: object) -> None:
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def clean_html_source(source: str, unwanted: set[str]) -> str:
    id_pattern = "|".join(re.escape(item) for item in sorted(unwanted))
    element = re.compile(
        rf"\s*<(?P<tag>[a-zA-Z0-9]+)\b[^>]*\bdata-id=[\"'](?:{id_pattern})[\"'][^>]*>"
        rf".*?</(?P=tag)>",
        flags=re.IGNORECASE | re.DOTALL,
    )
    exact_text = re.compile(
        rf"\s*<(?P<tag>[a-zA-Z0-9]+)\b[^>]*>\s*{re.escape(PHRASE)}\s*</(?P=tag)>",
        flags=re.IGNORECASE,
    )
    return exact_text.sub("", element.sub("", source))


def purge_keys(value: object, unwanted: set[str]) -> object:
    if isinstance(value, dict):
        return {
            key: purge_keys(item, unwanted)
            for key, item in value.items()
            if key not in unwanted and item != PHRASE
        }
    if isinstance(value, list):
        return [purge_keys(item, unwanted) for item in value]
    if isinstance(value, str) and PHRASE in value.upper():
        return clean_html_source(value, unwanted).replace(PHRASE, "")
    return value


def clean_html(unwanted: set[str]) -> int:
    removed = 0
    for path in ROOT.glob("*.html"):
        source = path.read_text(encoding="utf-8")
        updated = clean_html_source(source, unwanted)
        if updated != source:
            path.write_text(updated, encoding="utf-8")
            removed += 1
    return removed


def clean_offline_preloader(unwanted: set[str]) -> None:
    path = ROOT / "assets" / "offline-preloader.js"
    source = path.read_text(encoding="utf-8")
    marker = "var INLINE = "
    start = source.index(marker) + len(marker)
    end = source.index(";\n", start)
    inline = json.loads(source[start:end])
    inline = purge_keys(inline, unwanted)
    compact = json.dumps(inline, ensure_ascii=False, separators=(",", ":"))
    path.write_text(source[:start] + compact + source[end:], encoding="utf-8")


def main() -> None:
    texts_path = ROOT / "content" / "i18n" / "sw" / "texts.json"
    texts = json.loads(texts_path.read_text(encoding="utf-8"))
    unwanted = {key for key, value in texts.items() if value.strip().upper() == PHRASE}
    preloader_source = (ROOT / "assets" / "offline-preloader.js").read_text(encoding="utf-8")
    unwanted.update(
        re.findall(
            rf'data-id=\\?["\']([^"\']+)\\?["\'][^>]*>\s*{re.escape(PHRASE)}',
            preloader_source,
            flags=re.IGNORECASE,
        )
    )

    dump_json(texts_path, purge_keys(texts, unwanted))
    for relative in (
        Path("content/i18n/sw/audios.json"),
        Path("content/i18n/sw/timecode/timecode_output.json"),
    ):
        path = ROOT / relative
        data = json.loads(path.read_text(encoding="utf-8"))
        dump_json(path, purge_keys(data, unwanted))

    removed_elements = clean_html(unwanted)
    clean_offline_preloader(unwanted)
    print(f"Removed {len(unwanted)} watermark IDs and {removed_elements} HTML elements.")


if __name__ == "__main__":
    main()
