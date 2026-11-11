---
title: "⚛️ Quantum Computing for ML"
short_title: "02 · Quantum Computing for ML"
subtitle: "Qubits, gates and measurements, reread through the lens of a model."
---

::::{div}
:class: lecture-banner phase-1

:::{div}
:class: lecture-number
02
:::

:::{div}
:class: lecture-info
**Lecture 02** · Layer 1 — 🧭 Foundations
:::

::::

:::{div}
:class: big-idea
A quantum model is a function: data goes in through gates, and an expectation value comes out.
:::

## 🎯 Learning objectives

- Write single- and multi-qubit states and evolve them with gates
- Compute expectation values $\langle\psi|O|\psi\rangle$ of Pauli observables
- Explain why an expectation value is a natural output for a model
- Estimate expectation values from finite shots and quantify shot noise

## 🧩 Prerequisites

You should already be comfortable with:

- **Qubits & the Bloch Sphere**. States as points on a sphere: the picture behind every encoding.
- **Measurement**. The Born rule: where every model output comes from.
- **Multi-Qubit Systems & Entanglement**. Tensor products and CNOTs: how qubits talk to each other.
- **Quantum Circuits with Qiskit**. Build, draw and simulate circuits in code.

## 🗺️ What we cover

1. **The qubit**: amplitudes, normalisation and the Bloch sphere
2. **Gates as rotations**: $R_X$, $R_Y$, $R_Z$ and entangling gates as trainable building blocks
3. **Observables**: measuring $Z$, $X$ and their tensor products
4. **Shots**: estimating $\langle O\rangle$ from samples, with error $\propto 1/\sqrt{N}$
5. **From circuit to function**: $x \mapsto \langle O\rangle_x$, the shape of every model ahead

## 🤔 Warm-up

You run a circuit 1000 times and see `0` 620 times and `1` 380 times. Estimate $\langle Z\rangle$ and its standard error.

:::{dropdown} Reveal the answer
$\langle Z\rangle \approx 0.62 - 0.38 = 0.24$. Each shot gives $\pm1$ with variance $1-\langle Z\rangle^2 \approx 0.942$, so the standard error is $\sqrt{0.942/1000} \approx 0.031$. Halving that error costs **four times** as many shots.
:::

## 📝 Lecture notes

- [📝 **Meet the qubit**](<../../content/Quantum computing/1_Quantum_bit.tex>): from complex amplitudes to the Bloch sphere, with an interactive visualisation.

## 📑 Slides

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📓 Notebooks

- [A single qubit with Qiskit](../../content/notebooks/quantum_computing/qiskit-single-qubit.ipynb): prepare a state, read its statevector and plot it on the Bloch sphere.

## 🧪 Exercises

:::{div}
:class: coming-soon
Not yet measured: this section is still in superposition.
:::

## 📚 Further reading

- [@Chuang2010quantumbook]: chapters 2 and 4
