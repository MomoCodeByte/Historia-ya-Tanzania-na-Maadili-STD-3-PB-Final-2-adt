(function () {
  "use strict";

  // Sign-language video is visual-only and must not take playback ownership
  // away from the book's TTS. The runtime normally treats the two players as
  // mutually exclusive, so intercept only sign-video playback behavior.
  const nativePause = HTMLMediaElement.prototype.pause;
  const nativePlay = HTMLMediaElement.prototype.play;
  const audioPlayers = new Set();
  const nativeSpeak = window.speechSynthesis?.speak?.bind(window.speechSynthesis);
  const normalizeTtsText = (text) =>
    String(text).replace(/\bZoezi\s+la\s+1\b/gi, "Zoezi la Kwanza");
  const signVideoFileOverrides = {
    30: 31,
    31: 32,
    32: 33,
    33: 34,
    34: 35,
    35: 36,
    36: 37,
    38: 30,
  };

  const currentPageNumber = () =>
    Number(document.querySelector('meta[name="page-section-id"]')?.content);

  const currentSignVideoHref = () => {
    const pageNumber = currentPageNumber();
    if (!Number.isInteger(pageNumber) || pageNumber < 1) return "";
    const fileNumber = signVideoFileOverrides[pageNumber] || pageNumber;
    return `./content/i18n/sw/video/page_${fileNumber}.mp4`;
  };

  if (nativeSpeak) {
    window.speechSynthesis.speak = (utterance) => {
      if (utterance && typeof utterance.text === "string") {
        utterance.text = normalizeTtsText(utterance.text);
      }
      return nativeSpeak(utterance);
    };
  }
  const isSignVideo = (media) =>
    media instanceof HTMLVideoElement &&
    /\/content\/i18n\/[^/]+\/video\/page_\d+\.mp4(?:[?#]|$)/i.test(
      media.currentSrc || media.src || "",
    );

  HTMLMediaElement.prototype.pause = function () {
    if (isSignVideo(this)) return;
    return nativePause.call(this);
  };

  // Keep a single narration voice active. Some pages can start the next TTS
  // clip before the previous one has fully stopped, which sounds like two
  // voices speaking over each other.
  HTMLMediaElement.prototype.play = function () {
    if (this instanceof HTMLAudioElement) {
      for (const player of audioPlayers) {
        if (player !== this && !player.paused) nativePause.call(player);
      }
      audioPlayers.add(this);
    }
    return nativePlay.call(this);
  };

  const prepareSignVideo = (video) => {
    if (!isSignVideo(video)) return;
    const expectedHref = currentSignVideoHref();
    if (expectedHref) {
      const currentPath = new URL(video.currentSrc || video.src, document.baseURI).pathname;
      const expectedPath = new URL(expectedHref, document.baseURI).pathname;
      if (currentPath !== expectedPath) video.src = expectedHref;
    }
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.setAttribute("muted", "");
    video.preload = "auto";
    video.setAttribute("preload", "auto");
    video.setAttribute("playsinline", "");
    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load();
  };

  const hideSubmitButtons = (root) => {
    root.querySelectorAll?.("button").forEach((button) => {
      const label = (button.getAttribute("aria-label") || "").trim();
      const text = (button.textContent || "").replace(/\s+/g, " ").trim();
      if (label !== "Tuma" && text !== "Tuma") return;
      button.hidden = true;
      button.setAttribute("aria-hidden", "true");
      button.setAttribute("tabindex", "-1");
      button.style.setProperty("display", "none", "important");
    });
  };

  const suppressFooterTts = (root) => {
    root.querySelectorAll?.("[data-id]").forEach((element) => {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim();
      const isBookFooter =
        /Historia ya Tanzania na Maadili\s+STD\s*3\s+PB\s+Final\.indd\s+\d+/i.test(text);
      const isPrintTimestamp =
        /^\d{1,2}\/\d{1,2}\/20\d{2}\s+\d{1,2}:\d{2}$/i.test(text);
      const isOnlineOnly = /^FOR\s+ONLINE\s+READING\s+ONLY$/i.test(text);
      if (!isBookFooter && !isPrintTimestamp && !isOnlineOnly) return;
      element.removeAttribute("data-id");
      element.setAttribute("data-tts-skip", "footer");
      element.setAttribute("aria-hidden", "true");
    });
  };

  window.addEventListener(
    "play",
    (event) => {
      const video = event.target;
      if (!isSignVideo(video)) return;
      prepareSignVideo(video);
      event.stopImmediatePropagation();
    },
    true,
  );

  new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (!(node instanceof Element)) continue;
        if (node instanceof HTMLVideoElement) prepareSignVideo(node);
        node.querySelectorAll?.("video").forEach(prepareSignVideo);
      }
    }
    hideSubmitButtons(document);
    suppressFooterTts(document);
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
  });

  hideSubmitButtons(document);
  suppressFooterTts(document);
})();
