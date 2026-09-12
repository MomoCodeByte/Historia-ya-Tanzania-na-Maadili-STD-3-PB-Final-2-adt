"""Verify sign-language video assignment and browser media constraints."""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

import imageio_ffmpeg


ROOT = Path(__file__).resolve().parents[1]
LANGUAGE = "sw"


def main() -> None:
    pages = json.loads((ROOT / "content" / "pages.json").read_text(encoding="utf-8"))
    videos = json.loads(
        (ROOT / "content" / "i18n" / LANGUAGE / "videos.json").read_text(
            encoding="utf-8"
        )
    )
    video_dir = ROOT / "content" / "i18n" / LANGUAGE / "video"
    files = sorted(
        video_dir.glob("page_*.mp4"),
        key=lambda path: int(re.search(r"\d+", path.stem).group()),
    )
    content_pages = [
        page for page in pages
        if re.fullmatch(r"pg\d{3}_sec001", page["section_id"])
    ]
    assert pages[0] == {
        "section_id": "front_cover",
        "href": "index.html",
        "page_number": 1,
    }
    assert pages[-1] == {"section_id": "back_cover", "href": "back-cover.html"}
    assert len(pages) == 154
    assert len(files) == len(content_pages) == len(videos) == 152

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    audio_tracks = []
    bad_video = []
    for path in files:
        result = subprocess.run(
            [ffmpeg, "-hide_banner", "-i", str(path)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        media = result.stderr
        if re.search(r"Stream #.*Audio:", media):
            audio_tracks.append(path.name)
        if not re.search(r"Stream #.*Video: h264", media):
            bad_video.append(path.name)

    for index, page in enumerate(content_pages, start=2):
        assert page["page_number"] == index
        assert videos[f"video-{index}"] == f"page_{index}.mp4"
        html = (ROOT / page["href"]).read_text(encoding="utf-8")
        assert f'content="{index}"' in html
        assert "sign-language-tts-compat.js" in html

    assert not audio_tracks, f"Videos containing audio: {audio_tracks}"
    assert not bad_video, f"Non-H.264 videos: {bad_video}"
    total = sum(path.stat().st_size for path in files)
    print(
        f"PASS pages={len(pages)} videos={len(files)} audio_tracks=0 "
        f"h264={len(files)} bytes={total}"
    )


if __name__ == "__main__":
    main()
