---
title: "🕸️ Quantum Neural Networks & QCNNs"
short_title: "09 · Quantum Neural Networks"
subtitle: "Quanvolution, quantum convolutional networks and what “deep” means for a circuit."
---

::::{div}
:class: lecture-banner phase-3

:::{div}
:class: lecture-number
09
:::

:::{div}
:class: lecture-info
**Lecture 09** · Layer 3 — 🧠 Quantum Models
:::

::::

:::{div}
:class: big-idea
Structure beats depth: the most trainable quantum networks borrow locality from CNNs.
:::

## 🎯 Learning objectives

- Build a quanvolutional layer that filters image patches with small circuits
- Construct a QCNN from convolution and pooling layers
- Explain why QCNNs stay trainable while generic deep circuits do not
- Compare network capacity using the effective dimension

## 🧩 Prerequisites

You should already be comfortable with:

- **Multi-Qubit Systems & Entanglement**. Pooling via entangle-then-discard.
- **Quantum Circuits with Qiskit**. Build layered circuits programmatically.

## 🗺️ What we cover

1. **Quanvolution**: small random circuits as convolution filters on image patches
2. **Quantum convolutional neural networks**: convolution, pooling and a shrinking register
3. **Pooling**: measuring or tracing out qubits as downsampling
4. **Trainability**: logarithmic depth and why QCNNs avoid barren plateaus
5. **Capacity**: effective dimension of quantum vs classical networks

## 🤔 Warm-up

A $2\times2$ quanvolution filter encodes a patch into 4 qubits and measures each in $Z$. How many output channels does it produce per patch?

:::{dropdown} Reveal the answer
Four, one expectation value per qubit. A $28\times28$ image with stride 2 becomes a $14\times14\times4$ feature map, ready for a classical CNN.
:::

## 📑 Slides

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📓 Notebooks

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 🧪 Exercises

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📚 Further reading

- [@henderson2020quanvolutional]: quanvolutional neural networks
- [@cong2019qcnn]: quantum convolutional neural networks
- [@abbas2021power]: the power of quantum neural networks
