(function () {
  "use strict";

  const shell = document.getElementById("book-interactive-shell");
  const page = document.getElementById("content");
  if (!shell || !page) return;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "book-page-mode-toggle";
  toggle.textContent = "Fanya zoezi";
  toggle.setAttribute("aria-pressed", "false");
  document.body.append(toggle);

  const controls = Array.from(shell.querySelectorAll("textarea, input, select"));
  controls.forEach((control, index) => {
    const key = `adt:activity:${location.pathname}:${control.dataset.activityItem || control.name || index}`;
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      if (control.type === "radio" || control.type === "checkbox") {
        control.checked = saved === control.value;
      } else {
        control.value = saved;
      }
    }
    control.addEventListener("input", () => {
      localStorage.setItem(key, control.type === "radio" || control.type === "checkbox" ? control.value : control.value);
    });
    control.addEventListener("change", () => {
      localStorage.setItem(key, control.type === "radio" || control.type === "checkbox" ? control.value : control.value);
    });
  });

  toggle.addEventListener("click", () => {
    const opening = shell.hidden;
    shell.hidden = !opening;
    shell.setAttribute("aria-hidden", String(!opening));
    page.classList.toggle("book-pdf-page-hidden", opening);
    toggle.textContent = opening ? "Rudi kwenye kitabu" : "Fanya zoezi";
    toggle.setAttribute("aria-pressed", String(opening));
    if (opening) shell.querySelector("button, input, textarea, select")?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
