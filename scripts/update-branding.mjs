import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const themes = new URL("static/themes/", root);
const begin = "/* BEGIN QML INLINE BRANDING */";
const end = "/* END QML INLINE BRANDING */";
const dataUrl = (name) => `data:image/webp;base64,${readFileSync(new URL(`static/logo_and_cover/${name}`, root)).toString("base64")}`;

// MyST's development theme sends ordinary images to a second localhost port.
// CSS image replacement keeps the original <img> alt text and uses the same
// optimized artwork through the stylesheet, which the page server serves itself.
// Keep the native image path too, for exports and renderers without this CSS.
const generated = `${begin}
:root {
  --qml-logo: url("${dataUrl("qml-logo.webp")}");
}
.myst-home-link-logo img { content: var(--qml-logo); }
${end}\n`;

for (const name of readdirSync(themes).filter((file) => file.endsWith(".css"))) {
  const stylesheet = new URL(name, themes);
  let css = readFileSync(stylesheet, "utf8");
  const start = css.indexOf(begin);
  if (start !== -1) {
    const finish = css.indexOf(end, start);
    if (finish === -1) throw new Error(`Incomplete generated branding section in ${name}`);
    css = css.slice(0, start) + css.slice(finish + end.length);
  }
  writeFileSync(stylesheet, `${css.trimEnd()}\n\n${generated}`);
  console.log(`Updated inline logo in ${fileURLToPath(stylesheet)}`);
}
