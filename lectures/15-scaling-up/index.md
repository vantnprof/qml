---
title: "🚀 Scaling Up: GPUs, CUDA-Q & Cloud QPUs"
short_title: "15 · Scaling Up"
subtitle: "Simulate bigger, train faster, and move work onto accelerators and cloud hardware."
---

::::{div}
:class: lecture-banner phase-5

:::{div}
:class: lecture-number
15
:::

:::{div}
:class: lecture-info
**Lecture 15** · Layer 5 — 🔬 Reality Check
:::

::::

:::{div}
:class: big-idea
Every added qubit doubles the memory a state-vector simulator needs. Plan for that from the start.
:::

## 🎯 Learning objectives

- Benchmark how state-vector simulation cost grows with qubit count
- Run circuits on GPU-accelerated simulators with CUDA-Q
- Batch and parallelise circuit evaluations during training
- Package an experiment so it runs reproducibly in CI or the cloud

## 🧩 Prerequisites

You should already be comfortable with:

- **Multiprocessing**. Use every core for independent circuit evaluations.
- **Docker**. Ship the whole lab as a container.
- **GitHub Actions**. Run experiments automatically on every push.

## 🗺️ What we cover

1. **The memory wall**: $2^n$ amplitudes × 16 bytes
2. **GPU simulation**: CUDA-Q targets and when a GPU pays off
3. **Batching**: parameter broadcasting and parallel shots
4. **Reproducibility**: lockfiles, containers and CI
5. **Cloud QPUs**: queues, costs and job management

## 🤔 Warm-up

How much memory does a 30-qubit state vector need in `complex128`? And 40 qubits?

:::{dropdown} Reveal the answer
$2^{30} \times 16$ B = **16 GiB**, which fits on one large GPU. At 40 qubits it is $2^{40}\times16$ B = **16 TiB**, a cluster's worth. Each extra qubit doubles the requirement.
:::

## 📑 Slides

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📓 Notebooks

- [CUDA-Q · Bell state](../../content/workflow-examples/cudaq-bell-state.ipynb): the portable `qpp-cpu` target, ready to switch to a GPU.

## 🧪 Exercises

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📚 Further reading

- [@bergholm2018pennylane]: PennyLane's device abstraction
- [@cerezo2022challenges]: where scale matters for QML
