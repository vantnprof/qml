import test from "node:test";
import assert from "node:assert/strict";
import { recentArticles, decorateHomepage, articleTable } from "../plugins/homepage.mjs";

test("recent articles exclude hidden, missing, and unpublished pages and sort by update", () => {
  const config = { project: { toc: [
    { file: "older.tex" }, { file: "newer.tex" }, { file: "missing.tex" }, { file: "draft.tex" },
    { hidden: true, children: [{ file: "notebook.ipynb" }] },
  ] } };
  const editorial = { articles: ["older.tex", "newer.tex", "missing.tex", "notebook.ipynb", "draft.tex", "unpublished.tex"].map((file) => ({ file, title: file, status: file === "draft.tex" ? "draft" : "published" })) };
  const result = recentArticles(config, editorial,
    (file) => ({ updated: file === "newer.tex" ? "2026-09-27" : "2026-09-01" }),
    (file) => file !== "missing.tex");
  assert.deepEqual(result.map((article) => article.file), ["newer.tex", "older.tex"]);
});

test("the homepage keeps source links for MyST to resolve and consumes its markers", () => {
  const tree = { children: [{ type: "paragraph", children: [{ type: "link", url: "qml-home:recent" }, { type: "text", value: "\n" }] }] };
  const article = { file: "content/Quantum computing/1_Quantum_bit.tex", title: "A qubit", description: "A description", category: "Quantum computing", format: "Notebook", updated: "2026-09-27" };
  tree.children = [{ type: "block", children: tree.children }];
  decorateHomepage(tree, [article]);
  const serialized = JSON.stringify(tree);
  assert.ok(!serialized.includes("qml-home:"));
  assert.ok(serialized.includes(article.file));
  assert.ok(serialized.includes("Sep 27, 2026"));
  assert.ok(serialized.includes('"type":"table"'));
  assert.ok(!serialized.includes("Published"));
});

test("empty feeds still render a helpful message", () => {
  const tree = { children: [{ type: "paragraph", children: [{ type: "link", url: "qml-home:recent" }] }] };
  decorateHomepage(tree, []);
  assert.match(JSON.stringify(tree), /New articles will appear/);
});

test("the recent table displays no more than six articles", () => {
  const articles = Array.from({ length: 8 }, (_, i) => ({ file: `${i}.tex`, title: `Article ${i}`, category: "Quantum computing", updated: "2026-09-28" }));
  const table = articleTable(articles).children[0];
  assert.equal(table.children.length, 7); // Header plus six articles.
  assert.equal(table.children.at(-1).children[0].children[0].url, "5.tex");
});
