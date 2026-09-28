"""Render author-registered Manim scenes and extract poster frames."""

from __future__ import annotations

import re
import shutil
import subprocess
import sys
import tomllib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "animations" / "manifest.toml"
MEDIA_ROOT = ROOT / "_build" / "manim"
OUTPUT_ROOT = ROOT / "static" / "generated"
SLUG_PATTERN = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*\Z")


def project_path(raw_path: str) -> Path:
    path = (ROOT / raw_path).resolve()
    if path != ROOT and ROOT not in path.parents:
        raise ValueError(f"source escapes the repository: {raw_path}")
    return path


def render(scene: dict[str, object]) -> None:
    missing = {"source", "class", "slug"} - scene.keys()
    if missing:
        raise ValueError(f"scene is missing: {', '.join(sorted(missing))}")

    source = project_path(str(scene["source"]))
    class_name = str(scene["class"])
    slug = str(scene["slug"])
    poster_time = str(scene.get("poster_time", "00:00:00.500"))

    if source.suffix != ".py" or not source.is_file():
        raise ValueError(f"Manim source does not exist: {source.relative_to(ROOT)}")
    if not class_name.isidentifier():
        raise ValueError(f"invalid scene class: {class_name}")
    if not SLUG_PATTERN.fullmatch(slug):
        raise ValueError(f"invalid slug (use lowercase kebab-case): {slug}")

    command = [
        sys.executable,
        "-m",
        "manim",
        "render",
        "--format=mp4",
        "--quality=h",
        "--media_dir",
        str(MEDIA_ROOT),
        "--output_file",
        f"{slug}.mp4",
        str(source),
        class_name,
    ]
    subprocess.run(command, cwd=ROOT, check=True)

    candidates = list(MEDIA_ROOT.rglob(f"{slug}.mp4"))
    if not candidates:
        raise RuntimeError(f"Manim did not produce {slug}.mp4")
    rendered = max(candidates, key=lambda candidate: candidate.stat().st_mtime_ns)

    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    video = OUTPUT_ROOT / f"{slug}.mp4"
    poster = OUTPUT_ROOT / f"{slug}.png"
    preview = OUTPUT_ROOT / f"{slug}.gif"
    shutil.copy2(rendered, video)
    subprocess.run(
        [
            "ffmpeg",
            "-loglevel",
            "error",
            "-y",
            "-ss",
            poster_time,
            "-i",
            str(video),
            "-frames:v",
            "1",
            str(poster),
        ],
        check=True,
    )
    preview_filter = (
        "[0:v]fps=20,scale=960:-1:flags=lanczos,split[preview][palette_source];"
        "[palette_source]palettegen=stats_mode=diff[palette];"
        "[preview][palette]paletteuse=dither=sierra2_4a"
    )
    subprocess.run(
        [
            "ffmpeg",
            "-loglevel",
            "error",
            "-y",
            "-i",
            str(video),
            "-filter_complex",
            preview_filter,
            "-loop",
            "0",
            str(preview),
        ],
        check=True,
    )
    scene_label = f"{source.relative_to(ROOT)}:{class_name}"
    print(f"Rendered {scene_label} -> {video.relative_to(ROOT)}")


def main() -> None:
    data = tomllib.loads(MANIFEST.read_text(encoding="utf-8"))
    scenes = data.get("scene", [])
    if not isinstance(scenes, list):
        raise ValueError("manifest 'scene' value must be an array of tables")
    if not scenes:
        print("No Manim scenes registered; nothing to render")
        return

    for scene in scenes:
        if not isinstance(scene, dict):
            raise ValueError("each manifest scene must be a TOML table")
        render(scene)


if __name__ == "__main__":
    main()
