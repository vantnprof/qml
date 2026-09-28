"""Print a concise capability report for the local authoring environment."""

from __future__ import annotations

import importlib.metadata
import platform
import shutil

PACKAGES = {
    "Jupyter Book": "jupyter-book",
    "Qiskit": "qiskit",
    "Qiskit Aer": "qiskit-aer",
    "PennyLane": "pennylane",
    "PennyLane-Qiskit": "pennylane-qiskit",
    "CUDA-Q": "cudaq",
    "Manim": "manim",
}


def package_version(distribution: str) -> str:
    try:
        return importlib.metadata.version(distribution)
    except importlib.metadata.PackageNotFoundError:
        return "not installed"


def main() -> None:
    print(f"Python: {platform.python_version()} ({platform.platform()})")
    for label, distribution in PACKAGES.items():
        print(f"{label}: {package_version(distribution)}")

    for executable in ("node", "ffmpeg", "latex", "dvisvgm", "nvidia-smi"):
        status = shutil.which(executable) or "not found"
        print(f"{executable}: {status}")


if __name__ == "__main__":
    main()
