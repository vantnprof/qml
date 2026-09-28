---
title: Manim Rendering
---

The scene below comes from `animations/workflow_demo.py`. Its class and output
slug are registered in `animations/manifest.toml`, so `make animations` and
the deployment workflow regenerate both the video and poster image.

![Animated preview of the Manim workflow scene](../../static/generated/workflow-demo.gif)

[Open the full 1080p60 MP4 animation](../../static/generated/workflow-demo.mp4)

The animated preview is optimized for reliable inline display. The linked MP4
uses the browser's native video controls, and the PNG with the same slug is
available as a poster or as a fallback for static exports.

The reusable sequence is:

1. Write a `Scene` subclass under `animations/`.
2. Register its source, class, and stable slug in the manifest.
3. Run `make animations`.
4. Reference the generated MP4 and poster from your page.
