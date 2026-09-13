(function () {
  "use strict";

  const source = document.getElementById("book-inline-activities-source");
  const page = document.getElementById("content");
  if (!source || !page) return;

  const sourceActivities = Array.from(source.children).filter(
    (element) => element.tagName === "SECTION",
  );
  const hasAnswerArea = (activity) =>
    Boolean(
      activity.querySelector(
        "textarea, input, select, [contenteditable='true'], [data-activity-item], [data-activity-category], [role='listbox'], [role='option']",
      ),
    ) || activity.textContent.includes("[[blank:");
  const activities = sourceActivities.filter(hasAnswerArea);
  if (!activities.length) {
    source.remove();
    document.documentElement.dataset.inlineActivityCount = "0";
    document.documentElement.dataset.inlineActivityIgnored = String(
      sourceActivities.length,
    );
    document.documentElement.dataset.inlineActivityUnmatched = "0";
    return;
  }

  const normalize = (value) =>
    String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\[\[blank:[^\]]+\]\]/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const tokens = (value) =>
    new Set(normalize(value).split(" ").filter((token) => token.length > 2));

  const visibleText = (element) => normalize(element.textContent);

  const searchableText = (element) =>
    normalize(
      [
        element.textContent,
        ...Array.from(
          element.querySelectorAll("[aria-label], [placeholder]"),
        ).flatMap((node) => [
          node.getAttribute("aria-label") || "",
          node.getAttribute("placeholder") || "",
        ]),
      ].join(" "),
    );

  const phrasesFor = (activity) =>
    Array.from(
      activity.querySelectorAll(
        "h1, h2, h3, h4, p, legend, label, [aria-label], [placeholder]",
      ),
    )
      .flatMap((element) => [
        visibleText(element),
        normalize(element.getAttribute("aria-label") || ""),
        normalize(element.getAttribute("placeholder") || ""),
      ])
      .filter((text, index, all) => text.length >= 12 && all.indexOf(text) === index)
      .sort((left, right) => right.length - left.length);

  const primaryCandidates = Array.from(
    page.querySelectorAll(
      ".activity-box, .flow-activity, .flow-exercise, .flow-fikiri, .flow-page76-exercise",
    ),
  ).filter((element) => !element.closest(".page-narration-hook"));

  const secondaryCandidates = Array.from(
    page.querySelectorAll("p, li, fieldset, table"),
  ).filter(
    (element) =>
      !element.closest(".page-narration-hook") &&
      !primaryCandidates.some((candidate) => candidate.contains(element)) &&
      visibleText(element).length >= 18,
  );

  const candidates = [
    ...primaryCandidates.map((element) => ({ element, primary: true })),
    ...secondaryCandidates.map((element) => ({ element, primary: false })),
  ];

  function matchScore(activity, candidate) {
    const activityText = searchableText(activity);
    const candidateText = visibleText(candidate.element);
    if (!activityText || !candidateText) return 0;

    const activityTokens = tokens(activityText);
    const candidateTokens = tokens(candidateText);
    const smaller = Math.min(activityTokens.size, candidateTokens.size);
    let score = smaller
      ? Array.from(activityTokens).filter((token) => candidateTokens.has(token)).length /
        smaller
      : 0;

    if (candidate.primary) score += 0.18;

    const activityHeading = activity.querySelector("h1, h2, h3, h4");
    const headingText = activityHeading ? visibleText(activityHeading) : "";
    if (headingText.length >= 5 && candidateText.includes(headingText)) score += 1;

    const phrase = phrasesFor(activity).find(
      (text) =>
        candidateText.includes(text) ||
        (candidateText.length >= 18 && text.includes(candidateText)),
    );
    if (phrase) score += 0.8 + Math.min(phrase.length / 300, 0.35);

    return score;
  }

  const hasQuestionContent = (activity) =>
    Array.from(activity.querySelectorAll("p, legend, label, li, table")).some(
      (element) => visibleText(element).length >= 12,
    );

  const placements = new Map();
  const unmatched = [];

  activities.forEach((activity) => {
    const ranked = candidates
      .map((candidate) => ({ ...candidate, score: matchScore(activity, candidate) }))
      .sort((left, right) => right.score - left.score);
    const best = ranked[0];
    if (!best || best.score < 0.42) {
      unmatched.push(activity);
      return;
    }
    if (!placements.has(best.element)) placements.set(best.element, []);
    placements.get(best.element).push({
      activity,
      replacesQuestion: hasQuestionContent(activity),
    });
  });

  function activityGroup(items, placement) {
    const group = document.createElement("div");
    group.className = "book-inline-activity-group";
    group.dataset.inlineActivityPlacement = placement;
    items.forEach((activity) => {
      activity.classList.add("book-inline-activity");
      group.appendChild(activity);
    });
    return group;
  }

  placements.forEach((items, target) => {
    const group = activityGroup(
      items.map((item) => item.activity),
      "matched",
    );
    if (items.some((item) => item.replacesQuestion)) {
      target.replaceWith(group);
    } else {
      target.after(group);
    }
  });

  if (unmatched.length) {
    const article = page.querySelector("article, [role='article']") || page;
    const fallback = activityGroup(unmatched, "fallback");
    fallback.classList.add("book-inline-activity-group--fallback");
    fallback.setAttribute("aria-label", "Mazoezi ya ukurasa huu");
    article.appendChild(fallback);
  }

  source.remove();
  document.documentElement.dataset.inlineActivityCount = String(activities.length);
  document.documentElement.dataset.inlineActivityIgnored = String(
    sourceActivities.length - activities.length,
  );
  document.documentElement.dataset.inlineActivityUnmatched = String(unmatched.length);

  const controls = Array.from(
    page.querySelectorAll(
      ".book-inline-activity textarea, .book-inline-activity input, .book-inline-activity select",
    ),
  );
  controls.forEach((control, index) => {
    const key = `adt:activity:${location.pathname}:${
      control.dataset.activityItem || control.name || control.dataset.ariaId || index
    }`;
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      if (control.type === "radio" || control.type === "checkbox") {
        control.checked = saved === control.value;
      } else {
        control.value = saved;
      }
    }
    const save = () => {
      const value =
        control.type === "radio" || control.type === "checkbox"
          ? control.checked
            ? control.value
            : ""
          : control.value;
      localStorage.setItem(key, value);
    };
    control.addEventListener("input", save);
    control.addEventListener("change", save);
  });
})();
