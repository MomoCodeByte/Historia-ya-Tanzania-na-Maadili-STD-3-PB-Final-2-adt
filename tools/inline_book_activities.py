#!/usr/bin/env python3
"""Replace the alternate exercise view with inline exercise source blocks."""

from __future__ import annotations

import argparse
import html as html_module
import json
import re
import sys
from pathlib import Path

from lxml import html


SHELL_PATTERN = re.compile(
    r'<aside\s+id="book-interactive-shell"[^>]*>(?P<body>.*)</aside>'
    r'(?P<tail>\s*(?:<!-- BOOK_INTERACTIONS_END -->\s*)?'
    r'<div class="relative z-50" id="interface-container")',
    re.DOTALL,
)

BOOK_INTERACTIONS_SCRIPT = (
    '  <script src="./assets/book-interactions.js?v=3"></script>'
)


def prepare_inline_runtime(source: str) -> str:
    """Run inline placement before the reader classifies activity visibility."""
    updated = re.sub(
        r'./assets/book-interactions\.css(?:\?[^"\s>]*)?',
        './assets/book-interactions.css?v=3',
        source,
    )
    updated = re.sub(
        r'./assets/sign-language-tts-compat\.js(?:\?[^"\s>]*)?',
        './assets/sign-language-tts-compat.js?v=27',
        updated,
    )
    updated = re.sub(
        r'^[ \t]*<script src="\./assets/book-interactions\.js(?:\?[^"\s>]*)?"></script>[ \t]*(?:\r?\n)?',
        '',
        updated,
        count=1,
        flags=re.MULTILINE,
    )
    base_pattern = re.compile(
        r'^(?P<indent>[ \t]*)<script src="\./assets/base\.bundle(?:\.min|\.local)?\.js[^"\s>]*"></script>',
        re.MULTILINE,
    )
    updated, count = base_pattern.subn(
        lambda match: (
            f'{match.group("indent")}{BOOK_INTERACTIONS_SCRIPT.strip()}\n'
            f'{match.group(0)}'
        ),
        updated,
        count=1,
    )
    if count != 1:
        raise RuntimeError("Could not find the reader runtime script")
    return updated


def normalize(value: str) -> str:
    return " ".join(value.split())


def question_summary(section) -> str:
    headings = [
        normalize(node.text_content())
        for node in section.xpath('.//h1|.//h2|.//h3|.//h4')
        if normalize(node.text_content())
    ]
    prompts = [
        normalize(node.text_content())
        for node in section.xpath('.//p|.//legend')
        if len(normalize(node.text_content())) >= 8
    ]
    control_labels = [
        normalize(node.get('aria-label', ''))
        for node in section.xpath('.//textarea|.//input|.//select')
        if normalize(node.get('aria-label', ''))
    ]

    useful: list[str] = []
    for text in headings + prompts + control_labels:
        if text not in useful:
            useful.append(text)
    if not useful:
        text = normalize(section.text_content())
        useful = [text] if text else ["Exercise block without a separate written response"]
    return " — ".join(useful)


def has_answer_area(section) -> bool:
    return "[[blank:" in section.text_content() or bool(
        section.xpath(
            './/textarea|.//input|.//select|.//*[@contenteditable="true"]|'
            './/*[@data-activity-item]|.//*[@data-activity-category]|'
            './/*[@role="listbox"]|.//*[@role="option"]'
        )
    )


def write_report(root: Path, rows: list[tuple[int, str, str, str, bool]]) -> None:
    grouped: dict[tuple[int, str], list[tuple[str, str, bool]]] = {}
    for page_number, filename, section_id, summary, has_answer in rows:
        grouped.setdefault((page_number, filename), []).append(
            (section_id, summary, has_answer)
        )

    lines = [
        "# Inline exercise audit",
        "",
        "This report records every page that used the prohibited alternate `Fanya zoezi` view. Response areas were moved into the book page; display-only duplicates were removed.",
        "",
        f"- Affected pages: {len(grouped)}",
        f"- Exercise blocks: {len(rows)}",
        f"- Response-bearing blocks placed inline: {sum(row[4] for row in rows)}",
        f"- Display-only duplicate blocks removed: {sum(not row[4] for row in rows)}",
        "",
    ]
    for (page_number, filename), exercises in grouped.items():
        lines.append(f"## Page {page_number} — `{filename}`")
        lines.append("")
        for section_id, summary, has_answer in exercises:
            escaped = html_module.unescape(summary).replace("\n", " ")
            classification = "answer area" if has_answer else "display-only duplicate"
            lines.append(f"- `{section_id}` ({classification}): {escaped}")
        lines.append("")
    (root / "exercise-inline-audit.md").write_text(
        "\n".join(lines), encoding="utf-8", newline="\n"
    )


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    pages = json.loads((root / "content/pages.json").read_text(encoding="utf-8"))
    rows: list[tuple[int, str, str, str, bool]] = []
    changes: list[tuple[Path, str]] = []
    converted = 0

    for entry in pages:
        path = root / entry["href"]
        source = path.read_text(encoding="utf-8")
        document = html.fromstring(source)
        shells = document.xpath('//*[@id="book-interactive-shell"]')
        inline_sources = document.xpath('//*[@id="book-inline-activities-source"]')
        if not shells and not inline_sources:
            continue
        activity_source = shells[0] if shells else inline_sources[0]
        for section in activity_source.xpath('./section'):
            rows.append(
                (
                    entry["page_number"],
                    path.name,
                    section.get("data-section-id", "unknown"),
                    question_summary(section),
                    has_answer_area(section),
                )
            )

        updated = source
        if shells:
            def replacement(match: re.Match[str]) -> str:
                body = re.sub(
                    r'^\s*<h2\s+class="book-interactive-shell__title"[^>]*>.*?</h2>',
                    "",
                    match.group("body"),
                    count=1,
                    flags=re.DOTALL,
                )
                return (
                    '<div id="book-inline-activities-source" hidden>'
                    + body
                    + "</div>"
                    + match.group("tail")
                )

            updated, count = SHELL_PATTERN.subn(replacement, updated, count=1)
            if count != 1:
                raise RuntimeError(
                    f"Could not safely replace exercise shell in {path.name}"
                )
            converted += 1

        updated = prepare_inline_runtime(updated)
        if updated != source:
            changes.append((path, updated))

    affected_pages = {
        (page_number, filename) for page_number, filename, _, _, _ in rows
    }
    print(f"Affected pages: {len(affected_pages)}")
    print(f"Exercise blocks: {len(rows)}")
    for page_number, filename, section_id, summary, has_answer in rows:
        classification = "answer" if has_answer else "display-only"
        print(
            f"{page_number:>3}  {filename:<21} {section_id:<18} "
            f"{classification:<12} {summary[:140]}"
        )

    if not args.apply:
        print("Dry run only; use --apply to write the inline conversion and audit report.")
        return 0

    for path, updated in changes:
        path.write_text(updated, encoding="utf-8", newline="\n")
    write_report(root, rows)
    print(f"Converted {converted} alternate exercise views to inline source blocks.")
    print(f"Updated the inline activity runtime on {len(changes)} pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
