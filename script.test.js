
import test from "node:test";
import assert from "node:assert/strict";
import { sortBookmarksDesc } from "./sort.js";

test("sortBookmarksDesc sorts newest first", () => {
  const input = [
    { title: "Old", createdAt: "2020-01-01T00:00:00.000Z" },
    { title: "New", createdAt: "2023-01-01T00:00:00.000Z" },
    { title: "Middle", createdAt: "2021-06-01T00:00:00.000Z" }
  ];

  const result = sortBookmarksDesc(input);

  assert.equal(result[0].title, "New");
  assert.equal(result[1].title, "Middle");
  assert.equal(result[2].title, "Old");

  // Original input unchanged
  assert.deepEqual(input.map(b => b.title), ["Old", "New", "Middle"]);
});
