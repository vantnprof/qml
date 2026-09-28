import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const metadataPath = resolve(projectRoot, "metadata/page-dates.json");
const dateConfiguration = JSON.parse(readFileSync(metadataPath, "utf8"));
const dateOverrides = dateConfiguration.overrides ?? {};
const displayDate = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function localCalendarDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateDate(value, label) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    throw new Error(`${label} must use the YYYY-MM-DD format; received ${value}.`);
  }

  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid calendar date; received ${value}.`);
  }

  return value;
}

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function fileCreatedDate(sourcePath) {
  const stats = statSync(resolve(projectRoot, sourcePath));
  const hasBirthTime = Number.isFinite(stats.birthtimeMs) && stats.birthtimeMs > 0;
  const created = hasBirthTime && stats.birthtime <= stats.mtime
    ? stats.birthtime
    : stats.mtime;
  return localCalendarDate(created);
}

function firstPublished(sourcePath) {
  const history = git(["log", "--follow", "--format=%aI", "--", sourcePath])
    .split(/\r?\n/)
    .filter(Boolean);
  const published = history.at(-1)?.slice(0, 10) || fileCreatedDate(sourcePath);
  return validateDate(published, `Publication date for ${sourcePath}`);
}

function lastUpdated(sourcePath) {
  const absolutePath = resolve(projectRoot, sourcePath);
  const status = git([
    "status",
    "--porcelain",
    "--untracked-files=all",
    "--",
    sourcePath,
  ]);

  let updated = "";
  if (status) {
    updated = localCalendarDate(statSync(absolutePath).mtime);
  } else {
    const latestCommit = git(["log", "-1", "--format=%aI", "--", sourcePath]);
    updated = latestCommit.slice(0, 10);
  }

  if (!updated) {
    updated = localCalendarDate(statSync(absolutePath).mtime);
  }

  validateDate(updated, `Last-updated date for ${sourcePath}`);
  return updated;
}

export function datesForPage(sourcePath) {
  const overrides = dateOverrides[sourcePath] ?? {};
  const published = overrides.published
    ? validateDate(overrides.published, `Publication-date override for ${sourcePath}`)
    : firstPublished(sourcePath);
  let updated = overrides.last_updated
    ? validateDate(overrides.last_updated, `Last-updated override for ${sourcePath}`)
    : lastUpdated(sourcePath);

  if (updated < published) {
    if (overrides.last_updated) {
      throw new Error(`Last-updated override for ${sourcePath} predates publication.`);
    }
    updated = published;
  }

  return { published, updated };
}

function formatted(value) {
  return displayDate.format(new Date(`${value}T00:00:00Z`));
}

function dateItem(label, value) {
  return {
    type: "paragraph",
    children: [
      {
        type: "strong",
        children: [{ type: "text", value: label }],
      },
      { type: "text", value: ` ${formatted(value)}` },
    ],
  };
}

const pageDatesTransform = {
  name: "page-dates",
  doc: "Add published and last-updated dates to every reader-facing page.",
  stage: "document",
  plugin: () => (mdast, vfile) => {
    const absolutePath = resolve(vfile.path);
    const sourcePath = relative(projectRoot, absolutePath).split(sep).join("/");
    const isReaderPage = sourcePath.startsWith("content/");

    if (!isReaderPage) return;

    const editorial = JSON.parse(readFileSync(resolve(projectRoot, "metadata/homepage.json"), "utf8"));
    if (editorial.articles.some((article) => article.file === sourcePath && article.status === "draft")) return;

    const { published, updated } = datesForPage(sourcePath);

    mdast.children.unshift({
      type: "div",
      class: "qml-page-dates",
      children: [
        dateItem("Published", published),
        dateItem("Last updated", updated),
      ],
    });
  },
};

export default {
  name: "QML page dates",
  transforms: [pageDatesTransform],
};
