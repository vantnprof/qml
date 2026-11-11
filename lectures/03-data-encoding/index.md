---
title: "🔌 Encoding Classical Data"
short_title: "03 · Encoding Classical Data"
subtitle: "Basis, amplitude, angle and re-uploading: how a number becomes a quantum state."
---

::::{div}
:class: lecture-banner phase-2

:::{div}
:class: lecture-number
03
:::

:::{div}
:class: lecture-info
**Lecture 03** · Layer 2 — 🔌 Data Meets Hilbert Space
:::

::::

:::{div}
:class: big-idea
A quantum model can only learn what its encoding lets it see.
:::

## 🎯 Learning objectives

- Implement basis, amplitude and angle encoding, and count their qubit and gate costs
- Explain the data-loading bottleneck and why it threatens quantum speed-ups
- Use data re-uploading to build more expressive models
- Connect an encoding to the Fourier frequencies a model can represent

## 🧩 Prerequisites

You should already be comfortable with:

- **Dirac Notation**. Kets and superpositions: the target of every encoding.
- **Single-Qubit Gates**. Rotation gates: the encoders you will use most.

## 🗺️ What we cover

1. **Classical data to quantum information**: the feature map $x \mapsto |\phi(x)\rangle$
2. **Basis encoding**: bitstrings as computational basis states
3. **Amplitude encoding**: $2^n$ numbers in $n$ qubits, and the price paid in circuit depth
4. **Angle encoding**: one feature per rotation, cheap and hardware-friendly
5. **Data re-uploading**: repeat the encoding to unlock higher frequencies

## 🎛️ Play: re-uploading and the Fourier spectrum

A one-qubit model that encodes $x$ with $R_Y(x)$ in $L$ layers can only represent a Fourier series with frequencies up to $L$ [@schuld2021effect]. Move the sliders and watch the spectrum: bars beyond $L$ stay at zero, whatever the weights are.

[](qml-include:static/widgets/reuploading-playground.html)

## 🤔 Warm-up

How many qubits does amplitude encoding need for a 1024-dimensional vector? And angle encoding with one feature per qubit?

:::{dropdown} Reveal the answer
Amplitude encoding needs $\log_2 1024 = 10$ qubits, while angle encoding needs 1024. The saving is not free: preparing an arbitrary amplitude-encoded state generally takes $O(2^n)$ gates, so the cost moves from the width of the circuit to its depth.
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

- [@schuld2021effect]: encoding decides the Fourier spectrum
- [@perezsalinas2020reuploading]: data re-uploading as a universal classifier
- [@lloyd2020embeddings]: training the embedding itself
