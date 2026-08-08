"""Regenerate number, date, Roman numeral and alphabet audio in Tanzanian Swahili."""

from __future__ import annotations

import argparse
import asyncio
import json
import re
from pathlib import Path

import edge_tts


ROOT = Path(__file__).resolve().parents[1]
I18N = ROOT / "content" / "i18n" / "sw"
VOICE = "sw-TZ-RehemaNeural"
RATE = "-12%"

ONES = {
    0: "sifuri", 1: "moja", 2: "mbili", 3: "tatu", 4: "nne",
    5: "tano", 6: "sita", 7: "saba", 8: "nane", 9: "tisa",
}
TENS = {
    10: "kumi", 20: "ishirini", 30: "thelathini", 40: "arobaini",
    50: "hamsini", 60: "sitini", 70: "sabini", 80: "themanini", 90: "tisini",
}
LETTER_NAMES = {
    "a": "a", "b": "be", "c": "che", "d": "de", "e": "e", "f": "efe",
    "g": "ge", "h": "ha", "i": "i", "j": "je", "k": "ka", "l": "ele",
    "m": "eme", "n": "ene", "o": "o", "p": "pe", "q": "kyu", "r": "ere",
    "s": "ese", "t": "te", "u": "u", "v": "ve", "w": "dabalyu",
    "x": "eksi", "y": "wai", "z": "zedi",
}
ENGLISH_INITIAL_NAMES = {
    "a": "ei", "b": "bii", "c": "sii", "d": "dii", "e": "ii", "f": "ef",
    "g": "jii", "h": "eichi", "i": "ai", "j": "jei", "k": "kei", "l": "el",
    "m": "em", "n": "en", "o": "ou", "p": "pii", "q": "kyuu", "r": "aa",
    "s": "es", "t": "tii", "u": "yuu", "v": "vii", "w": "dablyuu",
    "x": "eksi", "y": "wai", "z": "zed",
}
ROMAN_VALUES = {"i": 1, "v": 5, "x": 10, "l": 50, "c": 100, "d": 500, "m": 1000}
TITLE_EXPANSIONS = {
    "bw": "Bwana",
    "dkt": "Dokta",
    "bi": "Bibi",
}


def number_sw(number: int) -> str:
    if number < 0:
        return "hasi " + number_sw(-number)
    if number < 10:
        return ONES[number]
    if number < 100:
        tens, rest = divmod(number, 10)
        base = TENS[tens * 10]
        return base if rest == 0 else f"{base} na {number_sw(rest)}"
    if number < 1_000:
        hundreds, rest = divmod(number, 100)
        base = f"mia {number_sw(hundreds)}"
        return base if rest == 0 else f"{base} na {number_sw(rest)}"
    for value, label in ((1_000_000_000, "bilioni"), (1_000_000, "milioni"), (1_000, "elfu")):
        if number >= value:
            count, rest = divmod(number, value)
            base = f"{label} {number_sw(count)}"
            return base if rest == 0 else f"{base} na {number_sw(rest)}"
    raise ValueError(number)


def roman_to_int(value: str) -> int:
    total = 0
    previous = 0
    for char in reversed(value.lower()):
        current = ROMAN_VALUES[char]
        total += -current if current < previous else current
        previous = max(previous, current)
    return total


def digits_sw(value: str) -> str:
    return " ".join(ONES[int(char)] for char in value if char.isdigit())


def swahili_clock(hour: int, minute: int) -> str:
    swahili_hour = ((hour + 5) % 12) + 1
    if 5 <= hour < 6:
        period = "alfajiri"
    elif 6 <= hour < 12:
        period = "asubuhi"
    elif 12 <= hour < 16:
        period = "mchana"
    elif 16 <= hour < 19:
        period = "jioni"
    else:
        period = "usiku"
    minute_phrase = f" na dakika {number_sw(minute)}" if minute else ""
    return f"saa {number_sw(swahili_hour)}{minute_phrase} {period}"


def normalize_token(token: str, full_text: str) -> str:
    prefix = re.match(r"^\W*", token).group(0)
    suffix = re.search(r"\W*$", token).group(0)
    core = token[len(prefix):len(token) - len(suffix) if suffix else None]
    if not core:
        return token

    title = TITLE_EXPANSIONS.get(core.lower())
    if title:
        return title

    date = re.fullmatch(r"(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})", core)
    if date:
        day, month, year = map(int, date.groups())
        return f"tarehe {number_sw(day)} mwezi wa {number_sw(month)} mwaka {number_sw(year)}"

    clock = re.fullmatch(r"(\d{1,2}):(\d{2})", core)
    if clock:
        hour, minute = map(int, clock.groups())
        if 0 <= hour <= 23 and 0 <= minute <= 59:
            return swahili_clock(hour, minute)

    if re.fullmatch(r"[ivxlcdm]+", core) and core.islower() and (len(core) > 1 or "." in suffix):
        return number_sw(roman_to_int(core))

    name_initial = bool(
        len(core) == 1
        and core.isupper()
        and "." in suffix
        and re.search(
            rf"\b(?!Sehemu\b)[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’-]+[ \t]+{re.escape(core)}\.[ \t]+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’-]+",
            full_text,
        )
    )
    if name_initial:
        return ENGLISH_INITIAL_NAMES[core.lower()]

    if len(core) == 1 and core.isalpha() and core.lower() in LETTER_NAMES:
        return f"herufi {LETTER_NAMES[core.lower()]}"

    if core.isdigit():
        if re.search(r"ISBN|simu|S\.\s*L\.\s*P", full_text, re.IGNORECASE) or len(core) > 6:
            return digits_sw(core)
        return number_sw(int(core))

    def replace_number(match: re.Match[str]) -> str:
        value = match.group(0)
        return digits_sw(value) if len(value) > 6 else number_sw(int(value))

    return re.sub(r"\d+", replace_number, core) if re.search(r"\d", core) else core


