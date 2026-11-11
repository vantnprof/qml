# Authoring workflow

This file documents infrastructure only. It is excluded from the Jupyter Book
table of contents so it never becomes a course page.

## Pages and notebooks

Lecture pages live in `lectures/NN-topic/index.md`. Your written notes, TeX
chapters and notebooks live in `content/` and are attached to a lecture as
children in the `toc` of `myst.yml` (see *Course structure* below). TeX pages
remain valid inputs. New computational material can use Jupyter notebooks
(`.ipynb`) or MyST Markdown pages with executable cells.

Start the locked notebook environment with:

```bash
make lab
```

It includes Qiskit, Qiskit Aer, PennyLane, and the PennyLane-Qiskit adapter.
Use the `python3` kernelspec in committed notebooks. `make check` discovers
notebooks anywhere below `content/` and `lectures/`, validates their format and kernelspec, and
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

## Course structure

The home page (`index.md`) has a hero and a roadmap, followed by one folder
per lecture. The roadmap is grouped into six *layers*:

| Layer | Lectures | Theme |
| --- | --- | --- |
| 1 · Foundations | 00–02 | ML loop and the quantum computer it runs on |
| 2 · Data Meets Hilbert Space | 03–05 | encoding, PQCs, gradients |
| 3 · Quantum Models | 06–09 | classifiers, kernels, hybrid models, QNNs |
| 4 · Dynamics & Generative Models | 10–12 | reservoirs, Born machines, quantum data |
| 5 · Reality Check | 13–15 | barren plateaus, NISQ hardware, scaling |
| 6 · Projects | 16–17 | two projects |

Each lecture page has the same sections: a banner (number and layer), one
**big idea**, learning objectives, **prerequisites** (the concepts a student
should already know), an outline, a warm-up question with a hidden
answer, then Slides, Notebooks, Exercises and Further reading. A section that
is not written yet uses the `coming-soon` block; replace it when you add the
material.

### Adding notes or a notebook to a lecture

Write the notes in `content/` as before (TeX, Markdown or a notebook), then
list the file as a child of its lecture in `myst.yml`:

```yaml
- file: lectures/10-quantum-reservoir-computing/index.md
  children:
    - file: content/Quantum Machine Learning/3a_Quantum_reservoir_computing.tex
```

and link it from the lecture's *Lecture notes* or *Notebooks* section. A file
that is not listed in the `toc` is not published, which is how drafts stay
private. The reservoir computing and QML introduction notes are currently
unlisted for that reason.

### Adding a lecture

Create `lectures/NN-topic/index.md` by copying a neighbour, add it to the `toc`
in `myst.yml` and add a card to the matching `roadmap-grid` in `index.md`.
`npm test` (part of `make test`) checks that the TOC, the roadmap and the
lecture banners agree, that every citation key exists in `bib/bib.bib`, and
that every lecture lists its prerequisites.

### Interactive widgets

Self-contained HTML widgets live in `static/` (for example
`static/bloch-sphere.html` and `static/widgets/reuploading-playground.html`).
Embed one by putting a link to it on a line of its own. In Markdown:

```markdown
[](qml-include:static/widgets/reuploading-playground.html)
```

and in TeX, `\include{static/bloch-sphere.html}`. `plugins/content-includes.mjs`
inlines the file as an iframe `srcdoc`, so the widget works in the preview
without forwarding the content-server port. Widgets should support
`prefers-color-scheme` and size to their content; the plugin resizes the frame.

### Branding

The original logo and cover artwork are preserved in `static/logo_and_cover/`.
The navigation uses a small WebP logo and the favicon a 64px PNG, both
exported from those originals. After replacing the logo, run
`npm run branding` to refresh the inline copy at the end of every stylesheet in
`static/themes/`. This CSS image replacement keeps the image alt text and lets
the logo display when only the main preview port is forwarded over SSH. Only
the generated branding section is rewritten.

## Interface theme

Two themes live in `static/themes/`. Switch by changing `site.options.style`
in `myst.yml`:

| Theme | Look |
| --- | --- |
| `riso.css` (active) | **Riso Superposition**: a risograph zine. Fluorescent pink and riso blue are printed slightly out of register (titles and the key hero word). Large halftone discs overlap in the corner, and there is paper grain, a yellow highlighter for the active page and the big idea, a faint qubit lattice with pulsing entangled pairs, and halftone fields on banners and roadmap boards. Dark mode is a night print with glowing inks. |
| `ink-wire.css` | **Ink & Wire**: sumi ink on washi paper with vermilion accents and quantum-circuit wires, matching the original cover. |

Both share the same class contract (`hero`, `training-log`, `roadmap-grid`,
`phase-N`, `lecture-banner`, `big-idea`, `coming-soon`), so pages do not change
when you switch. Layer colours are the `--phase-1` … `--phase-6` variables. The
riso theme's colours and SVG textures sit in its two token blocks (`:root`
and `.dark`); edit the hex values there. Light and dark modes, reduced motion and
print are handled at the end of each file.

The theme version is pinned in `myst.yml` (`site.template`) because newer theme
releases require a newer Jupyter Book than `uv.lock` provides. Upgrade the two
together.

Keep design changes in those source files rather than editing `_build/`, which
is regenerated. Check changes with `make preview` at narrow and wide browser
sizes and in both colour schemes.

## Publication dates

Every page under `content/` automatically displays a compact `Published` and
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
