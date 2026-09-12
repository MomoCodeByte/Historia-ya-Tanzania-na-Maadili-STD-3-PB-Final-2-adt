(function () {
  "use strict";

  // The inline bundle is only needed when the book is opened directly from
  // disk. Online readers use deployed files so the controls can start quickly.
  if (location.protocol !== "file:") return;
  document.write('<script src="./assets/offline-preloader-data.js"><\/script>');
})();