"""Embed the original interactive activities behind PDF-faithful pages."""

from __future__ import annotations

import re
import subprocess
from collections import defaultdict
from pathlib import Path

from lxml import html


ROOT = Path(__file__).resolve().parents[1]
SOURCE_COMMIT = "e43e839"


def git_text(path: str) -> str:
    return subprocess.check_output(
        ["git", "show", f"{SOURCE_COMMIT}:{path}"],
        cwd=ROOT,
        text=True,
        encoding="utf-8",
    )


def main() -> None:
    names = subprocess.check_output(
        ["git", "ls-tree", "-r", "--name-only", SOURCE_COMMIT],
        cwd=ROOT,
        text=True,
        encoding="utf-8",
    ).splitlines()
    legacy_by_page: dict[int, list[str]] = defaultdict(list)
    for name in names:
        match = re.fullmatch(r"pg(\d{3})_sec\d+\.html", name)
        if match:
            legacy_by_page[int(match.group(1))].append(name)

    embedded_pages = 0
    embedded_sections = 0
    for current in sorted(ROOT.glob("pg*_sec001.html")):
        match = re.fullmatch(r"pg(\d{3})_sec001\.html", current.name)
        if not match:
            continue
        page_number = int(match.group(1))
        activities: list[str] = []
        for legacy_name in sorted(legacy_by_page.get(page_number, [])):
            legacy = html.fromstring(git_text(legacy_name))
            activities.extend(
                html.tostring(section, encoding="unicode", method="html")
                for section in legacy.xpath('//section[starts-with(@data-section-type, "activity_")]')
            )

        source = current.read_text(encoding="utf-8")
        source = re.sub(
            r"\s*<!-- BOOK_INTERACTIONS_START -->.*?<!-- BOOK_INTERACTIONS_END -->\s*",
            "\n",
            source,
            flags=re.S,
        )
        source = re.sub(r'\s*<link[^>]+book-interactions\.css[^>]*>', "", source)
        source = re.sub(r'\s*<script[^>]+book-interactions\.js[^>]*></script>', "", source)

        if activities:
            shell = (
                '\n<!-- BOOK_INTERACTIONS_START -->\n'
                '<aside id="book-interactive-shell" class="book-interactive-shell" hidden '
                'aria-hidden="true" aria-label="Mazoezi ya ukurasa huu">'
                '<h2 class="book-interactive-shell__title">Mazoezi ya ukurasa huu</h2>'
                + "\n".join(activities)
                + "</aside>\n<!-- BOOK_INTERACTIONS_END -->\n"
            )
            source = source.replace("</main>", "</main>" + shell, 1)
            source = source.replace(
                "</head>",
                '<link rel="stylesheet" href="./assets/book-interactions.css?v=1">\n</head>',
                1,
            )
            source = source.replace(
                "</body>",
                '<script src="./assets/book-interactions.js?v=1"></script>\n</body>',
                1,
            )
            embedded_pages += 1
            embedded_sections += len(activities)

        current.write_text(source, encoding="utf-8")

    print(f"Embedded {embedded_sections} activity sections across {embedded_pages} pages")


if __name__ == "__main__":
    main()
