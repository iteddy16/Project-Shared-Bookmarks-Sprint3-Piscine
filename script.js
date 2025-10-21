// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";

/**
 * Sort bookmarks in reverse chronological order (newest first) by createdAt ISO string
 * @param {Array} bookmarks
 * @returns {Array} new sorted array
 */
export function sortBookmarksDesc(bookmarks = []) {
  // defensive copy & sort
  return [...bookmarks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Add a bookmark object for a given userId.
 * Ensures data shape: { title, url, description, createdAt }
 * Returns the updated array of bookmarks for the user.
 *
 * @param {string} userId
 * @param {{title:string,url:string,description:string}} bookmark
 * @returns {Array} updated bookmarks array
 */
export function addBookmarkForUser(userId, bookmark) {
  if (!userId) throw new Error("userId is required");
  if (!bookmark || !bookmark.title || !bookmark.url || !bookmark.description) {
    throw new Error("bookmark must have title, url and description");
  }

  const existing = getData(userId) || [];
  const newBookmark = {
    title: bookmark.title,
    url: bookmark.url,
    description: bookmark.description,
    createdAt: new Date().toISOString()
  };
  existing.push(newBookmark);
  setData(userId, existing);
  return sortBookmarksDesc(existing);
}

/* ---------- DOM wiring ---------- */

const userSelect = document.getElementById("userSelect");
const bookmarksContainer = document.getElementById("bookmarksContainer");
const bookmarkForm = document.getElementById("bookmarkForm");
const urlInput = document.getElementById("urlInput");
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");

let currentUser = "";

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

/** render bookmarks list for currentUser */
function renderBookmarksList(bookmarks) {
  bookmarksContainer.innerHTML = "";
  if (!bookmarks || bookmarks.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No bookmarks found for this user.";
    bookmarksContainer.appendChild(p);
    return;
  }

  const list = document.createElement("div");
  list.setAttribute("role", "list");
  bookmarks.forEach((b) => {
    const item = document.createElement("div");
    item.setAttribute("role", "listitem");

    const link = document.createElement("a");
    link.href = b.url;
    link.textContent = b.title;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const titleWrapper = document.createElement("div");
    titleWrapper.appendChild(link);

    const desc = document.createElement("p");
    desc.textContent = b.description;

    const ts = document.createElement("div");
    ts.textContent = `Created: ${new Date(b.createdAt).toLocaleString()}`;

    item.appendChild(titleWrapper);
    item.appendChild(desc);
    item.appendChild(ts);
    list.appendChild(item);
    // small separator for clarity (no CSS)
    list.appendChild(document.createElement("hr"));
  });

  bookmarksContainer.appendChild(list);
}

/** load and show bookmarks for selected user */
function loadAndShowUserBookmarks(userId) {
  const data = getData(userId) || [];
  const sorted = sortBookmarksDesc(data);
  renderBookmarksList(sorted);
}

/* Events */
userSelect.addEventListener("change", (e) => {
  currentUser = e.target.value;
  if (!currentUser) {
    bookmarksContainer.innerHTML = `<p>Please select a user to view bookmarks.</p>`;
    return;
  }
  loadAndShowUserBookmarks(currentUser);
});

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentUser) {
    // accessible alert: focus to select
    alert("Please select a user before adding a bookmark.");
    userSelect.focus();
    return;
  }
  const url = urlInput.value.trim();
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  // Basic validation: HTML required attributes already enforce non-empty, but double-check
  if (!url || !title || !description) {
    alert("Please fill in URL, title and description.");
    return;
  }

  // Add bookmark using exported function (keeps tests meaningful)
  try {
    const updated = addBookmarkForUser(currentUser, { title, url, description });
    // show updated list
    renderBookmarksList(updated);
    // reset form but keep focus on title for quick additional input
    bookmarkForm.reset();
    titleInput.focus();
  } catch (err) {
    console.error(err);
    alert("Failed to add bookmark: " + err.message);
  }
});


/* Initialize on load */
window.addEventListener("DOMContentLoaded", () => {
  initUserDropdown();
  // friendly initial message
  bookmarksContainer.innerHTML = `<p>Please select a user to view bookmarks.</p>`;
});