---
title: Workflow Examples
---

These small examples demonstrate how this repository executes quantum
notebooks and publishes Manim media. They are isolated from the main chapters
and can be replaced or removed when you no longer need them.

- **Qiskit:** build and sample a Bell-state circuit with Aer.
- **PennyLane:** evaluate a two-qubit circuit on `default.qubit`.
- **CUDA-Q:** run a Bell-state kernel with the portable `qpp-cpu` target.
- **Manim:** render a registered scene and embed its generated video.

Use `make lab` for the Qiskit and PennyLane notebooks. Use `make cudaq-lab`
for the CUDA-Q notebook, and `make animations` to regenerate the Manim media.
