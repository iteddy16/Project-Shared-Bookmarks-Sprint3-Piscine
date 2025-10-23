// sort.js
/**
 * Sort bookmarks in reverse chronological order (newest first)
 * @param {Array} bookmarks
 * @returns {Array} sorted array
 */
export function sortBookmarksDesc(bookmarks = []) {
  return [...bookmarks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
