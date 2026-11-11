---
title: "🎯 Variational Quantum Classifiers"
short_title: "06 · Variational Quantum Classifiers"
subtitle: "Your first end-to-end quantum model: encode, rotate, measure, classify."
---

::::{div}
:class: lecture-banner phase-3

:::{div}
:class: lecture-number
06
:::

:::{div}
:class: lecture-info
**Lecture 06** · Layer 3 — 🧠 Quantum Models
:::

::::

:::{div}
:class: big-idea
A classifier you cannot compare against a baseline is not a result yet.
:::

## 🎯 Learning objectives

- Assemble an encoding, ansatz, observable and loss into a classifier
- Train it on a small dataset with PennyLane
- Turn expectation values into class probabilities
- Benchmark honestly against tuned classical baselines

## 🧩 Prerequisites

You should already be comfortable with:

- **Variational Algorithms (VQE & QAOA)**. The variational loop, now with data in it.
- **Quantum Circuits with Qiskit**. Circuits you can inspect and debug.

## 🗺️ What we cover

1. **The VQC recipe**: feature map + ansatz + readout + loss
2. **Readout**: parity, single-qubit and multi-class strategies
3. **Training in PennyLane**: QNodes, autograd and the training loop
4. **Decision boundaries**: what the model actually learned
5. **Fair benchmarking**: baselines, seeds, error bars and tuning budgets

## 🤔 Warm-up

Your VQC reaches 97% on *two moons*. Logistic regression gets 88%, an RBF SVM 99%. What do you report?

:::{dropdown} Reveal the answer
All three numbers, with error bars over several seeds and the same tuning budget for each model. The honest conclusion is *“competitive with a non-linear baseline”*, not *“beats classical ML”*. See [@bowles2024better] for how easily benchmarks mislead.
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

- [@havlicek2019supervised]: quantum-enhanced feature spaces
- [@perezsalinas2020reuploading]: one-qubit universal classifier
- [@bowles2024better]: the subtle art of benchmarking QML
