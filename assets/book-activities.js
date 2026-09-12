(function () {
  "use strict";

  const SW = {
    answer: "Andika jibu lako",
    clear: "Futa jibu",
    saved: "Jibu limehifadhiwa",
    restored: "Jibu lako limerejeshwa",
    openResponses: "Andika majibu",
    closeResponses: "Funga majibu",
    empty: "Chagua jibu kabla ya kutuma.",
    chooseMatch: "Chagua jibu, kisha chagua sehemu ya kuliweka.",
    matchPlaced: "Jibu limewekwa.",
    confirmClear: "Una uhakika unataka kufuta jibu lako?"
  };

  const chapterPages = new Set([8, 31, 52, 66, 78, 99, 115, 125, 140]);
  const responseSelector = [
    'section[data-section-type="activity_open_ended_answer"] textarea',
    'section[data-section-type="activity_fill_in_the_blank"] textarea',
    'section[data-section-type="activity_fill_in_the_blank"] input[type="text"]',
    'section[data-section-type="activity_other"] textarea'
  ].join(",");

  function currentSectionId() {
    return document.querySelector('meta[name="title-id"]')?.content || location.pathname;
  }

  function storageKey(control, index) {
    return `adt:response:${currentSectionId()}:${control.dataset.activityItem || index}`;
  }

  function makeStatus(section) {
    let tools = section.querySelector(":scope > .book-response-tools");
    if (tools) return tools;
    tools = document.createElement("div");
    tools.className = "book-response-tools";
    const status = document.createElement("div");
    status.className = "book-save-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "book-clear-response";
    clear.textContent = SW.clear;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "book-toggle-response";
    toggle.textContent = SW.openResponses;
    toggle.setAttribute("aria-expanded", "false");
    tools.append(status, toggle, clear);
    section.append(tools);
    return tools;
  }

  function addResponseToOther(section) {
    if (section.querySelector("textarea, input[type='text']")) return;
    const panel = document.createElement("div");
    panel.className = "book-response-panel";
    const label = document.createElement("label");
    const id = `${currentSectionId()}-response`;
    label.className = "book-response-label";
    label.htmlFor = id;
    label.textContent = SW.answer;
    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.dataset.activityItem = "learner-response";
    textarea.setAttribute("aria-label", SW.answer);
    panel.append(label, textarea);
    section.append(panel);
  }

  function revealResponseControl(control) {
    control.classList.add("book-source-response");
    if (!control.classList.contains("sr-only")) return;

    control.classList.remove("sr-only");
    const panel = document.createElement("div");
    panel.className = "book-source-response-panel";
    const label = document.createElement("label");
    const id = control.id || `${currentSectionId()}-${control.dataset.ariaId || "response"}`;
    control.id = id;
    label.className = "book-response-label";
    label.htmlFor = id;
    label.textContent = SW.answer;

    const parent = control.parentElement;
    const decorativeSiblings = parent
      ? Array.from(parent.children).filter((child) => child !== control)
      : [];
    const parentIsDecorativeLines = parent
      && parent.matches("div")
      && decorativeSiblings.length > 0
      && decorativeSiblings.every((child) => !child.textContent.trim() && !child.querySelector("img, input, textarea, button, select"));
    const precedingDecoration = parentIsDecorativeLines ? parent.previousElementSibling : control.previousElementSibling;

    if (parentIsDecorativeLines) {
      parent.before(panel);
      parent.classList.add("book-production-mark");
    } else {
      control.before(panel);
      if (precedingDecoration?.getAttribute("aria-hidden") === "true") {
        precedingDecoration.classList.add("book-production-mark");
      }
    }
    panel.append(label, control);
  }

  function normalizedSourceText(value) {
    return String(value || "")
      .replace(/[“”"'.,:;!?()[\]]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLocaleLowerCase("sw-TZ");
  }

  function convertEmbeddedTextPanels() {
    const selectors = [
      'img[alt*="Kazi ya kufanya"]',
      'img[alt*="Zoezi"]',
      'img[alt*="Fikiri"]',
      'img[alt*="Utangulizi"]'
    ].join(",");

    const words = (value) => new Set(normalizedSourceText(value).split(" ").filter((word) => word.length > 2));
    const overlap = (left, right) => {
      const a = words(left);
      const b = words(right);
      if (!a.size || !b.size) return 0;
      let shared = 0;
      a.forEach((word) => { if (b.has(word)) shared += 1; });
      return shared / Math.min(a.size, b.size);
    };
    const unique = (values) => values.filter((value, index) => value && values.indexOf(value) === index);

    function kindFromAlt(alt) {
      if (/utangulizi/i.test(alt)) return "utangulizi";
      if (/zoezi/i.test(alt)) return "zoezi";
      if (/fikiri/i.test(alt)) return "fikiri";
      return "kazi";
    }

    function headingFrom(kind, alt, sources) {
      const patterns = {
        kazi: /^Kazi ya kufanya(?: namba\s+\d+)?$/i,
        zoezi: /^Zoezi(?: namba\s+\d+| la jumla)?$/i,
        fikiri: /^Fikiri$/i,
        utangulizi: /^Utangulizi$/i
      };
      const source = sources.find(({ text }) => patterns[kind].test(text));
      if (source) return { text: source.text, node: source.node };
      const matches = {
        kazi: alt.match(/Kazi ya kufanya(?: namba\s+\d+)?/i),
        zoezi: alt.match(/Zoezi(?: namba\s+\d+| la jumla)?/i),
        fikiri: alt.match(/Fikiri/i),
        utangulizi: alt.match(/Utangulizi/i)
      };
      const fallback = kind === "kazi" ? "Kazi ya kufanya" : kind === "zoezi" ? "Zoezi" : kind === "utangulizi" ? "Utangulizi" : "Fikiri";
      return { text: matches[kind]?.[0] || fallback, node: null };
    }

    function exerciseItems(sources, headingText, alt) {
      const values = [];
      for (let index = 0; index < sources.length; index += 1) {
        const text = sources[index].text.trim();
        if (/^\d+[.)]$/.test(text)) {
          const next = sources.slice(index + 1).find(({ text: candidate }) => candidate.length > 5 && !/^\d+[.)]$/.test(candidate));
          if (next) values.push(next.text.replace(/^\d+[.)]\s*/, ""));
        } else if (/^\d+[.)]\s+\S/.test(text)) {
          values.push(text.replace(/^\d+[.)]\s*/, ""));
        }
      }
      const clean = unique(values).filter((text) => !new RegExp(`^${headingText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i").test(text));
      if (clean.length) return clean;
      const afterColon = alt.includes(":") ? alt.slice(alt.indexOf(":") + 1).trim() : "";
      return afterColon ? [afterColon] : [];
    }

    function statementItems(sources, headingText, alt) {
      const scored = sources
        .filter(({ text }) => text.length > 12 && normalizedSourceText(text) !== normalizedSourceText(headingText))
        .map((source) => ({ ...source, score: normalizedSourceText(alt).includes(normalizedSourceText(source.text)) ? 2 : overlap(alt, source.text) }))
        .filter(({ score }) => score >= .5)
        .sort((a, b) => b.score - a.score || b.text.length - a.text.length);
      const exact = unique(scored.filter(({ score }) => score === 2).map(({ text }) => text));
      if (exact.length) return exact.filter((text) => !exact.some((other) => other !== text && other.includes(text)));
      if (scored[0]) return [scored[0].text];
      const afterColon = alt.includes(":") ? alt.slice(alt.indexOf(":") + 1).trim() : "";
      if (afterColon) return [afterColon];
      const headingIndex = sources.findIndex(({ text }) => normalizedSourceText(text) === normalizedSourceText(headingText));
      const nearby = sources.slice(Math.max(0, headingIndex + 1)).find(({ text }) => text.length > 12 && !/^(Kazi ya kufanya|Zoezi|Fikiri)/i.test(text));
      return nearby ? [nearby.text] : [];
    }

    function introductionItems(sources, headingText) {
      const headingIndex = sources.findIndex(({ text }) => normalizedSourceText(text) === normalizedSourceText(headingText));
      const items = [];
      for (const source of sources.slice(Math.max(0, headingIndex + 1))) {
        if (/^(Fikiri|Kazi ya kufanya|Zoezi|Dhana ya|Sura ya)/i.test(source.text)) break;
        if (source.text.length > 12) items.push(source.text);
      }
      return unique(items).slice(0, 8);
    }

    function hideDuplicate(node, section) {
      if (!node || node.closest(".book-copyable-panel") || node.classList.contains("book-chapter-title")) return;
      let block = node.closest("h1, h2, h3, p") || node;
      if (block.querySelector("textarea, input, button, select")) return;
      block.classList.add("book-copyable-source-duplicate");
      block.setAttribute("aria-hidden", "true");
      while (block.parentElement && block.parentElement !== section) {
        const parent = block.parentElement;
        if (parent.querySelector('textarea, input, button, select, img:not(.book-embedded-text-image):not([aria-hidden="true"]):not([role="presentation"])')) break;
        const visibleChildren = Array.from(parent.children).filter((child) => !child.classList.contains("book-copyable-source-duplicate") && !child.classList.contains("book-embedded-text-source"));
        if (visibleChildren.length) break;
        parent.classList.add("book-copyable-source-duplicate");
        parent.setAttribute("aria-hidden", "true");
        block = parent;
      }
    }

    function createPanel(kind, heading, items, image) {
      const panel = document.createElement("article");
      panel.className = `book-copyable-panel book-copyable-panel--${kind}`;
      if (kind === "zoezi" && /^Zoezi la jumla$/i.test(heading.trim())) {
        panel.classList.add("book-copyable-panel--review");
      }
      panel.dataset.sourceImage = image.dataset.id || image.getAttribute("src") || "";

      const title = document.createElement("h2");
      title.className = "book-copyable-panel__title";
      title.textContent = heading;

      const content = document.createElement("div");
      content.className = "book-copyable-panel__content";
      const body = document.createElement("div");
      body.className = "book-copyable-panel__body";

      if (kind === "zoezi" && items.length > 1) {
        const list = document.createElement("ol");
        items.forEach((item) => {
          const entry = document.createElement("li");
          entry.textContent = item;
          list.append(entry);
        });
        body.append(list);
      } else {
        items.forEach((item) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = item;
          body.append(paragraph);
        });
      }

      if (kind === "kazi" || kind === "fikiri") {
        const icon = document.createElement("span");
        icon.className = "book-copyable-panel__icon";
        icon.setAttribute("aria-hidden", "true");
        const artwork = document.createElement("img");
        artwork.className = "book-copyable-panel__icon-art";
        artwork.alt = "";
        artwork.src = kind === "fikiri" ? "./assets/panel-icons/fikiri.png" : "./assets/panel-icons/kazi.png";
        icon.append(artwork);
        content.append(icon);
      }
      content.append(body);
      panel.append(title, content);
      return panel;
    }

    document.querySelectorAll(selectors).forEach((image) => {
      const apply = () => {
        if (image.dataset.bookTextConverted || image.naturalWidth < 380) return;
        const section = image.closest("section");
        if (!section) return;
        image.dataset.bookTextConverted = "true";

        const alt = image.alt.trim();
        const kind = kindFromAlt(alt);
        const seen = new Set();
        const sources = Array.from(section.querySelectorAll("[data-id]"))
          .filter((node) => node !== image && !node.contains(image) && !node.matches("textarea, input, select"))
          .map((node) => ({ node, text: node.textContent.replace(/\s+/g, " ").trim() }))
          .filter(({ text }) => text.length > 0 && !/\.indd\s+\d+$/i.test(text) && !/^\d{1,2}\/\d{1,2}\/\d{4}/.test(text))
          .filter(({ text }) => {
            const key = normalizedSourceText(text);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        const heading = headingFrom(kind, alt, sources);
        const items = kind === "zoezi"
          ? exerciseItems(sources, heading.text, alt)
          : kind === "utangulizi"
            ? introductionItems(sources, heading.text)
            : statementItems(sources, heading.text, alt);
        if (!items.length && kind !== "fikiri") return;

        let sourceRoot = image.parentElement;
        while (sourceRoot?.parentElement && sourceRoot.parentElement !== section) {
          const parent = sourceRoot.parentElement;
          const otherImage = Array.from(parent.querySelectorAll("img")).some((candidate) => candidate !== image && !sourceRoot.contains(candidate));
          const controlsOutside = Array.from(parent.querySelectorAll("textarea, input, button, select")).some((control) => !sourceRoot.contains(control));
          const parentText = normalizedSourceText(parent.textContent);
          const relevant = !parentText || normalizedSourceText(alt).includes(parentText) || items.some((item) => normalizedSourceText(item).includes(parentText) || parentText.includes(normalizedSourceText(item)));
          if (otherImage || controlsOutside || !relevant) break;
          sourceRoot = parent;
        }

        const panel = createPanel(kind, heading.text, items, image);
        sourceRoot.before(panel);
        image.classList.add("book-embedded-text-image");
        sourceRoot.classList.add("book-embedded-text-source");
        sourceRoot.setAttribute("aria-hidden", "true");
        hideDuplicate(heading.node, section);
        sources.filter(({ text }) => items.includes(text)).forEach(({ node }) => hideDuplicate(node, section));
        section.classList.add("book-has-copyable-panel");
      };

      if (image.complete) apply();
      else image.addEventListener("load", apply, { once: true });
    });
  }

  function normalizeChapterOpeners() {
    const chapterPattern = /^Sura ya (Kwanza|Pili|Tatu|Nne|Tano|Sita|Saba|Nane)$/i;

    function makeBanner(labelText, titleText) {
      const banner = document.createElement("div");
      banner.className = "book-chapter-banner book-generated-chapter-banner";
      const label = document.createElement("div");
      label.className = "book-chapter-label";
      label.textContent = labelText;
      const title = document.createElement("h1");
      title.className = "book-chapter-title";
      title.textContent = titleText;
      banner.append(label, title);
      return banner;
    }

    document.querySelectorAll('img[alt^="Sura ya "]').forEach((image) => {
      const match = image.alt.match(/^(Sura ya [^:]+):\s*(.+?)\.?$/i);
      const section = image.closest("section");
      if (!match || !section) return;
      let source = image.parentElement;
      if (source?.parentElement && source.parentElement !== section && !source.parentElement.querySelector("textarea, input, button, select")) {
        source = source.parentElement;
      }
      source.before(makeBanner(match[1], match[2]));
      source.classList.add("book-chapter-source");
      source.setAttribute("aria-hidden", "true");
      section.classList.add("book-chapter-page");
    });

    document.querySelectorAll("[data-id]").forEach((label) => {
      const labelText = label.textContent.replace(/\s+/g, " ").trim();
      if (!chapterPattern.test(labelText) || label.closest(".book-chapter-source, .book-generated-chapter-banner")) return;
      const section = label.closest("section");
      if (!section) return;
      const candidates = Array.from(section.querySelectorAll("[data-id]"));
      const index = candidates.indexOf(label);
      const title = candidates.slice(index + 1).find((node) => {
        const text = node.textContent.replace(/\s+/g, " ").trim();
        return text.length > 5 && !chapterPattern.test(text) && !/^Utangulizi$/i.test(text);
      });
      if (!title) return;

      let source = label;
      while (source.parentElement && source.parentElement !== section && !source.contains(title)) {
        source = source.parentElement;
      }
      if (!source.contains(title)) return;
      if (source.parentElement !== section && source.parentElement.children.length === 1) {
        source = source.parentElement;
      }

      source.before(makeBanner(labelText, title.textContent.replace(/\s+/g, " ").trim()));
      source.classList.add("book-chapter-source");
      source.setAttribute("aria-hidden", "true");
      section.classList.add("book-chapter-page");
    });
  }

  function normalizeSourceActivityArtwork() {
    const cropSpecs = {
      pg015_im003: { top: 0, visible: 175 },
      pg022_im004: { top: 45, visible: 191 },
      pg023_im001: { top: 35, visible: 239 },
      pg037_im003: { top: 45, visible: 241 }
    };
    const sourceTextOverrides = {
      pg022_im003: "Kazi ya kufanya namba 15: Waulize wazazi au walezi kuhusu mila na desturi za jamii yako, kisha andika wajibu wako katika kuzitekeleza.",
      pg034_im003: "Kazi ya kufanya namba 7: Waulize wazazi au walezi kuhusu mbinu zilizotumika kutoa elimu katika jamii inayowazunguka kabla ya ukoloni.",
      pg090_im002: "Kazi ya kufanya namba 2: Jadili na kuandika mambo uliyojifunza kuhusu shughuli za kilimo kabla ya ukoloni.",
      pg099_im002: "Kazi ya kufanya namba 10: Andika jinsi ya kuendeleza shughuli ya utengenezaji chumvi kwa maendeleo ya uchumi na jamii kwa sasa.",
      pg108_im003: "Kazi ya kufanya namba 3: Andika maana ya maneno utu, heshima, upendo, ukweli, uaminifu na amani.",
      pg153_im002: "Kazi ya kufanya namba 7: Fanya uchunguzi kuhusu maana ya ngoma zinazochezwa katika jamii yako ukizingatia midundo na maneno ya nyimbo hizo na nafasi yake katika kukuza na kutunza maadili."
    };
    const fullArtworkIds = new Set([
      "pg022_im003",
      "pg034_im003",
      "pg045_im003",
      "pg090_im002",
      "pg099_im002",
      "pg108_im003",
      "pg153_im002"
    ]);

    function collapseFullArtworkLayout(image, section) {
      let layout = image.parentElement;
      while (layout?.parentElement && layout.parentElement !== section) {
        const hasOwnText = normalizedSourceText(layout.textContent);
        const hasControls = layout.querySelector("textarea, input, button, select");
        const otherImages = Array.from(layout.querySelectorAll("img")).filter((candidate) => candidate !== image);
        if (hasOwnText || hasControls || otherImages.length) break;
        layout = layout.parentElement;
      }
      if (!layout || layout === section) return;

      const hideDuplicateSiblings = (container, visual) => {
        Array.from(container.children).forEach((sibling) => {
          if (sibling === visual || sibling.contains(visual)) return;
          if (sibling.querySelector("textarea, input, button, select")) {
            sibling.classList.add("book-source-response-host");
            sibling.querySelectorAll("h1, h2, h3, p, [data-id]").forEach((node) => {
              if (!node.querySelector("textarea, input, button, select")) {
                node.classList.add("book-source-duplicate-block");
              }
            });
            return;
          }
          sibling.classList.add("book-source-duplicate-block");
        });
      };

      hideDuplicateSiblings(layout, image);
      layout.classList.add("book-source-artwork-host");

      let visual = layout;
      let parent = visual.parentElement;
      while (parent && parent !== section) {
        const controlsOutsideVisual = Array.from(parent.querySelectorAll("textarea, input, button, select"))
          .some((control) => !visual.contains(control));
        const otherImages = Array.from(parent.querySelectorAll("img"))
          .some((candidate) => candidate !== image && !visual.contains(candidate));
        if (controlsOutsideVisual || otherImages) break;
        hideDuplicateSiblings(parent, visual);
        parent.classList.add("book-source-artwork-shell");
        visual = parent;
        parent = parent.parentElement;
      }
    }

    document.querySelectorAll([
      'img[alt*="Kazi ya kufanya namba"]',
      'img[alt^="Zoezi namba"]',
      'img[data-id="pg022_im003"]',
      'img[data-id="pg108_im003"]'
    ].join(",")).forEach((image) => {
      const apply = () => {
        if (image.dataset.bookTextConverted || image.dataset.bookSourceReady || image.naturalWidth < 600) return;
        image.dataset.bookSourceReady = "true";
        if (sourceTextOverrides[image.dataset.id]) image.alt = sourceTextOverrides[image.dataset.id];
        image.classList.add("book-source-activity-image");
        const section = image.closest("section");
        if (!section) return;
        const alt = normalizedSourceText(image.alt);

        const crop = cropSpecs[image.dataset.id];
        if (crop && !image.closest(".book-source-crop-frame")) {
          const frame = document.createElement("div");
          frame.className = "book-source-crop-frame";
          frame.style.aspectRatio = `${image.naturalWidth} / ${crop.visible}`;
          image.before(frame);
          frame.append(image);
          image.style.transform = `translateY(-${(crop.top / image.naturalHeight) * 100}%)`;
        }

        if (fullArtworkIds.has(image.dataset.id)) {
          collapseFullArtworkLayout(image, section);
        }

        let shell = image.parentElement;
        let firstShell = true;
        while (shell && shell !== section) {
          const otherImages = Array.from(shell.querySelectorAll("img")).filter((candidate) => candidate !== image);
          const hasControls = shell.querySelector("textarea, input, button, select");
          const text = normalizedSourceText(shell.textContent);
          if (otherImages.length || hasControls || (text && !alt.includes(text))) break;
          shell.classList.add(firstShell ? "book-source-artwork-host" : "book-source-artwork-shell");
          firstShell = false;
          shell = shell.parentElement;
        }

        section.querySelectorAll("[data-id]").forEach((node) => {
          if (node === image || node.contains(image) || node.matches("textarea, input, select")) return;
          const text = normalizedSourceText(node.textContent);
          if (text.length < 5 || !alt.includes(text)) return;
          let block = node.closest("h1, h2, h3, p") || node;
          while (block.parentElement && block.parentElement !== section) {
            const parent = block.parentElement;
            if (parent.querySelector("img, textarea, input, button, select")) break;
            const parentText = normalizedSourceText(parent.textContent);
            if (!parentText || !alt.includes(parentText)) break;
            block = parent;
          }
          block.classList.add("book-source-duplicate-block");
        });
      };

      if (image.complete) apply();
      else image.addEventListener("load", apply, { once: true });
    });
  }

  function normalizeKaziCards() {
    document.querySelectorAll("[data-id]").forEach((node) => {
      if (node.classList.contains("sr-only") || node.closest('[aria-hidden="true"]')) return;
      const text = node.textContent.replace(/\s+/g, " ").trim();
      if (!/^Kazi ya kufanya namba\s+\d+/i.test(text)) return;

      const heading = node.closest("h1, h2, h3") || node;
      const ribbonCandidate = heading.closest('[class*="bg-gradient"], [class*="from-pink"], [class*="from-rose"], [class*="from-fuchsia"]');
      const ribbon = ribbonCandidate?.querySelector("img, textarea, input, select") ? heading : (ribbonCandidate || heading);
      heading.classList.add("book-kazi-heading");
      ribbon.classList.add("book-kazi-ribbon");

      let card = ribbon.parentElement;
      const section = node.closest("section");
      while (card && card !== section) {
        const cardText = card.textContent.replace(/\s+/g, " ").trim();
        if (cardText.length > text.length + 8 && !card.querySelector("textarea, input, select")) {
          card.classList.add("book-kazi-card");
          break;
        }
        card = card.parentElement;
      }
    });
  }

  function normalizeTrueFalseChoices() {
    document.querySelectorAll('section[data-section-type="activity_true_false"] label:has(input[type="radio"])').forEach((label) => {
      const accessibleText = label.querySelector("span.sr-only")?.textContent.trim();
      if (!accessibleText) return;
      label.classList.add("book-true-false-choice");
      label.dataset.choice = accessibleText;
    });
  }

  function enhanceResponses() {
    document.querySelectorAll('section[data-section-type="activity_other"]').forEach(addResponseToOther);
    const controls = Array.from(document.querySelectorAll(responseSelector));
    const bySection = new Map();

    controls.forEach((control, index) => {
      if (control.parentElement?.children.length === 1) {
        control.parentElement.classList.add("book-response-only-wrapper");
      }
      revealResponseControl(control);
      const section = control.closest("section");
      if (!section) return;
      const key = storageKey(control, index);
      const saved = localStorage.getItem(key);
      if (saved !== null && !control.value) control.value = saved;
      control.dataset.bookStorageKey = key;
      const list = bySection.get(section) || [];
      list.push(control);
      bySection.set(section, list);
    });

    bySection.forEach((sectionControls, section) => {
      const tools = makeStatus(section);
      const status = tools.querySelector(".book-save-status");
      const clear = tools.querySelector(".book-clear-response");
      const toggle = tools.querySelector(".book-toggle-response");
      if (sectionControls.some((control) => localStorage.getItem(control.dataset.bookStorageKey) !== null)) {
        status.textContent = SW.restored;
        section.classList.add("book-responses-expanded");
        toggle.textContent = SW.closeResponses;
        toggle.setAttribute("aria-expanded", "true");
      }
      toggle.addEventListener("click", () => {
        const expanded = section.classList.toggle("book-responses-expanded");
        toggle.textContent = expanded ? SW.closeResponses : SW.openResponses;
        toggle.setAttribute("aria-expanded", String(expanded));
        if (expanded) sectionControls[0]?.focus();
      });
      let timer;
      sectionControls.forEach((control) => {
        control.addEventListener("input", () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            localStorage.setItem(control.dataset.bookStorageKey, control.value);
            status.textContent = SW.saved;
          }, 250);
        });
      });
      clear.addEventListener("click", () => {
        if (!window.confirm(SW.confirmClear)) return;
        sectionControls.forEach((control) => {
          control.value = "";
          localStorage.removeItem(control.dataset.bookStorageKey);
          control.dispatchEvent(new Event("input", { bubbles: true }));
        });
        status.textContent = "";
        sectionControls[0]?.focus();
      });
    });
  }

  function messageFor(section) {
    let message = section.querySelector(":scope > .book-activity-message");
    if (!message) {
      message = document.createElement("div");
      message.className = "book-activity-message";
      message.setAttribute("role", "status");
      message.setAttribute("aria-live", "polite");
      section.append(message);
    }
    return message;
  }

  function enhanceMatching() {
    document.querySelectorAll('section[data-section-type="activity_matching"]').forEach((section) => {
      const items = Array.from(section.querySelectorAll('[draggable="true"][data-activity-item]'));
      const zones = Array.from(section.querySelectorAll(".dropzone"));
      if (!items.length || !zones.length) return;
      let selected = null;
      const message = messageFor(section);

      function select(item) {
        items.forEach((candidate) => {
          candidate.classList.toggle("book-matching-selected", candidate === item);
          candidate.setAttribute("aria-pressed", candidate === item ? "true" : "false");
        });
        selected = item;
        message.textContent = SW.chooseMatch;
      }

      items.forEach((item) => {
        item.setAttribute("aria-pressed", "false");
        item.addEventListener("click", () => select(item));
        item.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          select(item);
        });
      });

      zones.forEach((zone) => {
        const place = () => {
          if (!selected) {
            message.textContent = SW.chooseMatch;
            message.dataset.tone = "error";
            return;
          }
          const slot = zone.querySelector(".dropzone-slot") || zone;
          slot.append(selected);
          selected.classList.remove("book-matching-selected");
          selected.setAttribute("aria-pressed", "false");
          selected.dispatchEvent(new Event("change", { bubbles: true }));
          selected = null;
          message.dataset.tone = "success";
          message.textContent = SW.matchPlaced;
          zone.focus();
        };
        zone.addEventListener("click", place);
        zone.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          place();
        });
      });
    });
  }

  function enhanceQuizSubmission() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button || button.textContent.trim() !== "Tuma") return;
      const quiz = document.querySelector('section[data-section-type="activity_quiz"]');
      if (!quiz || quiz.querySelector('input[type="radio"]:checked')) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      const message = messageFor(quiz);
      message.dataset.tone = "error";
      message.textContent = SW.empty;
      quiz.querySelector('input[type="radio"]')?.closest("label")?.focus();
    }, true);
  }

  function cleanProductionMarks() {
    document.querySelectorAll("[data-id]").forEach((node) => {
      const text = node.textContent.trim();
      if (/\.indd\s+\d+$/i.test(text) || /^\d{1,2}\/\d{1,2}\/\d{4}\s+\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) {
        node.classList.add("book-production-mark");
        const parent = node.parentElement;
        if (parent && Array.from(parent.children).every((child) => child.classList.contains("book-production-mark"))) {
          parent.classList.add("book-production-mark");
        }
      }
    });
  }

  function normalizeMergedFragmentEdges() {
    const content = document.getElementById("content");
    if (!content?.classList.contains("book-merged-content")) return;

    const sections = Array.from(content.querySelectorAll(":scope > .book-page-fragment"));
    sections.forEach((section) => {
      const visibleChildren = Array.from(section.children).filter((child) => {
        if (child.matches(".sr-only, .book-watermark, .book-source-footer, .book-production-mark, .book-hidden-source")) return false;
        const style = window.getComputedStyle(child);
        return !child.hidden && style.display !== "none" && style.visibility !== "hidden";
      });
      visibleChildren[0]?.classList.add("book-fragment-edge-first");
      visibleChildren.at(-1)?.classList.add("book-fragment-edge-last");
    });
  }

  function normalizeAdjacentTextSpacing() {
    document.querySelectorAll("span[data-id] + span[data-id]").forEach((span) => {
      const previous = span.previousElementSibling;
      if (!previous) return;
      const previousText = previous.textContent || "";
      const currentText = span.textContent || "";
      const between = span.previousSibling;
      const hasSpace = between?.nodeType === Node.TEXT_NODE && /\s$/.test(between.textContent || "");
      if (!hasSpace && /\S$/.test(previousText) && /^\S/.test(currentText) && !/^[,.;:!?)]/.test(currentText)) {
        span.before(document.createTextNode(" "));
      }
    });
  }

  function normalizeExerciseHeadings() {
    document.querySelectorAll("[data-id]").forEach((node) => {
      const text = node.textContent.replace(/\s+/g, " ").trim();
      if (!/^Zoezi(?: la jumla| namba\s+\d+)$/i.test(text) || node.closest(".book-copyable-panel")) return;
      const block = node.closest("h1, h2, h3, p, div") || node;
      const target = block.textContent.replace(/\s+/g, " ").trim() === text ? block : node;
      target.classList.add("book-zoezi-heading");
    });
  }

  async function enhanceSourcePage() {
    const content = document.getElementById("content");
    const sections = Array.from(content?.querySelectorAll(":scope > section") || []);
    const section = sections[0];
    const finalSection = sections[sections.length - 1];
    const index = Number(document.querySelector('meta[name="page-section-id"]')?.content || 0) - 1;
    if (!content || !section || index < 0) return;

    if (section.dataset.sectionId?.startsWith("pg") && !section.querySelector(":scope > .book-watermark")) {
      const watermark = document.createElement("div");
      watermark.className = "book-watermark";
      watermark.setAttribute("aria-hidden", "true");
      watermark.textContent = "FOR ONLINE READING ONLY";
      section.append(watermark);
    }

    try {
      const response = await fetch("./content/pages.json");
      const pages = await response.json();
      const current = pages[index];
      if (!current) return;
      const pageNumber = current.page_number;
      const isQuiz = current.href.startsWith("qz");
      const isCover = section.dataset.sectionType === "front_cover";
      const previous = pages[index - 1];
      const next = pages[index + 1];
      const firstOfPage = pageNumber != null && previous?.page_number !== pageNumber;
      const lastOfPage = pageNumber != null && next?.page_number !== pageNumber;

      if (firstOfPage && !isQuiz && !isCover) section.classList.add("book-source-first");
      if (chapterPages.has(pageNumber) && firstOfPage && !isCover) section.classList.add("book-chapter-opener");

      if (lastOfPage && !isQuiz && !isCover && !content.querySelector(".source-page-marker, .book-source-footer")) {
        const footer = document.createElement("footer");
        footer.className = "book-source-footer";
        footer.setAttribute("aria-label", `Ukurasa ${pageNumber}`);
        const rule = document.createElement("div");
        rule.className = "book-source-footer__rule";
        const number = document.createElement("div");
        number.className = "book-source-footer__number";
        number.textContent = pageNumber;
        footer.append(rule, number);
        finalSection.append(footer);
      }
    } catch (error) {
      console.warn("Book source-page styling could not load the manifest.", error);
    }
  }

  function pdfPhysicalPage(sectionNumber) {
    const frontMatter = new Map([[2, 1], [3, 2], [4, 4], [5, 3], [6, 5], [7, 6]]);
    return frontMatter.get(sectionNumber) || sectionNumber;
  }

  function enablePdfFacsimile() {
    const content = document.getElementById("content");
    const sourceSection = content?.querySelector(':scope > section[data-section-id^="pg"]');
    const match = sourceSection?.dataset.sectionId?.match(/^pg(\d{3})_/);
    if (!content || !match) return;

    const hasActivity = Boolean(content.querySelector('section[data-section-type^="activity_"]'));

    const physicalPage = pdfPhysicalPage(Number(match[1]));
    const sourceContent = document.createElement("div");
    sourceContent.className = "book-pdf-accessible-source";
    while (content.firstChild) sourceContent.append(content.firstChild);

    const figure = document.createElement("figure");
    figure.className = "book-pdf-facsimile-page";
    const image = document.createElement("img");
    image.src = `images/pdf-pages/pdf-page-${String(physicalPage).padStart(3, "0")}.webp`;
    image.alt = `Ukurasa ${physicalPage} wa kitabu asilia`;
    image.decoding = "async";
    figure.append(image);
    content.append(sourceContent, figure);
    content.classList.add("book-pdf-facsimile");

    const setPageSubmitVisibility = (visible) => document.querySelectorAll("button").forEach((button) => {
      if (button.textContent.trim() === "Tuma") button.hidden = !visible;
    });

    if (hasActivity) {
      const switcher = document.createElement("div");
      switcher.className = "book-mode-switch";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "book-mode-switch__button";
      toggle.textContent = "Fanya zoezi";
      toggle.setAttribute("aria-pressed", "false");
      switcher.append(toggle);
      content.after(switcher);

      toggle.addEventListener("click", () => {
        const interactive = content.classList.toggle("book-interaction-mode");
        content.classList.toggle("book-pdf-facsimile", !interactive);
        toggle.textContent = interactive ? "Rudi kwenye kitabu" : "Fanya zoezi";
        toggle.setAttribute("aria-pressed", String(interactive));
        setPageSubmitVisibility(interactive);
        if (interactive) content.querySelector("button, input, textarea, select")?.focus();
      });
    }

    setPageSubmitVisibility(false);
    setTimeout(() => setPageSubmitVisibility(content.classList.contains("book-interaction-mode")), 250);
  }

  function init() {
    cleanProductionMarks();
    normalizeAdjacentTextSpacing();
    // Preserve the publisher's extracted artwork and typography.  The shared
    // template used to repaint these blocks, which made the web edition drift
    // noticeably from the source PDF.
    normalizeTrueFalseChoices();
    enhanceResponses();
    normalizeMergedFragmentEdges();
    enhanceMatching();
    enhanceQuizSubmission();
    enablePdfFacsimile();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
