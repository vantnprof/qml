"""Validate any notebooks the author adds to the book."""

from __future__ import annotations

from pathlib import Path

import nbformat

ROOT = Path(__file__).resolve().parents[1]
CONTENT_ROOTS = (ROOT / "content", ROOT / "lectures")


def main() -> None:
    problems: list[str] = []
    notebooks = sorted(
        path
        for root in CONTENT_ROOTS
        for path in root.rglob("*.ipynb")
        if ".ipynb_checkpoints" not in path.parts
    )

    if not notebooks:
        print("No notebooks found; nothing to validate")
        return

    for path in notebooks:
        notebook = nbformat.read(path, as_version=4)
        try:
            nbformat.validate(notebook)
        except nbformat.ValidationError as error:
            problems.append(f"{path.relative_to(ROOT)}: {error.message}")
            continue

        relative_path = path.relative_to(ROOT)
        kernelspec = notebook.metadata.get("kernelspec", {})

        if kernelspec.get("name") != "python3":
            problems.append(f"{relative_path}: kernelspec must be python3")

        for index, cell in enumerate(notebook.cells, start=1):
            for output in cell.get("outputs", []):
                if output.get("output_type") == "error":
                    problems.append(f"{relative_path}: cell {index} contains an error")

            source = cell.get("source", "")
            if "/home/" in source or "/Users/" in source:
                problems.append(
                    f"{relative_path}: cell {index} contains an absolute local path"
                )

    if problems:
        raise SystemExit("Notebook validation failed:\n- " + "\n- ".join(problems))

    print(f"Validated {len(notebooks)} notebook(s)")


if __name__ == "__main__":
    main()
