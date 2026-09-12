"""Verify sign-language video assignment and browser media constraints."""

from __future__ import annotations

import json
import struct
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
LANGUAGE = "sw"
CONTAINER_BOXES = {b"moov", b"trak", b"mdia", b"minf", b"stbl"}


def iter_boxes(handle, start: int, end: int):
    position = start
    while position + 8 <= end:
        handle.seek(position)
        header = handle.read(8)
        size, kind = struct.unpack(">I4s", header)
        header_size = 8
        if size == 1:
            extended = handle.read(8)
            if len(extended) != 8:
                raise ValueError("truncated extended MP4 box")
            size = struct.unpack(">Q", extended)[0]
            header_size = 16
        elif size == 0:
            size = end - position
        if size < header_size or position + size > end:
            raise ValueError(f"invalid MP4 box {kind!r} at {position}")
        yield kind, position + header_size, position + size
        position += size


def inspect_track(handle, start: int, end: int) -> tuple[set[bytes], set[bytes]]:
    handlers: set[bytes] = set()
    codecs: set[bytes] = set()

    def walk(box_start: int, box_end: int) -> None:
        for kind, payload_start, payload_end in iter_boxes(handle, box_start, box_end):
            if kind == b"hdlr" and payload_end - payload_start >= 12:
                handle.seek(payload_start + 8)
                handlers.add(handle.read(4))
            elif kind == b"stsd" and payload_end - payload_start >= 16:
                handle.seek(payload_start + 12)
                codecs.add(handle.read(4))
            elif kind in CONTAINER_BOXES:
                walk(payload_start, payload_end)

    walk(start, end)
    return handlers, codecs


def inspect_mp4(path: Path) -> tuple[bool, bool]:
    has_audio = False
    has_h264_video = False
    with path.open("rb") as handle:
        size = path.stat().st_size
        for kind, payload_start, payload_end in iter_boxes(handle, 0, size):
            if kind != b"moov":
                continue
            for child_kind, child_start, child_end in iter_boxes(
                handle, payload_start, payload_end
            ):
                if child_kind != b"trak":
                    continue
                handlers, codecs = inspect_track(handle, child_start, child_end)
                has_audio = has_audio or b"soun" in handlers
                if b"vide" in handlers and codecs.intersection({b"avc1", b"avc3"}):
                    has_h264_video = True
    return has_audio, has_h264_video


def main() -> None:
    pages = json.loads((ROOT / "content/pages.json").read_text(encoding="utf-8"))
    videos = json.loads(
        (ROOT / "content/i18n" / LANGUAGE / "videos.json").read_text(
            encoding="utf-8"
        )
    )
    video_dir = ROOT / "content/i18n" / LANGUAGE / "video"
    files = sorted(
        video_dir.glob("page_*.mp4"), key=lambda path: int(path.stem.split("_")[1])
    )

    assert len(pages) == len(files) == len(videos) == 154
    assert pages[0] == {
        "section_id": "front_cover",
        "href": "index.html",
        "page_number": 1,
    }
    assert pages[-1] == {
        "section_id": "back_cover",
        "href": "back-cover.html",
        "page_number": 154,
    }

    audio_tracks = []
    non_h264 = []
    for path in files:
        has_audio, has_h264_video = inspect_mp4(path)
        if has_audio:
            audio_tracks.append(path.name)
        if not has_h264_video:
            non_h264.append(path.name)

    video_file_overrides = {}
    for page_number, page in enumerate(pages, start=1):
        assert page["page_number"] == page_number
        expected_file_number = video_file_overrides.get(page_number, page_number)
        assert videos[f"video-{page_number}"] == f"page_{expected_file_number}.mp4"
        html = (ROOT / page["href"]).read_text(encoding="utf-8")
        assert f'content="{page_number}"' in html
        assert "sign-language-tts-compat.js" in html
        assert "media-playback-independence.js" in html

    assert not audio_tracks, f"Videos containing audio: {audio_tracks}"
    assert not non_h264, f"Non-H.264 videos: {non_h264}"
    total = sum(path.stat().st_size for path in files)
    print(
        f"PASS pages={len(pages)} videos={len(files)} audio_tracks=0 "
        f"h264={len(files)} bytes={total}"
    )


if __name__ == "__main__":
    main()
