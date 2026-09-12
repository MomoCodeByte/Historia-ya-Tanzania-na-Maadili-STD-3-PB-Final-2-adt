#!/usr/bin/env python3
"""Remove content that is unreachable from the ADT reading spine."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LANGUAGE_ROOT = ROOT / "content" / "i18n" / "sw"


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--apply", action="store_true", help="Delete files and rewrite resource maps"
    )
    args = parser.parse_args()

    pages = load_json(ROOT / "content" / "pages.json")
    linked_html = {entry["href"] for entry in pages}
    page_sources = [(ROOT / href).read_text(encoding="utf-8") for href in linked_html]

    unlinked_html = sorted(
        path
        for path in ROOT.glob("*.html")
        if re.fullmatch(r"(?:pg\d{3}_sec\d{3}|qz\d{3})\.html", path.name)
        and path.name not in linked_html
    )

    texts_path = LANGUAGE_ROOT / "texts.json"
    audios_path = LANGUAGE_ROOT / "audios.json"
    timecodes_path = LANGUAGE_ROOT / "timecode" / "timecode_output.json"
    texts = load_json(texts_path)
    audios = load_json(audios_path)
    timecodes = load_json(timecodes_path)
    toc = load_json(ROOT / "content" / "toc.json")

    used_ids = {
        match.group(1)
        for source in page_sources
        for match in re.finditer(r'data-id="([^"]+)"', source)
    }
    keep_ids = set(used_ids)
    keep_ids.update(
        key for key in texts if re.fullmatch(r"gl\d+(?:_def)?(?:_easy_read)?", key)
    )
    keep_ids.update(
        entry["chapter_id"] for entry in toc if entry["chapter_id"] in texts
    )
    for text_id in tuple(keep_ids):
        easy_read_id = f"{text_id}_easy_read"
        if easy_read_id in texts:
            keep_ids.add(easy_read_id)

    kept_texts = {key: value for key, value in texts.items() if key in keep_ids}
    kept_audios = {key: value for key, value in audios.items() if key in keep_ids}
    kept_timecodes = {
        key: value for key, value in timecodes.items() if key in kept_audios
    }
    referenced_audio = {
        str(value).split("?", 1)[0].split("#", 1)[0]
        for value in kept_audios.values()
    }
    audio_dir = LANGUAGE_ROOT / "audio"
    unlinked_audio = sorted(
        path for path in audio_dir.glob("*.mp3") if path.name not in referenced_audio
    )

    referenced_images: set[str] = set()
    for source in page_sources:
        referenced_images.update(
            match.group(1)
            for match in re.finditer(
                r'(?:src|href)="(?:\./)?(images/[^"?#]+)', source, re.I
            )
        )
    semantic_flow = (ROOT / "content" / "semantic-flow-pages.js").read_text(
        encoding="utf-8"
    )
    referenced_images.update(
        match.group(1)
        for match in re.finditer(r'["\'](images/[^"\']+)["\']', semantic_flow, re.I)
    )
    images_dir = ROOT / "images"
    unlinked_images = sorted(
        path
        for path in images_dir.rglob("*")
        if path.is_file()
        and path.relative_to(ROOT).as_posix() not in referenced_images
    )

    print(f"Unlinked HTML files: {len(unlinked_html)}")
    print(f"Translation entries to remove: {len(texts) - len(kept_texts)}")
    print(f"Audio mappings to remove: {len(audios) - len(kept_audios)}")
    print(f"Timecode entries to remove: {len(timecodes) - len(kept_timecodes)}")
    print(f"Unlinked MP3 files: {len(unlinked_audio)}")
    print(f"Unlinked image files: {len(unlinked_images)}")

    if not args.apply:
        print("Dry run only; use --apply to perform the cleanup.")
        return

    for path in [*unlinked_html, *unlinked_audio, *unlinked_images]:
        path.unlink()
    for directory in sorted(
        (path for path in images_dir.rglob("*") if path.is_dir()),
        key=lambda path: len(path.parts),
        reverse=True,
    ):
        try:
            directory.rmdir()
        except OSError:
            pass

    write_json(texts_path, kept_texts)
    write_json(audios_path, kept_audios)
    write_json(timecodes_path, kept_timecodes)
    print("Cleanup applied.")


if __name__ == "__main__":
    main()
