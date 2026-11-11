---
title: "🔭 Learning from Quantum Data"
short_title: "12 · Learning from Quantum Data"
subtitle: "When the data are quantum states: classical shadows, phases of matter and QQ learning."
---

::::{div}
:class: lecture-banner phase-4

:::{div}
:class: lecture-number
12
:::

:::{div}
:class: lecture-info
**Lecture 12** · Layer 4 — 🌊 Dynamics & Generative Models
:::

::::

:::{div}
:class: big-idea
The most convincing quantum advantages in learning appear when the data are quantum to begin with.
:::

## 🎯 Learning objectives

- Tell classical data loaded into circuits apart from genuinely quantum data
- Build classical shadows from randomised measurements
- Classify phases of matter directly from quantum states
- Explain where provable quantum advantages in learning come from

## 🧩 Prerequisites

You should already be comfortable with:

- **Measurement**. Randomised measurements in different bases.
- **Multi-Qubit Systems & Entanglement**. Many-body states and entanglement.
- **Noise, Decoherence & Error Correction**. Noisy states are quantum data too.

## 🗺️ What we cover

1. **The QQ quadrant**: states from experiments, sensors and simulations
2. **Classical shadows**: predict many properties from few measurements
3. **Learning phases**: QCNNs revisited on many-body states
4. **Quantum-enhanced experiments**: learning with quantum memory
5. **Generalisation**: how few training states are enough

## 🤔 Warm-up

Why can't we simply load a quantum state's $2^n$ amplitudes into a classical neural network?

:::{dropdown} Reveal the answer
There are exponentially many amplitudes, and each measurement returns only $n$ bits. Full tomography needs exponentially many copies of the state. We need compact, efficiently estimable summaries, and classical shadows are one.
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

- [@huang2020shadows]: classical shadows
- [@huang2021power]: the power of data
- [@caro2022generalization]: generalisation from few training data
