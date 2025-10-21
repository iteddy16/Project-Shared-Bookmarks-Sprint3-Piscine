// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";


/* ---------- DOM wiring ---------- */

const userSelect = document.getElementById("userSelect");



/** render user dropdown */

function initUserDropdown() {
  const users = getUserIds();
  // ensure 5 users returned (requirement)
  userSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- select user --";
  userSelect.appendChild(defaultOption);

  users.forEach((id) => {
    const opt = document.createElement("option");
    opt.value = id;
    opt.textContent = `User ${id}`;
    userSelect.appendChild(opt);
  });
}


/* Initialize on load */
window.addEventListener("DOMContentLoaded", () => {
  initUserDropdown();
  // friendly initial message
  bookmarksContainer.innerHTML = `<p>Please select a user to view bookmarks.</p>`;
});