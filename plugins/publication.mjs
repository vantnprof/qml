import { dirname, resolve } from "node:path";
import { assertPublicationCurrent, assertNotDraft, projectRoot } from "../scripts/publication.mjs";

// Direct Jupyter Book commands must not silently use an outdated publication list.
assertPublicationCurrent();

export default {
  name: "Publication status",
  transforms: [{
    name: "exclude-draft-references",
    stage: "document",
    plugin: () => (tree, file) => {
      assertPublicationCurrent();
      assertNotDraft(file.path);
      function visit(node) {
        for (const value of [node.url, node.file]) {
          if (!value || /^(?:[a-z][a-z\d+.-]*:|#)/i.test(value)) continue;
          const local = decodeURIComponent(value.split(/[?#]/)[0]);
          assertNotDraft(resolve(dirname(file.path), local));
          assertNotDraft(resolve(projectRoot, local.replace(/^\//, "")));
        }
        for (const child of node.children ?? []) visit(child);
      }
      visit(tree);
    },
  }],
};
