#!/usr/bin/env python3
"""Check that every inline activity can be associated with its source question."""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from pathlib import Path

from lxml import html


PRIMARY_CLASSES = {
    "activity-box",
    "flow-activity",
    "flow-exercise",
    "flow-fikiri",
    "flow-page76-exercise",
}


def normalize(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(character for character in value if not unicodedata.combining(character))
    value = re.sub(r"\[\[blank:[^\]]+\]\]", " ", value.lower())
    return " ".join(re.sub(r"[^a-z0-9]+", " ", value).split())


def text(element) -> str:
    return normalize(element.text_content())


def searchable_text(element) -> str:
    values = [element.text_content()]
    for node in element.xpath('.//*[@aria-label or @placeholder]'):
        values.extend((node.get("aria-label", ""), node.get("placeholder", "")))
    return normalize(" ".join(values))


def phrases(element) -> list[str]:
    values: list[str] = []
    for node in element.xpath(
        './/h1|.//h2|.//h3|.//h4|.//p|.//legend|.//label|.//*[@aria-label]|.//*[@placeholder]'
    ):
        values.extend(
            (
                text(node),
                normalize(node.get("aria-label", "")),
                normalize(node.get("placeholder", "")),
            )
        )
    return sorted({value for value in values if len(value) >= 12}, key=len, reverse=True)


def has_ancestor_class(element, class_name: str) -> bool:
    return any(class_name in ancestor.get("class", "").split() for ancestor in element.iterancestors())


def score(activity, candidate, primary: bool) -> float:
    activity_text = searchable_text(activity)
    candidate_text = text(candidate)
    if not activity_text or not candidate_text:
        return 0.0
    activity_tokens = {token for token in activity_text.split() if len(token) > 2}
    candidate_tokens = {token for token in candidate_text.split() if len(token) > 2}
    smaller = min(len(activity_tokens), len(candidate_tokens))
    result = (
        len(activity_tokens & candidate_tokens) / smaller if smaller else 0.0
    )
    if primary:
        result += 0.18
    headings = activity.xpath('.//h1|.//h2|.//h3|.//h4')
    heading = text(headings[0]) if headings else ""
    if len(heading) >= 5 and heading in candidate_text:
        result += 1.0
    phrase = next(
        (
            value
            for value in phrases(activity)
            if value in candidate_text
            or (len(candidate_text) >= 18 and candidate_text in value)
        ),
        None,
    )
    if phrase:
        result += 0.8 + min(len(phrase) / 300, 0.35)
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verbose", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    pages = json.loads((root / "content/pages.json").read_text(encoding="utf-8"))
    checked = 0
    ignored = 0
    failures: list[str] = []
    lowest: tuple[float, str] = (99.0, "")

    for entry in pages:
        path = root / entry["href"]
        document = html.fromstring(path.read_text(encoding="utf-8"))
        sources = document.xpath('//*[@id="book-inline-activities-source"]')
        if not sources:
            continue
        content = document.xpath('//*[@id="content"]')[0]
        primary = [
            node
            for node in content.iterdescendants()
            if PRIMARY_CLASSES & set(node.get("class", "").split())
            and not has_ancestor_class(node, "page-narration-hook")
        ]
        secondary = [
            node
            for node in content.iterdescendants()
            if node.tag in {"p", "li", "fieldset", "table"}
            and not has_ancestor_class(node, "page-narration-hook")
            and not any(parent is candidate for parent in node.iterancestors() for candidate in primary)
            and len(text(node)) >= 18
        ]
        narration = content.xpath('.//*[contains(concat(" ", normalize-space(@class), " "), " page-narration-hook ")]//span')
        candidates = [(node, True) for node in primary] + [
            (node, False) for node in secondary + narration if len(text(node)) >= 18
        ]

        for activity in sources[0].xpath('./section'):
            answer_areas = activity.xpath(
                './/textarea|.//input|.//select|.//*[@contenteditable="true"]|'
                './/*[@data-activity-item]|.//*[@data-activity-category]|'
                './/*[@role="listbox"]|.//*[@role="option"]'
            )
            if not answer_areas and "[[blank:" not in activity.text_content():
                ignored += 1
                continue
            checked += 1
            ranked = sorted(
                ((score(activity, node, is_primary), node) for node, is_primary in candidates),
                key=lambda item: item[0],
                reverse=True,
            )
            best_score, best = ranked[0] if ranked else (0.0, None)
            label = f"page {entry['page_number']} {activity.get('data-section-id', 'unknown')}"
            if best_score < lowest[0]:
                lowest = (best_score, label)
            if best_score < 0.42:
                failures.append(f"{label}: best score {best_score:.3f}")
            elif args.verbose:
                print(f"{label}: {best_score:.3f} -> {text(best)[:100]}")

    print(f"Inline activities checked: {checked}")
    print(f"Display-only duplicate blocks ignored: {ignored}")
    print(f"Lowest related-question score: {lowest[0]:.3f} ({lowest[1]})")
    print(f"Unmatched activities: {len(failures)}")
    for failure in failures:
        print(f"  - {failure}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
