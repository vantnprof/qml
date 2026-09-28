import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { datesForPage } from "./page-dates.mjs";
import { publicationConfig } from "../scripts/publication.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const text = (value) => ({ type: "text", value });
const paragraph = (value) => ({ type: "paragraph", children: [text(value)] });
const div = (className, children) => ({ type: "div", class: className, children });
const link = (url, title) => ({ type: "link", url, children: [text(title)] });
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

// The editorial list keeps unfinished chapters and supporting notebooks out of
// the feed. TOC visibility is checked as well, so hidden pages stay hidden.
export function recentArticles(config, editorial, getDates = datesForPage, fileExists = (file) => existsSync(resolve(root, file))) {
  const visible = new Set();
  function visit(entries, hidden = false) {
    for (const entry of entries ?? []) {
      const excluded = hidden || entry.hidden;
      if (entry.file && !excluded) visible.add(entry.file);
      visit(entry.children, excluded);
    }
  }
  visit(config.project?.toc);
  const seen = new Set();
  return editorial.articles.filter((article) => {
    if (seen.has(article.file)) throw new Error(`Duplicate homepage article: ${article.file}`);
    seen.add(article.file);
    return article.status !== "draft" && visible.has(article.file) && fileExists(article.file);
  }).map((article) => ({ ...article, ...getDates(article.file) }))
    .sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title));
}

export function articleTable(articles) {
  const cell = (children, header = false) => ({ type: "tableCell", header, children });
  const row = (children) => ({ type: "tableRow", children });
  return div("qml-recent-table", [{
    type: "table",
    children: [
      row(["Article", "Topic", "Updated"].map((label) => cell([text(label)], true))),
      ...articles.slice(0, 6).map((article) => row([
        cell([link(article.file, article.title)]),
        cell([text(article.category)]),
        cell([text(dateFormat.format(new Date(`${article.updated}T00:00:00Z`)))]),
      ])),
    ],
  }]);
}

export function decorateHomepage(tree, articles) {
  const children = [
    div("qml-home-masthead", [paragraph("QUBITS / CIRCUITS / LEARNING"), paragraph("Notes by Van Tien Nguyen")]),
    div("qml-home-cover", [{ type: "image", url: "static/logo_and_cover/qml-cover.webp", alt: "Quantum Machine Learning — an ink illustration of a Bloch sphere above quantum circuits and clouds." }]),
  ];
  // The TeX parser groups sections into transparent block nodes.
  const flattenBlocks = (nodes) => nodes.flatMap((node) => node.type === "block" ? flattenBlocks(node.children ?? []) : [node]);
  for (const node of flattenBlocks(tree.children)) {
    const meaningful = node.children?.filter((child) => !(child.type === "text" && !child.value.trim()));
    const marker = node.type === "paragraph" && meaningful?.length === 1 ? meaningful[0].url : null;
    if (marker === "qml-home:recent") {
      children.push(articles.length ? articleTable(articles) : paragraph("New articles will appear here as the collection grows."));
    } else {
      children.push(node);
    }
  }
  tree.children = [div("qml-home", children)];
}

export default {
  name: "QML homepage",
  transforms: [{
    name: "homepage",
    stage: "document",
    plugin: () => (tree, file) => {
      if (resolve(file.path) !== resolve(root, "index.tex")) return;
      const config = publicationConfig();
      const editorial = JSON.parse(readFileSync(resolve(root, "metadata/homepage.json"), "utf8"));
      decorateHomepage(tree, recentArticles(config, editorial));
    },
  }],
};
