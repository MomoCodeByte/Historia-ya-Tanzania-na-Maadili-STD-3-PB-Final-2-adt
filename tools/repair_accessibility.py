#!/usr/bin/env python3
"""Repair the known missing text, audio, and image-description contracts."""

from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path


TEXTS = {
    "pg003_n0002": "Yaliyomo",
    "pg005_n0002": "Utangulizi",
    "pg114_n0002": "Sura ya Saba.",
    "activity_gen_haki": "Haki",
    "activity_gen_wajibu": "Wajibu",
    "pg020_im001": "Mchoro wa mwanafunzi akiandika.",
    "pg089_im001": "Mchoro wa mwanafunzi akiandika.",
    "pg104_im001": "Mchoro wa mwanafunzi akiandika.",
    "pg110_im001": "Mchoro wa mwanafunzi akiandika.",
}

AUDIO_REUSE = {
    "pg003_n0002": "pg003_im001.mp3",
    "pg005_n0002": "pg003_n0008.mp3",
    "pg114_n0002": "pg003_n0047.mp3",
    "activity_gen_haki": "pg063_n0026.mp3",
    "activity_gen_wajibu": "pg063_n0028.mp3",
    "pg063_n0036": "pg063_n0028.mp3",
    "pg063_n0043": "pg063_n0026.mp3",
}

IMAGE_IDS = ("pg020_im001", "pg089_im001", "pg104_im001", "pg110_im001")


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def save(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", nargs="?", default=".")
    parser.add_argument("--template", required=True)
    args = parser.parse_args()
    root = Path(args.root).resolve()
    template = Path(args.template).resolve()
    language = load(root / "assets/config.json")["languages"]["default"]
    language_root = root / "content/i18n" / language
    texts_path = language_root / "texts.json"
    audios_path = language_root / "audios.json"
    texts = load(texts_path)
    audios = load(audios_path)
    texts.update(TEXTS)
    audios.update(AUDIO_REUSE)

    source_audio = template / "content/i18n/sw-TZ/audio/pg045_im001.mp3"
    for image_id in IMAGE_IDS:
        filename = f"{image_id}.mp3"
        shutil.copyfile(source_audio, language_root / "audio" / filename)
        audios[image_id] = filename

    save(texts_path, texts)
    save(audios_path, audios)

    description = TEXTS["pg020_im001"]
    for path in root.glob("pg*.html"):
        source = path.read_text(encoding="utf-8")
        updated = source
        for image_id in IMAGE_IDS:
            if f'data-id="{image_id}"' not in updated:
                continue
            pattern = re.compile(
                rf'(<img\b(?=[^>]*data-id="{image_id}")[^>]*\balt=")[^"]*(")', re.I
            )
            updated = pattern.sub(lambda match: match.group(1) + description + match.group(2), updated)
            updated = re.sub(
                rf'(<img\b(?=[^>]*data-id="{image_id}")[^>]*?)\s+role="presentation"',
                r"\1",
                updated,
                flags=re.I,
            )
            updated = re.sub(
                rf'(<img\b(?=[^>]*data-id="{image_id}")[^>]*?)\s+aria-hidden="true"',
                r"\1",
                updated,
                flags=re.I,
            )
        if updated != source:
            path.write_text(updated, encoding="utf-8")

    print("Repaired 9 text entries, 11 audio mappings, and 4 image descriptions.")


if __name__ == "__main__":
    main()
