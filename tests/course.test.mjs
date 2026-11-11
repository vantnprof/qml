import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const config = load(read("myst.yml"));
const lectureDirs = readdirSync(join(root, "lectures")).filter((name) => /^\d\d-/.test(name)).sort();

function tocFiles(entries = config.project.toc) {
  return entries.flatMap((entry) => [...(entry.file ? [entry.file] : []), ...tocFiles(entry.children ?? [])]);
}

test("every table-of-contents entry exists", () => {
  for (const file of tocFiles()) assert.ok(existsSync(join(root, file)), `Missing TOC file: ${file}`);
});

test("every lecture folder is in the table of contents, in order", () => {
  const listed = tocFiles().filter((file) => file.startsWith("lectures/"));
  assert.deepEqual(listed, lectureDirs.map((dir) => `lectures/${dir}/index.md`));
});

test("lecture banners and short titles match the folder number", () => {
  for (const dir of lectureDirs) {
    const page = read(`lectures/${dir}/index.md`);
    const number = dir.slice(0, 2);
    assert.match(page, new RegExp(`^short_title: "${number} · `, "m"), `${dir}: short_title`);
    assert.match(page, new RegExp(`:class: lecture-number\\n${number}\\n`), `${dir}: banner number`);
    assert.match(page, new RegExp(`\\*\\*Lecture ${number}\\*\\*`), `${dir}: banner label`);
  }
});

test("the homepage roadmap links every lecture once, in the same layer as its banner", () => {
  const home = read("index.md");
  const grids = [...home.matchAll(/:class: roadmap-grid phase-(\d)\n([\s\S]*?)\n::::\n/g)];
  const placed = new Map();
  for (const [, phase, body] of grids) {
    for (const [, dir] of body.matchAll(/:link: lectures\/([^/]+)\/index\.md/g)) {
      assert.ok(!placed.has(dir), `${dir} appears twice on the roadmap`);
      placed.set(dir, phase);
    }
  }
  assert.deepEqual([...placed.keys()].sort(), lectureDirs);
  for (const dir of lectureDirs) {
    const phase = read(`lectures/${dir}/index.md`).match(/lecture-banner phase-(\d)/)[1];
    assert.equal(placed.get(dir), phase, `${dir}: roadmap layer differs from banner`);
  }
});

test("every citation key exists in the bibliography", () => {
  const keys = new Set([...read("bib/bib.bib").matchAll(/^@\w+\{([^,]+),/gm)].map((match) => match[1].trim()));
  for (const file of ["index.md", ...lectureDirs.map((dir) => `lectures/${dir}/index.md`)]) {
    for (const [, group] of read(file).matchAll(/\[(@[^\]]+)\]/g)) {
      for (const key of group.split(";").map((part) => part.trim().replace(/^@/, ""))) {
        assert.ok(keys.has(key), `${file}: unknown citation @${key}`);
      }
    }
  }
});

test("every lecture lists prerequisites and the course stands on its own", () => {
  for (const dir of lectureDirs) {
    const page = read(`lectures/${dir}/index.md`);
    assert.match(page, /## 🧩 Prerequisites\n\nYou should already be comfortable with:\n\n- \*\*/, `${dir}: prerequisites`);
  }
  for (const file of ["index.md", "parts/footer.md", "myst.yml", ...lectureDirs.map((dir) => `lectures/${dir}/index.md`)]) {
    assert.doesNotMatch(read(file), /vantnprof\.github\.io\/(python|quantum-computing)/, `${file} links to another course`);
  }
});
