#!/usr/bin/env python3
"""Validate the deployable ADT spine, resources, and reverse references."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter
from pathlib import Path


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def clean_url(value: str) -> str:
    return value.split("?", 1)[0].split("#", 1)[0]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", nargs="?", default=".")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    pages = load_json(root / "content/pages.json")
    config = load_json(root / "assets/config.json")
    language = config["languages"]["default"]
    language_root = root / "content/i18n" / language
    texts = load_json(language_root / "texts.json")
    audios = load_json(language_root / "audios.json")
    timecodes = load_json(language_root / "timecode/timecode_output.json")
    videos = load_json(language_root / "videos.json")
    toc = load_json(root / "content/toc.json")
    issues: list[str] = []
    section_ids: set[str] = set()
    section_types: Counter[str] = Counter()
    page_sources: dict[str, str] = {}
    used_ids: set[str] = set()
    direct_image_refs: set[str] = set()

    required_page_resources = (
        "./content/tailwind_output.css",
        "./assets/fonts.css",
        "./assets/reader-toolbar.css",
        "./assets/mobile-sheet-drag.css",
        "./assets/reader-toolbar-overrides.css",
        "./assets/sign-language-video.css",
        "./assets/viewer-responsive.css",
        "./assets/offline-preloader.js",
        "./assets/scorm.js",
        "./assets/sign-language-tts-compat.js",
        "./assets/media-playback-independence.js",
        "./assets/sign-language-video.js",
        "./assets/mobile-sheet-drag.js",
        "./assets/readalong-sw.js",
    )

    for position, entry in enumerate(pages, 1):
        href = entry["href"]
        path = root / href
        if not path.exists():
            issues.append(f"missing page file: {href}")
            continue
        source = path.read_text(encoding="utf-8")
        page_sources[href] = source
        title = re.search(r'<meta name="title-id" content="([^"]+)"', source)
        index = re.search(r'<meta name="page-section-id" content="(\d+)"', source)
        if not title or title.group(1) != entry["section_id"]:
            issues.append(f"title-id mismatch: {href}")
        if not index or int(index.group(1)) != position:
            issues.append(f"page-section-id mismatch: {href} expected {position}")
        if entry.get("page_number") != position:
            issues.append(f"page_number mismatch: {href} expected {position}")
        if entry["section_id"] in section_ids:
            issues.append(f"duplicate section_id: {entry['section_id']}")
        section_ids.add(entry["section_id"])

        section_type = re.search(r'data-section-type="([^"]+)"', source)
        if section_type:
            section_types[section_type.group(1)] += 1

        for data_id in dict.fromkeys(re.findall(r'data-id="([^"]+)"', source)):
            if re.fullmatch(r"qz\d+", data_id):
                continue
            used_ids.add(data_id)
            if data_id not in texts:
                issues.append(f"missing text id: {href} -> {data_id}")
            if data_id not in audios:
                issues.append(f"missing audio mapping: {href} -> {data_id}")
            else:
                audio_name = clean_url(str(audios[data_id]))
                if not (language_root / "audio" / audio_name).exists():
                    issues.append(f"missing audio file: {href} -> {audio_name}")

        for ref in re.findall(r'(?:src|href)="([^"]+)"', source, re.I):
            local_ref = clean_url(ref)
            if local_ref.startswith(("./", "assets/", "content/", "images/")):
                local_ref = local_ref.removeprefix("./")
                if not (root / local_ref).exists():
                    issues.append(f"missing local resource: {href} -> {local_ref}")
                if local_ref.startswith("images/"):
                    direct_image_refs.add(local_ref)

        for required in required_page_resources:
            if required not in source:
                issues.append(f"missing shared resource: {href} -> {required}")
        if not any(
            runtime in source
            for runtime in (
                "./assets/base.bundle.local.js",
                "./assets/base.bundle.min.js",
            )
        ):
            issues.append(f"missing shared reader runtime: {href}")
        if "https://fonts.googleapis.com" in source or "https://fonts.gstatic.com" in source:
            issues.append(f"external font dependency: {href}")

        if 'id="book-interactive-shell"' in source:
            issues.append(f"prohibited alternate exercise page: {href}")
        if "book-page-mode-toggle" in source:
            issues.append(f"prohibited floating exercise button: {href}")
        if 'id="book-inline-activities-source"' in source:
            if "./assets/book-interactions.css" not in source:
                issues.append(f"missing inline exercise styles: {href}")
            if "./assets/book-interactions.js" not in source:
                issues.append(f"missing inline exercise placement: {href}")

        if href.startswith("qz"):
            answer_block = re.search(
                r'<script type="application/json" id="quiz-correct-answers">\s*(\{.*?\})\s*</script>',
                source,
                re.S,
            )
            explanation_block = re.search(
                r'<script type="application/json" id="quiz-explanations">\s*(\{.*?\})\s*</script>',
                source,
                re.S,
            )
            section_answers = re.search(r"data-correct-answers='([^']+)'", source)
            window_answers = re.search(
                r"window\.correctAnswers\s*=\s*JSON\.parse\('(.*?)'\)", source
            )
            try:
                copies = [
                    json.loads(answer_block.group(1)),
                    json.loads(html.unescape(section_answers.group(1))),
                    json.loads(window_answers.group(1)),
                ]
                if not copies[0] == copies[1] == copies[2]:
                    raise ValueError("answer copies differ")
                explanations = json.loads(explanation_block.group(1))
                if set(explanations) != set(copies[0]):
                    raise ValueError("explanation keys differ")
            except Exception as error:  # noqa: BLE001
                issues.append(f"quiz contract error: {href} -> {error}")

    if len(pages) != 154:
        issues.append(f"unexpected page count: {len(pages)}")
    if pages and pages[0].get("section_id") != "front_cover":
        issues.append("front cover is not first in the spine")
    if pages and pages[-1].get("section_id") != "back_cover":
        issues.append("back cover is not last in the spine")
    for cover_href in ("index.html", "back-cover.html"):
        cover = page_sources.get(cover_href, "")
        figure = re.search(r'<figure[^>]+class="([^"]+)"', cover)
        classes = set(figure.group(1).split()) if figure else set()
        if not {"mx-auto", "max-w-6xl"}.issubset(classes):
            issues.append(f"cover width classes missing: {cover_href}")

    linked_html = {entry["href"] for entry in pages}
    for path in root.glob("*.html"):
        if (
            re.fullmatch(r"(?:pg\d{3}_sec\d{3}|qz\d{3})\.html", path.name)
            and path.name not in linked_html
        ):
            issues.append(f"unlinked HTML file: {path.name}")

    manifest_by_href = {entry["href"]: entry for entry in pages}
    for entry in toc:
        href = entry["href"]
        page_entry = manifest_by_href.get(href)
        if not page_entry:
            issues.append(f"TOC points outside spine: {href}")
            continue
        if page_entry["section_id"] != entry["section_id"]:
            issues.append(f"TOC section mismatch: {href}")
        target = page_sources[href]
        if f'data-id="{entry["chapter_id"]}"' not in target:
            issues.append(f"TOC anchor missing: {href} -> {entry['chapter_id']}")

    keep_ids = set(used_ids)
    keep_ids.update(
        key for key in texts if re.fullmatch(r"gl\d+(?:_def)?(?:_easy_read)?", key)
    )
    keep_ids.update(entry["chapter_id"] for entry in toc)
    for text_id in tuple(keep_ids):
        if f"{text_id}_easy_read" in texts:
            keep_ids.add(f"{text_id}_easy_read")
    for key in texts:
        if key not in keep_ids:
            issues.append(f"orphan text entry: {key}")
    for key in audios:
        if key not in keep_ids:
            issues.append(f"orphan audio mapping: {key}")
    if set(timecodes) != set(audios):
        for key in sorted(set(timecodes) - set(audios)):
            issues.append(f"orphan timecode entry: {key}")
        for key in sorted(set(audios) - set(timecodes)):
            issues.append(f"missing timecode entry: {key}")

    mapped_audio = {clean_url(str(value)) for value in audios.values()}
    actual_audio = {path.name for path in (language_root / "audio").glob("*.mp3")}
    for name in sorted(mapped_audio - actual_audio):
        issues.append(f"mapped audio file missing: {name}")
    for name in sorted(actual_audio - mapped_audio):
        issues.append(f"unlinked audio file: {name}")

    semantic_flow = (root / "content/semantic-flow-pages.js").read_text(
        encoding="utf-8"
    )
    dynamic_image_refs = set(
        re.findall(r'["\'](images/[^"\']+)["\']', semantic_flow, re.I)
    )
    image_refs = direct_image_refs | dynamic_image_refs
    actual_images = {
        path.relative_to(root).as_posix()
        for path in (root / "images").rglob("*")
        if path.is_file()
    }
    for name in sorted(image_refs - actual_images):
        issues.append(f"referenced image missing: {name}")
    for name in sorted(actual_images - image_refs):
        issues.append(f"unlinked image file: {name}")

    expected_videos = {
        f"video-{number}": f"page_{number}.mp4"
        for number in range(1, 155)
    }
    if videos != expected_videos:
        issues.append("video map does not match the page 1-154 content assignments")
    actual_videos = {
        path.name for path in (language_root / "video").glob("page_*.mp4")
    }
    expected_video_files = {f"page_{number}.mp4" for number in range(1, 155)}
    for name in sorted(expected_video_files - actual_videos):
        issues.append(f"video file missing: {name}")
    for name in sorted(actual_videos - expected_video_files):
        issues.append(f"unlinked video file: {name}")

    deployable = {entry["href"] for entry in pages} | {"cover.png"}
    for directory_name in ("assets", "content", "images"):
        deployable.update(
            path.relative_to(root).as_posix()
            for path in (root / directory_name).rglob("*")
            if path.is_file()
        )
    manifest_root = ET.parse(root / "imsmanifest.xml").getroot()
    manifest_files = {
        element.attrib["href"]
        for element in manifest_root.iter()
        if element.tag.rsplit("}", 1)[-1] == "file" and "href" in element.attrib
    }
    for name in sorted(deployable - manifest_files):
        issues.append(f"manifest entry missing: {name}")
    for name in sorted(manifest_files - deployable):
        issues.append(f"stale manifest entry: {name}")

    legacy_runtime = (
        "assets/auto-fit.js",
        "assets/base.bundle.min.js.map",
        "assets/book-activities.js",
        "assets/book-theme.css",
        "assets/source-fidelity.css",
        "assets/tailwind_css.css",
        "assets/panel-icons",
        "assets/symbols",
    )
    for name in legacy_runtime:
        if (root / name).exists():
            issues.append(f"legacy runtime asset remains: {name}")

    print(f"Manifest entries: {len(pages)}")
    print("Section types:")
    for name, count in section_types.most_common():
        print(f"  {name}: {count}")
    if issues:
        print(f"Issues: {len(issues)}")
        for issue in issues:
            print(f"  - {issue}")
        return 1
    print("Issues: 0")
    return 0


if __name__ == "__main__":
    sys.exit(main())
