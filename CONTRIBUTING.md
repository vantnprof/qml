# Contributing

The writing, notebooks, tutorials, and Manim scenes in this repository are
author-owned content. Infrastructure changes should not invent or rewrite that
material.

## Content conventions

- Add new pages to the `toc` in `myst.yml`; Jupyter Book will not publish an
  unlisted page as part of the navigation.
- Keep existing URLs stable. Prefer lowercase, hyphenated paths without spaces
  for new files.
- Store citations in `bib/bib.bib`.
- Keep notebook examples deterministic and small enough for CPU execution in
  CI. Tag cells that require hardware, credentials, paid services, or long
  runtimes with `skip-execution`.
- Never commit credentials, provider tokens, private backend names, or local
  absolute paths.
- Register publication Manim scenes in `animations/manifest.toml`; do not
  commit `_build/`, Manim intermediates, or `static/generated/` outputs.

## Before opening a pull request

```bash
make check
make test
make build
```

Install local hooks once with `uv run pre-commit install`. For a notebook
change, restart its kernel and run all normal cells from top to bottom before
saving it. CI repeats notebook execution during the strict book build.
