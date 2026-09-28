# Authoring and publication workflow

This file documents infrastructure only. It is excluded from the Jupyter Book
table of contents so it does not become a blog post.

## Pages and notebooks

Keep book content under `content/` and add it to `toc` in `metadata/navigation.yml`.
The current TeX pages remain valid inputs. New computational material can use
Jupyter notebooks (`.ipynb`) or MyST Markdown pages with executable cells.

Start the locked notebook environment with:

```bash
make lab
```

It includes Qiskit, Qiskit Aer, PennyLane, and the PennyLane-Qiskit adapter.
Use the `python3` kernelspec in committed notebooks. `make check` discovers
notebooks anywhere below `content/`, validates their format and kernelspec, and
rejects saved error outputs or obvious local absolute paths.

The production build executes normal notebook cells. For hardware-only,
credentialed, paid, or deliberately long-running work, add the
`skip-execution` tag to the individual cell and leave a reproducible CPU path
where that makes sense.

## LaTeX build files

Open the repository root as your VS Code workspace. The LaTeX Workshop build
recipe writes PDFs and auxiliary files (`.aux`, `.log`, `.fls`, etc.) to
`_build/latex/`, keeping them out of `content/`. The PDF preview uses that folder
as well. These settings use LaTeX Workshop's
[output directory and recipe options](https://github.com/James-Yu/LaTeX-Workshop/wiki/Compile).

For terminal builds, run `latexmk` from the repository root so it loads
`.latexmkrc`:

```bash
latexmk -pdf "content/Quantum computing/1_Quantum_bit.tex"
```

Direct `pdflatex` commands do not read `.latexmkrc`; pass
`-output-directory=_build/latex` if you use them. The `_build/` folder is ignored
by Git and excluded from the website's content discovery.

## CUDA-Q

On Linux x86-64 or Apple silicon, install and launch the optional environment:

```bash
make setup-cudaq
make cudaq-test
make cudaq-lab
make build-cudaq
```

This keeps the large platform-specific CUDA-Q packages out of the normal CI
job and out of machines that cannot use them. A separate Linux CPU workflow
executes notebook changes with CUDA-Q installed. The smoke check selects
`qpp-cpu`, which does not require an NVIDIA GPU. Use `make doctor` to see
whether CUDA-Q, `nvidia-smi`, and the other optional tools are available.

## Manim

Place your own scene source in `animations/` and register each scene in
`animations/manifest.toml` as described in `animations/README.md`. Then run:

```bash
make setup-animation
make animations
```

The shared `manim.cfg` renders publication scenes at 1920×1080 and 60 fps.
Each registered scene produces a 1080p60 MP4, a PNG poster, and a smaller GIF
preview in `static/generated/`. The directory is ignored because local builds
and GitHub Actions regenerate these assets from source.

Embed the GIF preview with normal Markdown image syntax and link the MP4 for
full-quality playback with native controls. MyST copies and fingerprints both
referenced assets for local and deployed builds. Keep the slug in the manifest
stable after a page links to it.

Manim needs Cairo, Pango, FFmpeg, and a minimal TeX toolchain. On Ubuntu:

```bash
sudo apt-get install build-essential python3-dev libcairo2-dev \
  libpango1.0-dev pkg-config ffmpeg texlive-latex-base \
  texlive-fonts-recommended texlive-latex-extra dvisvgm
```

The GitHub workflows install the same packages automatically.

## Homepage and recent articles

Edit the website bio in `index.tex`. The `qml-home:recent` link is a build
marker: `plugins/homepage.mjs` replaces it with a recent-articles table using
native MyST links.

When an article is ready to appear on the homepage, add its source path, title,
and category to `metadata/homepage.json`. It must
also have a visible file entry in `metadata/navigation.yml`. Hidden notebooks, unfinished
chapters without an editorial entry, entries with `"status": "draft"`, and
missing files are omitted. The recent table shows up to six entries,
sorted by the update dates from `plugins/page-dates.mjs`; it refreshes on every
site build and is not a real-time broadcast. Date overrides remain in
`metadata/page-dates.json`.

### Draft and published articles

Set an article's `status` in `metadata/homepage.json`:

```json
"status": "draft"
```

A draft stays in the repository for editing, but is excluded from the website:
no article page, navigation link, search entry, or recent-articles entry. Set
`"status": "published"` to publish it. Existing entries without a status default
to published; use an explicit status for new articles. The hidden Qiskit notebook
remains a published page accessible through its article link.

`make preview`, `make build`, `make build-fast`, and `make build-cudaq` apply the
switch automatically, including in the deployment workflow. After changing a
status while previewing, stop the preview and run `make preview` again. To use
Jupyter Book commands directly, run `make prepare-publication` first. The plugin
rejects stale publication settings and references or includes of draft files.

The full navigation order lives in `metadata/navigation.yml`.
`metadata/published.yml` is generated; do not edit it. When publication settings
change, generated website output and its content cache are cleared so old draft
pages and downloads cannot remain in the next deployment. Source files, notebooks,
and LaTeX build output are preserved. When publishing an article, set its actual
publication date in `metadata/page-dates.json` if needed.

The original logo and cover are preserved in `static/logo_and_cover/`.
The homepage uses a 1920px WebP cover, the navigation uses a small WebP logo,
and the favicon uses a 64px PNG, all exported from those originals without
changing their artwork. Update these web exports when replacing the originals.
Then run `npm run branding` to refresh the inline copies in `static/site.css`.
These CSS image replacements retain the image alt text and let the logo and
cover display when only the main preview port is forwarded over SSH. The native
image paths remain available to other exports. Only the generated branding
section at the end of the stylesheet is rewritten by this command.

## Interface theme

The site uses the standard Jupyter Book 2 `book-theme` with a small,
dependency-free presentation layer in `static/site.css`. Its warm paper,
indigo, ink, and vermilion tokens support both light and dark modes, compact
mobile navigation, a restrained prose measure, visible keyboard focus,
reduced-motion preferences, and a clean print view. The logo and cover artwork
and their web exports are in `static/logo_and_cover/`.

Reader-facing prose and media use CSS selection/drag deterrence, while inline
code and code cells remain selectable and keep their copy buttons. This is a
presentation safeguard rather than digital rights management: text delivered
to a browser can still be recovered by a technically capable reader.

Keep design changes in those source files rather than editing `_build/`, which
is regenerated. Check changes with `make preview` at narrow and wide browser
sizes and in both color schemes. A strict build validates that Jupyter Book can
find and package the stylesheet and mark for local and GitHub Pages URLs.

## Interactive Bloch sphere

`static/bloch-sphere.html` contains the standalone HTML, CSS, SVG, and JavaScript
for the qubit visualization. Open it directly in a browser to edit or reuse it;
it has no external dependencies. Its three sliders control the polar angle
theta, relative phase phi, and global phase gamma. The complex amplitudes include
gamma, while the Bloch coordinates and measurement probabilities do not.

`plugins/bloch-sphere.mjs` inserts the widget immediately after the paragraph
containing “Bloch sphere representation of a qubit” in the Quantum Computing
content directory. It follows the paragraph even if the chapter is renamed.
This leaves the TeX source usable for normal LaTeX compilation. If that
sentence changes, update the plugin's anchor as well. The plugin includes the
repository-owned HTML directly as an iframe `srcdoc` in a MyST rich HTML output.
This avoids the preview server's static-file redirect to port 3100, so readers
only need access to the main preview port (normally 3000). No notebook execution
or kernel is required. Restart `make preview` after changing the plugin or widget.
The standalone HTML is also copied through `project.static_files` in `myst.yml`.
The `.qml-bloch-sphere` rules in `static/site.css` and the widget's resize observer
let the embedded figure fit its content on desktop and mobile.

## Qiskit example notebook

`content/examples/qiskit-single-qubit.ipynb` contains the executable single-qubit
example and its saved circuit drawing, printed statevectors, and Bloch plots.
Edit `alpha` and `beta` in the preparation cell, then restart the notebook kernel
and run all cells to refresh the saved outputs. The amplitudes must be normalized.

`plugins/qiskit-example.mjs` embeds the labeled notebook cells, in notebook order,
under `\paragraph{Example with Qiskit}` in
`content/Quantum computing/1_Quantum_bit.tex`. MyST resolves the native cell
embeds from the notebook listed in the table of contents, retaining both inputs
and outputs. Keep the cell metadata `label` fields when editing or adding cells
to the embedded example. Restart `make preview` after changing the plugin.
The page shows saved results; changing Python values requires running the notebook
in Jupyter. The production build also executes the notebook.
The plugin keeps this example's PNG plots inline, so previewing them does not
require forwarding MyST's separate content-server port.

## Publication dates

Every content article automatically displays a compact `Published` and
`Last updated` line beneath its title. There is no date field to maintain when
adding a page: `Published` uses its earliest Git history, while `Last updated`
uses its newest commit. For an untracked page, the publication fallback is its
filesystem creation date; a locally modified page uses its modification date
for `Last updated` so the preview reflects work in progress.

If the editorial dates differ from the repository history, add either or both
optional overrides in `metadata/page-dates.json` using `YYYY-MM-DD`:

```json
{
  "overrides": {
    "content/path/to-page.md": {
      "published": "2026-09-06",
      "last_updated": "2026-09-08"
    }
  }
}
```

Invalid dates, or an overridden update that predates publication, stop the
strict build with a clear error. CI checks out full Git history so automatic
per-page dates remain correct on the published site. The transform applies the
same rules to TeX, Markdown, and notebook sources.

## Dependencies and CI

Change requirements in `pyproject.toml`, then regenerate and verify the lock:

```bash
uv lock
uv lock --check
```

Do not install notebook dependencies ad hoc with `pip`, because CI uses only
the checked-in project metadata and lockfile. Dependabot opens scheduled
updates for both Python packages and GitHub Actions; quantum adapter constraints
still need to be reviewed as a compatible set.

Pull requests run linting, stack tests, Manim rendering, notebook execution,
and a strict Jupyter Book 2 build. The deployment workflow repeats those checks
on `main` and publishes `_build/html` through GitHub Pages.
