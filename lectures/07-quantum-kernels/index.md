---
title: "🧲 Quantum Kernels & Support Vector Machines"
short_title: "07 · Quantum Kernels"
subtitle: "Measure similarity in Hilbert space and let a classical SVM do the rest."
---

::::{div}
:class: lecture-banner phase-3

:::{div}
:class: lecture-number
07
:::

:::{div}
:class: lecture-info
**Lecture 07** · Layer 3 — 🧠 Quantum Models
:::

::::

:::{div}
:class: big-idea
Every variational model is secretly a kernel method. Sometimes it is better to say so explicitly.
:::

## 🎯 Learning objectives

- Define the quantum kernel $k(x,x') = |\langle\phi(x)|\phi(x')\rangle|^2$
- Estimate kernel entries with the compute–uncompute circuit
- Train an SVM on a precomputed quantum kernel matrix
- Explain exponential kernel concentration and how bandwidth helps

## 🧩 Prerequisites

You should already be comfortable with:

- **Measurement**. Kernel entries are probabilities of measuring all zeros.
- **Quantum Circuits with Qiskit**. Compose $U(x)$ with $U(x')^\dagger$ in code.

## 🗺️ What we cover

1. **Feature maps and kernels**: inner products in a space you never write down
2. **Quantum kernel estimation**: the compute–uncompute and swap-test circuits
3. **SVMs with precomputed kernels**: scikit-learn does the optimisation
4. **Models are kernels**: why variational classifiers live in a kernel's feature space
5. **Concentration**: why kernel values flatten out, and the fixes: bandwidth and projected kernels

## 🤔 Warm-up

In the circuit $U(x')^\dagger U(x)|0\rangle$, the probability of which outcome equals the kernel $k(x, x')$?

:::{dropdown} Reveal the answer
The all-zeros outcome: $P(0\ldots0) = |\langle 0|U(x')^\dagger U(x)|0\rangle|^2 = |\langle\phi(x')|\phi(x)\rangle|^2$. Estimating it to precision $\varepsilon$ takes about $1/\varepsilon^2$ shots per entry, and there are $N^2$ entries.
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

- [@havlicek2019supervised]: quantum kernel estimation on hardware
- [@schuld2019feature]: QML in feature Hilbert spaces
- [@schuld2021kernel]: supervised QML models are kernel methods
- [@huang2021power]: the power of data, and projected kernels
