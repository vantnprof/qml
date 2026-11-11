---
title: "🎨 Generative Quantum Models"
short_title: "11 · Generative Quantum Models"
subtitle: "Born machines and quantum GANs: sample from distributions instead of predicting labels."
---

::::{div}
:class: lecture-banner phase-4

:::{div}
:class: lecture-number
11
:::

:::{div}
:class: lecture-info
**Lecture 11** · Layer 4 — 🌊 Dynamics & Generative Models
:::

::::

:::{div}
:class: big-idea
Measurement already samples from a distribution. A generative model just learns which one.
:::

## 🎯 Learning objectives

- Use a circuit as a Born machine $p_\theta(x) = |\langle x|\psi(\theta)\rangle|^2$
- Train it from samples with the MMD loss
- Build a quantum GAN with a classical discriminator
- Discuss where sampling hardness could give quantum models an edge

## 🧩 Prerequisites

You should already be comfortable with:

- **Measurement**. The Born rule is the model.
- **Variational Algorithms (VQE & QAOA)**. The same variational loop, with a different loss.

## 🗺️ What we cover

1. **Born machines**: circuits as implicit generative models
2. **QCBM training**: maximum mean discrepancy from samples
3. **Quantum GANs**: a quantum generator against a classical discriminator
4. **Loading distributions**: qGANs for preparing states for later algorithms
5. **Evaluation**: KL divergence, MMD and sample quality

## 🤔 Warm-up

A 3-qubit Born machine defines a distribution over how many outcomes? Can you read off $p_\theta(x)$ directly?

:::{dropdown} Reveal the answer
$2^3 = 8$ bitstrings. You cannot read the probabilities off directly: you only get **samples**, so $p_\theta(x)$ has to be estimated. That is why losses such as MMD, which work from samples, fit this model naturally.
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

- [@benedetti2019qcbm]: quantum circuit Born machines
- [@zoufal2019qgan]: quantum GANs for loading distributions
