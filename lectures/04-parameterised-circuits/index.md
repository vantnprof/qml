---
title: "🎛️ Parameterised Quantum Circuits"
short_title: "04 · Parameterised Quantum Circuits"
subtitle: "Ansätze, expressibility and entanglement: the architecture of a quantum model."
---

::::{div}
:class: lecture-banner phase-2

:::{div}
:class: lecture-number
04
:::

:::{div}
:class: lecture-info
**Lecture 04** · Layer 2 — 🔌 Data Meets Hilbert Space
:::

::::

:::{div}
:class: big-idea
Encoding, trainable unitary, observable: three choices that define every variational model.
:::

## 🎯 Learning objectives

- Build a model $f_\theta(x) = \langle\psi(x,\theta)|O|\psi(x,\theta)\rangle$
- Compare hardware-efficient, layered and problem-inspired ansätze
- Quantify expressibility and entangling capability
- Weigh circuit depth against noise and trainability

## 🧩 Prerequisites

You should already be comfortable with:

- **Variational Algorithms (VQE & QAOA)**. VQE and QAOA: the same ansatz idea, applied to physics problems.
- **Multi-Qubit Systems & Entanglement**. Entangling layers and the correlations they create.

## 🗺️ What we cover

1. **Anatomy of a model**: encoding → trainable unitary $W(\theta)$ → observable $O$
2. **The ansatz zoo**: hardware-efficient, strongly entangling, tree and QAOA-style circuits
3. **Expressibility**: how much of Hilbert space a circuit family can reach
4. **Entangling capability**: measuring how much entanglement a circuit creates
5. **Linear models in disguise**: $f_\theta(x) = \mathrm{Tr}[\rho(x)\,O_\theta]$, a preview of kernels

## 🤔 Warm-up

Your model measures $O = Z$. Why can it never output 1.7, and how would you fix that for a regression task?

:::{dropdown} Reveal the answer
The eigenvalues of $Z$ are $\pm1$, so $\langle Z\rangle \in [-1, 1]$. Either rescale the target, or add a trainable classical scale and bias, $\hat y = a\,\langle Z\rangle + b$. Lecture 08 makes this kind of classical post-processing systematic.
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

- [@benedetti2019pqc]: PQCs as machine learning models
- [@sim2019expressibility]: expressibility and entangling capability
- [@cerezo2021vqa]: review of variational quantum algorithms
