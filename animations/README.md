# Manim source workflow

Keep author-written Manim source files in this directory and register only the
scenes that should become publication assets in `manifest.toml`:

```toml
[[scene]]
source = "animations/my_scene.py"
class = "MyScene"
slug = "my-scene"
poster_time = "00:00:00.500"
```

Run `make animations` to render every registered scene at the resolution and
frame rate in `manim.cfg`. The pipeline writes a 1080p60 MP4, a PNG poster, and
a smaller animated GIF preview under `static/generated/`. Those outputs are
build artifacts and are not committed; GitHub Actions recreates them before
building the book.

The `source`, `class`, and `slug` fields are required. `poster_time` is
optional and defaults to `00:00:00.500`.
