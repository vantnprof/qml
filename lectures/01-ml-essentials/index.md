---
title: "📈 Machine Learning Essentials"
short_title: "01 · Machine Learning Essentials"
subtitle: "Data, models, losses and gradients: the classical half of QML."
---

::::{div}
:class: lecture-banner phase-1

:::{div}
:class: lecture-number
01
:::

:::{div}
:class: lecture-info
**Lecture 01** · Layer 1 — 🧭 Foundations
:::

::::

:::{div}
:class: big-idea
Every quantum model in this course is still trained by a classical optimiser minimising a classical loss. Learn that loop first.
:::

## 🎯 Learning objectives

- Describe the data → model → loss → optimiser loop
- Tell supervised from unsupervised learning, and regression from classification
- Train linear and logistic regression with gradient descent in NumPy
- Explain overfitting and why test data must stay untouched

## 🧩 Prerequisites

You should already be comfortable with:

- **Complex Numbers & Linear Algebra**. Vectors, matrices and inner products: the language of models too.
- **List, Tuple, Dictionary & Heap**. Arrays, lists and dictionaries for holding datasets.
- **Functions**. Write models and losses as small, testable functions.

## 🗺️ What we cover

1. **Data and models**: features, labels, hypothesis classes and parameters θ
2. **Supervised models**: learning a map x ↦ y from labelled examples
3. **Unsupervised models**: clustering and dimensionality reduction without labels
4. **Regression**: least squares, and gradient descent as the workhorse
5. **Classification**: logistic regression, cross-entropy and decision boundaries
6. **Generalisation**: train/validation/test splits, overfitting and regularisation

## 🤔 Warm-up

You fit a degree-15 polynomial to 10 noisy points and reach **zero** training error. Is that good news?

:::{dropdown} Reveal the answer
No. With more parameters than data points, the model interpolates the noise, and its error on new data will usually be large. You only find out on held-out data. The same question comes back in Lecture 04: quantum models become more expressive as circuits get deeper.
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

- [@bishop2006pattern]: a classic reference for the whole lecture
- [@goodfellow2016deep]: chapters 5 and 8 cover learning and optimisation
