import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { basename, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { mystParse } from "myst-parser";
import { TexParser } from "tex-to-myst";
import { VFile } from "vfile";

const root = fileURLToPath(new URL("..", import.meta.url));
export const includeCommand = String.raw`\providecommand{\include}[1]{\href{qml-include:}{included content}}`;
const prefix = "qml-include:";
const hash = (value) => createHash("sha256").update(value).digest("hex").slice(0, 12);
const escape = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function visit(node, fn) {
  fn(node);
  for (const child of node.children ?? []) visit(child, fn);
}

// tex-to-myst currently expands macro bodies without substituting parameters.
// Use a constant marker and read its arguments from the original parsed TeX,
// where comments and verbatim code are already distinguished from commands.
function texIncludes(file) {
  if (extname(file).toLowerCase() !== ".tex") return [];
  const text = readFileSync(file, "utf8");
  const raw = new TexParser(text, new VFile({ path: file })).raw;
  const names = [];
  function walk(node) {
    if (node.type === "macro" && /^(?:providecommand|newcommand|renewcommand|def)$/.test(node.content)) return;
    if (node.type === "macro" && node.content === "include") {
      const parts = node.args?.find((arg) => arg.openMark === "{")?.content;
      if (!parts?.length) throw new Error(`Include in ${file}: expected a file path.`);
      names.push(text.slice(parts[0].position.start.offset, parts.at(-1).position.end.offset).trim().replace(/\\([_%&# ])/g, "$1"));
      return;
    }
    for (const child of Array.isArray(node.content) ? node.content : []) walk(child);
    for (const arg of node.args ?? []) walk(arg);
  }
  walk(raw);
  return names;
}

function resolveInclude(name, source, projectRoot) {
  // Explicit ./ and ../ paths are relative to the draft; otherwise accept a
  // project-relative path first (e.g. content/examples/example.ipynb).
  const candidates = name.startsWith(".")
    ? [resolve(dirname(source), name)]
    : [resolve(projectRoot, name.replace(/^\//, "")), resolve(dirname(source), name)];
  for (const path of candidates) {
    try { if (statSync(path).isFile()) return path; } catch { /* Try next base. */ }
  }
  throw new Error(`Include "${name}" in ${source}: file not found. Tried ${candidates.join(", ")}`);
}

function outputNode(output, id) {
  return { type: "outputs", id, children: [{ type: "output", jupyter_data: output }] };
}

function htmlNode(html, id, title) {
  // Also resize ordinary self-contained HTML files that do not supply their
  // own resize script. srcdoc keeps scripts, styles, and controls on one origin.
  const resize = `<script>(()=>{const f=window.frameElement;if(!f)return;const fit=()=>{f.style.height=Math.ceil(document.body.getBoundingClientRect().height+32)+'px'};new ResizeObserver(fit).observe(document.body);fit()})()</script>`;
  const value = `<iframe title="${escape(title)}" style="display:block;width:100%;height:800px;border:0" srcdoc="${escape(html + resize)}"></iframe>`;
  const node = outputNode({ output_type: "display_data", metadata: {}, data: { "text/html": value } }, id);
  return { type: "div", class: "qml-html-include", children: [node] };
}

function checkMessages(vfile) {
  if (vfile.messages.length) throw new Error(`Include ${vfile.path}: ${vfile.messages.map((m) => m.message).join("; ")}`);
}

function markdown(source, file) {
  const vfile = new VFile({ path: file });
  const tree = mystParse(source, { vfile });
  checkMessages(vfile);
  return tree.children.filter((node) => node.type !== "yaml");
}

function notebookNodes(text, file, id) {
  const notebook = JSON.parse(text);
  if (notebook.nbformat !== 4 || !Array.isArray(notebook.cells)) {
    throw new Error(`Include ${file}: expected a version 4 Jupyter notebook.`);
  }
  return notebook.cells.flatMap((cell, index) => {
    const tags = cell.metadata?.tags ?? [];
    if (tags.includes("remove-cell")) return [];
    const source = Array.isArray(cell.source) ? cell.source.join("") : cell.source ?? "";
    if (cell.cell_type === "markdown") {
      const nodes = markdown(source, file);
      // The surrounding draft supplies the title and section heading.
      if (index === 0 && nodes[0]?.type === "heading" && nodes[0].depth === 1) nodes.shift();
      return nodes;
    }
    if (cell.cell_type === "raw") return [{ type: "code", value: source, lang: "text" }];
    if (cell.cell_type !== "code") throw new Error(`Include ${file}: unknown cell type ${cell.cell_type}.`);
    const nodes = [];
    if (!tags.includes("remove-input")) {
      const code = { type: "code", lang: notebook.metadata?.kernelspec?.language ?? "python", value: source };
      nodes.push(tags.includes("hide-input") ? {
        type: "details", children: [{ type: "summary", children: [{ type: "text", value: "Show code" }] }, code],
      } : code);
    }
    if (!tags.includes("remove-output")) {
      for (const [outputIndex, output] of (cell.outputs ?? []).entries()) {
        if (output.output_type === "error") throw new Error(`Include ${file}: cell ${index + 1} has a saved error. Rerun and save the notebook.`);
        const node = outputNode(output, `${id}-cell-${index}-output-${outputIndex}`);
        if (tags.includes("hide-output")) node.visibility = "hide";
        nodes.push(node);
      }
    }
    return nodes;
  });
}

function namespaceLabels(tree, id) {
  const labels = new Map();
  visit(tree, (node) => {
    for (const key of ["identifier", "label", "html_id"]) {
      if (node[key] && !["crossReference", "cite", "citeGroup"].includes(node.type)) {
        labels.set(node[key], `${id}-${node[key]}`);
        node[key] = `${id}-${node[key]}`;
      }
    }
  });
  visit(tree, (node) => {
    if (node.type === "crossReference") {
      for (const key of ["identifier", "label"]) if (labels.has(node[key])) node[key] = labels.get(node[key]);
    }
    if (node.type === "link" && node.url?.startsWith("#") && labels.has(node.url.slice(1))) node.url = `#${labels.get(node.url.slice(1))}`;
  });
}

// Exported for regression tests. Neither a TOC entry nor a cell label is needed.
export function expandIncludes(tree, source, projectRoot = root) {
  let sequence = 0;
  function expand(parent, currentFile, stack, headingDepth = 1, names = texIncludes(currentFile)) {
    const result = [];
    const nodes = (parent.children ?? []).flatMap((node) => {
      const children = node.type === "paragraph" ? node.children?.filter((child) => !(child.type === "text" && !child.value.trim())) : null;
      return children?.length && children.every((child) => child.type === "link" && child.url?.startsWith(prefix)) ? children : [node];
    });
    for (const node of nodes) {
      if (node.type === "heading") headingDepth = node.depth;
      let name = node.type === "link" && node.url?.startsWith(prefix)
        ? node.url.slice(prefix.length) || names.shift() : node.type === "include" && !node.children?.length ? node.file : null;
      if (name === undefined) throw new Error(`Include in ${currentFile}: could not read the file path from the TeX command.`);
      if (name !== null) {
        const file = resolveInclude(name, currentFile, projectRoot);
        if (stack.includes(file)) throw new Error(`Circular include: ${[...stack, file].join(" -> ")}`);
        const id = `include-${hash(source)}-${sequence++}`;
        const text = readFileSync(file, "utf8");
        let children;
        switch (extname(file).toLowerCase()) {
          case ".html": {
            const title = text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? basename(file);
            children = [htmlNode(text, id, title)];
            break;
          }
          case ".ipynb": children = notebookNodes(text, file, id); break;
          case ".md": children = markdown(text, file); break;
          case ".tex": {
            const vfile = new VFile({ path: file });
            children = new TexParser(`${includeCommand}\n${text}`, vfile).ast.children;
            checkMessages(vfile);
            break;
          }
          default: throw new Error(`Include ${file}: supported extensions are .ipynb, .html, .md, and .tex.`);
        }
        const section = { type: "div", class: "qml-content-include", children };
        namespaceLabels(section, id);
        visit(section, (child) => {
          if (child.type === "heading") child.depth = Math.min(6, headingDepth + child.depth);
          if (["image", "link"].includes(child.type) && child.url && !/^(?:[a-z][a-z\d+.-]*:|#|\/)/i.test(child.url)) {
            child.url = resolve(dirname(file), child.url);
          }
        });
        expand(section, file, [...stack, file], headingDepth);
        result.push(section);
      } else {
        if (node.type === "link" && node.url?.startsWith(prefix)) throw new Error(`Include in ${currentFile} must be on a separate line.`);
        if (node.children) expand(node, currentFile, stack, headingDepth, names);
        result.push(node);
      }
    }
    parent.children = result;
  }
  expand(tree, source, [resolve(source)]);
  // Preserve self-contained rich output through MyST's asset extraction. This
  // prevents live preview from sending readers to a separate content-server port.
  visit(tree, (node) => {
    const data = node.jupyter_data?.data;
    if (!data) return;
    const png = data["image/png"];
    const html = data["text/html"];
    if (png) node.qmlInlineHtml = `<img alt="Notebook figure" style="max-width:100%;height:auto" src="data:image/png;base64,${Array.isArray(png) ? png.join("") : png}">`;
    else if (html) node.qmlInlineHtml = Array.isArray(html) ? html.join("") : html;
  });
}

export function inlineOutputs(tree) {
  visit(tree, (node) => {
    if (!node.qmlInlineHtml) return;
    node.jupyter_data.data["text/html"] = { content_type: "text/html", content: node.qmlInlineHtml };
    delete node.jupyter_data.data["image/png"];
    delete node.qmlInlineHtml;
  });
}

export default {
  name: "Reusable file includes",
  transforms: [
    { name: "content-includes", stage: "document", plugin: () => (tree, file) => expandIncludes(tree, file.path) },
    { name: "include-inline-outputs", stage: "project", plugin: () => (tree) => inlineOutputs(tree) },
  ],
};
