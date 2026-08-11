"""Regenerate every audio clip containing digits with a Swahili voice."""

from __future__ import annotations

import asyncio
import json
import re
import sys
from pathlib import Path

import edge_tts


ONES = {
    0: "sifuri", 1: "moja", 2: "mbili", 3: "tatu", 4: "nne",
    5: "tano", 6: "sita", 7: "saba", 8: "nane", 9: "tisa",
}
TENS = {
    10: "kumi", 20: "ishirini", 30: "thelathini", 40: "arobaini",
    50: "hamsini", 60: "sitini", 70: "sabini", 80: "themanini",
    90: "tisini",
}


def sw_number(number: int) -> str:
    if number < 10:
        return ONES[number]
    if number < 100:
        tens, ones = divmod(number, 10)
        base = TENS[tens * 10]
        return base if not ones else f"{base} na {ONES[ones]}"
    if number < 1000:
        hundreds, rest = divmod(number, 100)
        base = f"mia {ONES[hundreds]}"
        return base if not rest else f"{base} na {sw_number(rest)}"
    if number < 1_000_000:
        thousands, rest = divmod(number, 1000)
        base = f"elfu {sw_number(thousands)}"
        return base if not rest else f"{base} {sw_number(rest)}"
    return " ".join(ONES[int(digit)] for digit in str(number))


def spoken_text(text: str) -> str:
    return re.sub(r"\d+", lambda match: sw_number(int(match.group())), text)


async def render_one(
    semaphore: asyncio.Semaphore,
    voice: str,
    text: str,
    destination: Path,
) -> None:
    async with semaphore:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(spoken_text(text), voice).save(str(destination))
                return
            except Exception:
                if attempt == 3:
                    raise
                await asyncio.sleep(1.5 * (attempt + 1))


async def main() -> None:
    root = Path(__file__).resolve().parents[1]
    language = root / "content" / "i18n" / "sw-TZ"
    texts = json.loads((language / "texts.json").read_text(encoding="utf-8"))
    audios = json.loads((language / "audios.json").read_text(encoding="utf-8"))
    output = language / "audio"
    output.mkdir(exist_ok=True)
    voice = sys.argv[1] if len(sys.argv) > 1 else "sw-TZ-RehemaNeural"

    jobs = [
        (key, value, audios[key])
        for key, value in texts.items()
        if key in audios and re.search(r"\d", value) and not key.endswith("_easy_read")
    ]
    semaphore = asyncio.Semaphore(8)
    for start in range(0, len(jobs), 40):
        batch = jobs[start : start + 40]
        await asyncio.gather(*[
            render_one(semaphore, voice, text, output / filename)
            for _, text, filename in batch
        ])
        print(f"Regenerated {min(start + len(batch), len(jobs))}/{len(jobs)}")

    print(f"Completed {len(jobs)} Swahili number/date audio clips with {voice}")


if __name__ == "__main__":
    asyncio.run(main())
