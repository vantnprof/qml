# Quantum Machine Learning

This repository keeps the author's Jupyter Book content separate from the
tooling used to execute, validate, visualize, and publish it. The existing TeX
pages remain author-controlled. Small, removable examples under
`content/workflow-examples/` demonstrate each supported workflow.

## Quick start

Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and
Node.js 22, then run:

```bash
make setup
make preview
```

`make setup` creates a locked Python 3.11 environment with Jupyter Book 2,
JupyterLab, Qiskit, PennyLane, PennyLane-Qiskit, and Qiskit Aer. The lockfile is
the reproducibility boundary for local development and CI.

## Optional tools

```bash
make setup-animation  # add Manim
make setup-cudaq      # add CUDA-Q on a supported host
make setup-all        # install both optional stacks
make doctor           # report local package/tool/GPU availability
```

CUDA-Q is isolated as an optional dependency because its supported wheels are
platform-specific and substantially larger than the normal authoring stack.
The default CUDA-Q check uses its portable CPU target; GPU targets can be used
locally when the host has a compatible NVIDIA driver and runtime.

The locked compatibility pair is PennyLane 0.45.x with Qiskit 2.3.0. The
PennyLane-Qiskit 0.45 adapter currently declares `qiskit<=2.3.0`, so those
packages should be upgraded together rather than independently.

## Daily workflow

```bash
make lab          # author and run notebooks
make cudaq-lab    # author with CUDA-Q available
make build-cudaq  # execute the book with CUDA-Q available
make animations   # render scenes listed in animations/manifest.toml
make check        # verify lockfile, Python, and all content notebooks
make test         # verify Qiskit/PennyLane integration
make build        # strict executed production build
make build-fast   # fast build using saved notebook outputs
```

`make preview` starts the Jupyter Book development server. Pull requests run
the checks and a production-equivalent build; pushes to `main` deploy the same
artifact to GitHub Pages.

Article visibility is controlled in `metadata/homepage.json`: set
`"status": "draft"` to keep an article out of the website, or
`"status": "published"` to include it. The source remains editable under
`content/`. Preview and build commands apply these settings automatically;
restart the preview after changing a status. Keep the full page order in
`metadata/navigation.yml`; `metadata/published.yml` is generated.

CUDA-Q notebook changes also run through a separate Linux CPU validation
workflow. It installs the optional CUDA-Q stack and executes the book without
requiring that large platform-specific dependency in every normal CI job.

## Repository design

```text
content/                 author-owned chapters and notebooks
animations/              author-owned Manim sources + render manifest
static/generated/        generated MP4/poster files (ignored)
static/site.css           hand-maintained book interface and color system
static/qml-mark.svg       source logo and favicon
bib/                     author-owned bibliography
metadata/page-dates.json optional editorial date overrides
plugins/page-dates.mjs    automatic date presentation and Git updates
scripts/                 validation and rendering automation
tests/                   environment compatibility checks
docs/                    workflow documentation (outside the book TOC)
myst.yml                 Jupyter Book 2 project, site, and TOC config
pyproject.toml            dependency groups and tool configuration
uv.lock                  exact cross-platform dependency resolution
```

See [the workflow guide](docs/AUTHORING.md) for adding your own notebooks and
Manim scenes, and [CONTRIBUTING.md](CONTRIBUTING.md) for repository checks.
