/* Visible Swahili read-along captions synchronized to the ADT audio timecodes. */
(function () {
  "use strict";

  const AUDIO_BASE = "./content/i18n/sw/audio/";
  const state = {
    ready: false,
    texts: {},
    idsByFile: {},
    timecodes: {},
    positions: {},
    activeAudio: null,
    activeId: "",
    activeIndex: -1,
    semanticId: "",
    semanticWords: [],
  };

  function wordsForDisplay(text) {
    return String(text || "").match(/\S+/g) || [];
  }

  function ensurePanel() {
    let panel = document.getElementById("sw-readalong-panel");
    if (panel) return panel;
    panel = document.createElement("aside");
    panel.id = "sw-readalong-panel";
    panel.setAttribute("aria-live", "polite");
    panel.setAttribute("aria-label", "Neno linalosomwa sasa");
    panel.hidden = true;
    panel.innerHTML = '<div class="sw-readalong-label">Inasoma</div><div class="sw-readalong-text"></div>';
    document.body.appendChild(panel);
    return panel;
  }

  function injectStyles() {
    if (document.getElementById("sw-readalong-styles")) return;
    const style = document.createElement("style");
    style.id = "sw-readalong-styles";
    style.textContent = `
      #sw-readalong-panel{display:none!important}
      #sw-readalong-panel[hidden]{display:none!important}
      .sw-readalong-label{margin-bottom:3px;color:#0f766e;font-size:12px;font-weight:800;line-height:1;text-transform:uppercase;letter-spacing:.12em}
      .sw-readalong-word{display:inline;border-radius:6px;padding:1px 2px;transition:background-color .08s linear,color .08s linear,box-shadow .08s linear}
      .sw-readalong-word.is-active{background:#fde047;color:#111827;box-shadow:0 0 0 3px rgba(234,179,8,.28);text-decoration:underline 3px #dc2626;text-underline-offset:3px}
      .sw-page-word-layer{position:absolute;z-index:20;inset:0;width:100%;height:100%;pointer-events:none;overflow:hidden}
      .sw-page-word-box{position:absolute;box-sizing:border-box;border-radius:1px;background:transparent;transition:background-color .06s linear}
      .sw-page-word-box.is-active{background:rgba(255,235,59,.82);outline:2px solid rgba(245,158,11,.9)}
      ::highlight(sw-readalong-active){background:#fde047;color:#111827;text-decoration:underline 2px #dc2626;text-underline-offset:2px}
      .sw-readalong-sentence-active{border-radius:4px;background:rgba(253,224,71,.35);box-shadow:0 0 0 2px rgba(234,179,8,.2)}
      @media(max-width:640px){#sw-readalong-panel{bottom:78px;width:96vw;padding:8px 10px 10px;font-size:17px;line-height:1.45}}
    `;
    document.head.appendChild(style);
  }

  function renderPrintedWordLayer() {
    const pageId = document.querySelector('meta[name="title-id"]')?.content;
    const pagePositions = state.positions[pageId];
    const section = document.querySelector('[data-section-type="pdf_faithful_page"]');
    if (!pagePositions || !section || section.querySelector(".sw-page-word-layer")) return;
    section.style.position = "relative";
    const layer = document.createElement("div");
    layer.className = "sw-page-word-layer";
    layer.setAttribute("aria-hidden", "true");
    for (const [textId, boxes] of Object.entries(pagePositions)) {
      boxes.forEach((box, index) => {
        if (!box) return;
        const marker = document.createElement("span");
        marker.className = "sw-page-word-box";
        marker.dataset.readalongId = textId;
        marker.dataset.wordIndex = String(index);
        marker.style.left = `${box.x}%`;
        marker.style.top = `${box.y}%`;
        marker.style.width = `${box.w}%`;
        marker.style.height = `${box.h}%`;
        layer.appendChild(marker);
      });
    }
    section.appendChild(layer);
    mirrorRuntimeHighlight();
  }

  function setPrintedHighlight(textId, index) {
    const current = document.querySelector(".sw-page-word-box.is-active");
    const printed = textId && index >= 0
      ? document.querySelector(`.sw-page-word-box[data-readalong-id="${CSS.escape(textId)}"][data-word-index="${index}"]`)
      : null;
    if (current === printed) return;
    if (current) current.classList.remove("is-active");
    if (printed) printed.classList.add("is-active");
  }

  function normalizedWord(word) {
    const raw = String(word || "").normalize("NFKC").toLocaleLowerCase("sw");
    const compact = raw.replace(/[^\p{L}\p{N}]+/gu, "");
    return compact || raw;
  }

  function visiblePageWords() {
    const root = document.querySelector(".source-page-inner") || document.getElementById("content");
    if (!root) return [];
    const words = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest('.page-narration-hook,[hidden],[aria-hidden="true"],script,style,textarea')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    let node = walker.nextNode();
    while (node) {
      const matcher = /\S+/g;
      let match = matcher.exec(node.nodeValue);
      while (match) {
        words.push({
          node,
          start: match.index,
          end: match.index + match[0].length,
          key: normalizedWord(match[0]),
        });
        match = matcher.exec(node.nodeValue);
      }
      node = walker.nextNode();
    }
    return words;
  }

  function prepareSemanticWords(id) {
    state.semanticId = id;
    state.semanticWords = [];
    const wanted = wordsForDisplay(state.texts[id]).map(normalizedWord);
    if (!wanted.length) return;
    const pageWords = visiblePageWords();
    const lastStart = pageWords.length - wanted.length;
    for (let start = 0; start <= lastStart; start += 1) {
      let matches = true;
      for (let index = 0; index < wanted.length; index += 1) {
        if (pageWords[start + index].key !== wanted[index]) {
          matches = false;
          break;
        }
      }
      if (matches) {
        state.semanticWords = pageWords.slice(start, start + wanted.length);
        return;
      }
    }
  }

  function clearSemanticHighlight() {
    CSS.highlights?.delete("sw-readalong-active");
    document.querySelectorAll(".sw-readalong-sentence-active").forEach((element) => {
      element.classList.remove("sw-readalong-sentence-active");
    });
  }

  function setSemanticHighlight(id, index) {
    if (state.semanticId !== id) prepareSemanticWords(id);
    clearSemanticHighlight();
    const word = state.semanticWords[index];
    if (!word) return;
    const range = document.createRange();
    range.setStart(word.node, word.start);
    range.setEnd(word.node, word.end);
    if (CSS.highlights && typeof Highlight === "function") {
      CSS.highlights.set("sw-readalong-active", new Highlight(range));
    } else {
      word.node.parentElement?.classList.add("sw-readalong-sentence-active");
    }
    const rect = range.getBoundingClientRect();
    if (rect.bottom < 70 || rect.top > window.innerHeight - 110) {
      word.node.parentElement?.scrollIntoView({
        block: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    }
  }

  function mirrorRuntimeHighlight() {
    const active = document.querySelector('#content [data-id] [data-word-index].bg-yellow-300');
    if (!active) {
      setPrintedHighlight("", -1);
      return;
    }
    const owner = active.closest("[data-id]");
    setPrintedHighlight(owner?.getAttribute("data-id") || "", Number(active.getAttribute("data-word-index")));
  }

  function watchRuntimeHighlight() {
    const content = document.getElementById("content");
    if (!content) return;
    new MutationObserver((mutations) => {
      const runtimeChanged = mutations.some((mutation) => {
        const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
        return target && !target.closest(".sw-page-word-layer") && target.closest("[data-id]");
      });
      if (runtimeChanged) mirrorRuntimeHighlight();
    }).observe(content, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function renderSentence(id) {
    const panel = ensurePanel();
    const target = panel.querySelector(".sw-readalong-text");
    const words = wordsForDisplay(state.texts[id]);
    target.replaceChildren(...words.flatMap((word, index) => {
      const span = document.createElement("span");
      span.className = "sw-readalong-word";
      span.dataset.wordIndex = String(index);
      span.textContent = word;
      return index === words.length - 1 ? [span] : [span, document.createTextNode(" ")];
    }));
    panel.hidden = words.length === 0;
    state.activeIndex = -1;
  }

  function entryFor(id) {
    const root = state.timecodes[id];
    return root?.timecodes?.find(Boolean)?.word_timestamps || [];
  }

  function findWordIndex(entries, time) {
    let match = -1;
    for (let index = 0; index < entries.length; index += 1) {
      const item = entries[index];
      if (time + 0.025 >= Number(item.start || 0) && time < Number(item.end || item.start || 0) + 0.04) {
        match = Number.isInteger(item.display_index) ? item.display_index : index;
        break;
      }
    }
    return match;
  }

  function update(audio) {
    if (!state.ready || !audio?.src) return;
    const file = decodeURIComponent(audio.src.split("/").pop().split("?")[0]);
    const id = state.idsByFile[file];
    if (!id) return;
    if (state.activeId !== id) {
      state.activeId = id;
      renderSentence(id);
    }
    const index = findWordIndex(entryFor(id), audio.currentTime);
    if (index === state.activeIndex) return;
    const panel = ensurePanel();
    panel.querySelectorAll(".sw-readalong-word.is-active").forEach((word) => word.classList.remove("is-active"));
    const active = panel.querySelector(`[data-word-index="${index}"]`);
    if (active) active.classList.add("is-active");
    setPrintedHighlight(id, index);
    setSemanticHighlight(id, index);
    state.activeIndex = index;
  }

  function attach(audio) {
    if (!(audio instanceof HTMLMediaElement) || audio.dataset.swReadalongAttached) return;
    audio.dataset.swReadalongAttached = "true";
    audio.addEventListener("play", () => {
      state.activeAudio = audio;
      ensurePanel().hidden = false;
      update(audio);
    });
    audio.addEventListener("timeupdate", () => update(audio));
    audio.addEventListener("seeking", () => update(audio));
    audio.addEventListener("ended", () => {
      if (state.activeAudio === audio) {
        ensurePanel().hidden = true;
        clearSemanticHighlight();
        setPrintedHighlight("", -1);
      }
    });
  }

  async function loadData() {
    const [texts, audios, timecodes, positions] = await Promise.all([
      fetch("./content/i18n/sw/texts.json").then((response) => response.json()),
      fetch("./content/i18n/sw/audios.json").then((response) => response.json()),
      fetch("./content/i18n/sw/timecode/timecode_output.json").then((response) => response.json()),
      fetch("./content/readalong-positions.json?v=16", { cache: "no-store" }).then((response) => response.json()),
    ]);
    state.texts = texts;
    state.timecodes = timecodes;
    state.positions = positions;
    state.idsByFile = Object.fromEntries(Object.entries(audios).map(([id, file]) => [String(file).split("/").pop().split("?")[0], id]));
    state.ready = true;
    renderPrintedWordLayer();
    document.querySelectorAll("audio").forEach(attach);
  }

  const nativePlay = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    attach(this);
    return nativePlay.apply(this, args);
  };

  injectStyles();
  ensurePanel();
  watchRuntimeHighlight();
  new MutationObserver(() => document.querySelectorAll("audio").forEach(attach))
    .observe(document.documentElement, { childList: true, subtree: true });
  loadData().catch((error) => console.warn("[sw-readalong] Imeshindwa kupakia timecodes", error));
})();