def normalize_text(text: str) -> tuple[str, list[int]]:
    original_tokens = re.findall(r"\S+", text)
    spoken_parts: list[str] = []
    display_map: list[int] = []
    for index, token in enumerate(original_tokens):
        spoken = normalize_token(token, text).strip()
        words = re.findall(r"\S+", spoken)
        spoken_parts.extend(words)
        display_map.extend([index] * len(words))
    return " ".join(spoken_parts), display_map


def needs_normalization(text: str) -> bool:
    stripped = text.strip().rstrip(".)")
    return bool(
        re.search(r"\d", text)
        or re.search(r"(?<!\w)(?:Bw|Dkt|Bi)\.(?!\w)", text, re.IGNORECASE)
        or re.search(r"\b(?!Sehemu\b)[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’-]+[ \t]+[A-Z]\.[ \t]+[A-Z][A-Za-zÀ-ÖØ-öø-ÿ'’-]+", text)
        or re.fullmatch(r"[A-Za-z]", stripped)
        or (stripped.islower() and re.fullmatch(r"[ivxlcdm]+", stripped))
    )


async def synthesize(text_id: str, spoken: str, display_map: list[int], output: Path) -> dict:
    last_error: Exception | None = None
    for attempt in range(4):
        try:
            communicate = edge_tts.Communicate(spoken, VOICE, rate=RATE, boundary="WordBoundary")
            audio = bytearray()
            boundaries: list[dict] = []
            async for chunk in communicate.stream():
                if chunk["type"] == "audio":
                    audio.extend(chunk["data"])
                elif chunk["type"] == "WordBoundary":
                    boundaries.append(chunk)
            output.write_bytes(bytes(audio))
            timestamps = []
            for index, item in enumerate(boundaries):
                start = float(item["offset"]) / 10_000_000
                end = start + float(item["duration"]) / 10_000_000
                timestamps.append({
                    "text": item["text"],
                    "start": round(start, 4),
                    "end": round(end, 4),
                    "display_index": display_map[min(index, len(display_map) - 1)] if display_map else index,
                })
            return {"timecodes": [None, {"word_timestamps": timestamps}]}
        except Exception as error:
            last_error = error
            await asyncio.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"{text_id}: {last_error}")


async def run(limit: int | None, requested_ids: list[str] | None) -> None:
    texts_path = I18N / "texts.json"
    audios_path = I18N / "audios.json"
    timecodes_path = I18N / "timecode" / "timecode_output.json"
    texts = json.loads(texts_path.read_text(encoding="utf-8"))
    audios = json.loads(audios_path.read_text(encoding="utf-8"))
    timecodes = json.loads(timecodes_path.read_text(encoding="utf-8"))
    if requested_ids:
        requested = set(requested_ids)
        selected = [(key, value) for key, value in texts.items() if key in audios and key in requested]
    else:
        selected = [(key, value) for key, value in texts.items() if key in audios and needs_normalization(value)]
    if limit is not None:
        selected = selected[:limit]

    pronunciation_path = I18N / "pronunciations.json"
    pronunciation: dict[str, str] = (
        json.loads(pronunciation_path.read_text(encoding="utf-8")) if pronunciation_path.exists() else {}
    )
    semaphore = asyncio.Semaphore(8)

    async def worker(text_id: str, displayed: str) -> tuple[str, dict]:
        spoken, display_map = normalize_text(displayed)
        pronunciation[text_id] = spoken
        async with semaphore:
            audio_filename = str(audios[text_id]).split("?")[0].split("/")[-1]
            result = await synthesize(text_id, spoken, display_map, I18N / "audio" / audio_filename)
        print(f"{text_id}: {displayed!r} -> {spoken!r}")
        return text_id, result

    completed = 0
    for start in range(0, len(selected), 80):
        results = await asyncio.gather(*(worker(*item) for item in selected[start:start + 80]))
        for text_id, result in results:
            timecodes[text_id] = result
            completed += 1
        timecodes_path.write_text(json.dumps(timecodes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        pronunciation_path.write_text(
            json.dumps(pronunciation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"Saved {completed}/{len(selected)}")

    print(f"Regenerated {completed} Tanzanian Swahili audio files with synchronized word boundaries.")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int)
    parser.add_argument("--ids", nargs="+")
    args = parser.parse_args()
    asyncio.run(run(args.limit, args.ids))


if __name__ == "__main__":
    main()
