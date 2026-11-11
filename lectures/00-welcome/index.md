---
title: "🧭 Welcome to Quantum Machine Learning"
short_title: "00 · Welcome to QML"
subtitle: "What QML is, what it is not, and how to set up your lab."
---

::::{div}
:class: lecture-banner phase-1

:::{div}
:class: lecture-number
00
:::

:::{div}
:class: lecture-info
**Lecture 00** · Layer 1 — 🧭 Foundations
:::

::::

:::{div}
:class: big-idea
Can we train a machine learning model faster on a quantum computer than on a classical one? This course is a careful, hands-on attempt to answer that question.
:::

## 🎯 Learning objectives

- Place QML on the map of classical/quantum **data** × classical/quantum **processing**
- Recognise the families of quantum models you will build in this course
- Describe the QML pipeline: encode → evolve → measure → learn
- Set up the locked Python environment and run a first circuit in Qiskit and PennyLane

## 🧩 Prerequisites

You should already be comfortable with:

- **Basics of Linux**. The shell you will run `make setup` and `make lab` in.
- **Makefile**. Every lab command in this course is a Makefile target.
- **Python & NumPy for Quantum**. Simulating qubits with NumPy and Qiskit, the starting point for this course.

## 🗺️ What we cover

1. **The question**: can quantum computers learn faster, better or differently?
2. **Four quadrants**: CC, CQ, QC and QQ: who holds the data, and who does the processing
3. **The QML pipeline**: classical data in, quantum state, measurement, classical optimiser
4. **Hype vs evidence**: what a genuine quantum advantage in learning would have to show
5. **Your lab**: uv, JupyterLab, Qiskit, PennyLane and (optionally) CUDA-Q

## 🧭 The course as a circuit

Every lecture is a layer. Each one adds a few new parameters to your understanding.

```{mermaid}
flowchart TB
  subgraph F["Layer 1 · Foundations"]
    direction LR
    L00["00 Welcome"] --> L01["01 ML essentials"] --> L02["02 QC for ML"]
  end
  F --> D
  subgraph D["Layer 2 · Data meets Hilbert space"]
    direction LR
    L03["03 Encoding"] --> L04["04 PQCs"] --> L05["05 Training"]
  end
  D --> M
  subgraph M["Layer 3 · Quantum models"]
    direction LR
    L06["06 Classifiers"] --> L07["07 Kernels"] --> L08["08 Hybrid"] --> L09["09 QNNs"]
  end
  M --> G
  subgraph G["Layer 4 · Dynamics & generative"]
    direction LR
    L10["10 Reservoirs"] --> L11["11 Generative"] --> L12["12 Quantum data"]
  end
  G --> R
  subgraph R["Layer 5 · Reality check"]
    direction LR
    L13["13 Barren plateaus"] --> L14["14 NISQ"] --> L15["15 Scaling up"]
  end
  R --> P["🚀 Projects 16 & 17"]
```

## 🤔 Warm-up

A colleague says *“QML will make every neural network faster.”* Which quadrant are they thinking of, and what would have to be true for the claim to hold?

:::{dropdown} Reveal the answer
They mean **CQ**: classical data processed on a quantum computer. The claim needs three things, and none of them comes for free: an efficient way to **load** the data (loading alone can cancel a speed-up), a model that is actually **trainable**, and a learning problem with real **quantum structure** to exploit. Lectures 03, 13 and 07 cover each of these.
:::

## 📑 Slides

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📓 Notebooks

Start with the workflow notebooks in the [🧰 Lab toolbox](../../content/workflow-examples/workflow-examples.md). They check that every part of your stack runs:

- [Qiskit · Bell state](../../content/workflow-examples/qiskit-bell-state.ipynb)
- [PennyLane · two-qubit circuit](../../content/workflow-examples/pennylane-circuit.ipynb)
- [CUDA-Q · Bell state](../../content/workflow-examples/cudaq-bell-state.ipynb) (optional stack)

## 🧪 Exercises

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📚 Further reading

- [@biamonte2017quantum]: the review that put QML on the map
- [@schuld2021machine]: the course's main textbook
- [@cerezo2022challenges]: a sober look at challenges and opportunities
