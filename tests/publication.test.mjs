import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { draftFiles, publicNavigation, preparePublication, assertPublicationCurrent, assertNotDraft } from "../scripts/publication.mjs";

test("drafts are omitted, empty sections disappear, and published hidden notebooks remain", () => {
  const toc = [
    { file: "index.tex" },
    { title: "Draft section", children: [{ file: "content/draft.tex" }] },
    { file: "content/notebook.ipynb", hidden: true },
  ];
  assert.deepEqual(publicNavigation(toc, new Set(["content/draft.tex"])), [
    { file: "index.tex" }, { file: "content/notebook.ipynb", hidden: true },
  ]);
  assert.equal(publicNavigation(toc, new Set()).length, 3);
});

test("status typos cannot accidentally publish an article", () => {
  assert.throws(() => draftFiles([{ file: "content/a.tex", status: "darft" }]), /Unknown status/);
});

test("switching draft to published and back updates routes and removes stale output without removing sources", () => {
  const root = mkdtempSync(join(tmpdir(), "qml-publication-"));
  try {
    for (const path of ["metadata", "content", "_build/latex"]) mkdirSync(join(root, path), { recursive: true });
    writeFileSync(join(root, "content/article.tex"), "Article source");
    writeFileSync(join(root, "_build/latex/article.pdf"), "Preserved PDF");
    writeFileSync(join(root, "metadata/navigation.yml"), "toc:\n  - file: index.tex\n  - file: content/article.tex\n");
    const setStatus = (status) => writeFileSync(join(root, "metadata/homepage.json"), JSON.stringify({ articles: [{ file: "content/article.tex", status }] }));

    setStatus("draft");
    assert.throws(() => assertPublicationCurrent(root), /prepare-publication/);
    const draft = preparePublication(root);
    assert.equal(draft.config.project.toc.length, 1);
    assertPublicationCurrent(root);
    assert.throws(() => assertNotDraft(join(root, "content/article.tex"), root), /draft article/);

    setStatus("published");
    assert.throws(() => assertPublicationCurrent(root), /prepare-publication/);
    const published = preparePublication(root);
    assert.equal(published.config.project.toc.length, 2);
    assertNotDraft(join(root, "content/article.tex"), root);
    for (const path of ["_build/html/article", "_build/site/public"]) mkdirSync(join(root, path), { recursive: true });
    writeFileSync(join(root, "_build/html/article/index.html"), "Old published page");
    writeFileSync(join(root, "_build/site/public/article.tex"), "Old downloadable source");

    setStatus("draft");
    preparePublication(root);
    assert.equal(existsSync(join(root, "_build/html/article/index.html")), false);
    assert.equal(existsSync(join(root, "_build/site/public/article.tex")), false);
    assert.equal(readFileSync(join(root, "content/article.tex"), "utf8"), "Article source");
    assert.equal(existsSync(join(root, "_build/latex/article.pdf")), true);
    assert.equal(preparePublication(root).changed, false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
