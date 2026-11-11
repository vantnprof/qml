---
title: "🏜️ Trainability, Barren Plateaus & Dequantisation"
short_title: "13 · Barren Plateaus & Dequantisation"
subtitle: "Why gradients vanish, when classical computers catch up, and how to argue for an advantage."
---

::::{div}
:class: lecture-banner phase-5

:::{div}
:class: lecture-number
13
:::

:::{div}
:class: lecture-info
**Lecture 13** · Layer 5 — 🔬 Reality Check
:::

::::

:::{div}
:class: big-idea
If a model is easy to train, check whether it is also easy to simulate.
:::

## 🎯 Learning objectives

- Show numerically how gradient variance decays with the number of qubits
- Identify the causes: expressivity, global costs, entanglement and noise
- Apply mitigations: local costs, smart initialisation and structured ansätze
- Weigh the link between trainability and classical simulability

## 🧩 Prerequisites

You should already be comfortable with:

- **Variational Algorithms (VQE & QAOA)**. Where barren plateaus were first met.
- **Noise, Decoherence & Error Correction**. Noise is one source of flat landscapes.

## 🗺️ What we cover

1. **Barren plateaus**: gradients concentrate exponentially in the number of qubits
2. **Causes**: expressivity, global observables, entanglement and noise
3. **Mitigation**: local costs, layerwise training, warm starts and structure
4. **Dequantisation**: quantum-inspired classical algorithms
5. **Simulability**: does provable trainability imply classical simulability?
6. **Arguing for advantage**: what a convincing claim needs to show

## 🤔 Warm-up

Suppose the gradient's standard deviation scales like $2^{-n/2}$. Roughly how many shots does it take to resolve its sign at $n = 30$ qubits?

:::{dropdown} Reveal the answer
The shot noise $\sim 1/\sqrt{N}$ has to fall below $2^{-15}$, so $N \gtrsim 2^{30} \approx 10^9$ shots, **per parameter, per step**. That is why a barren plateau is a practical problem and not just a theoretical one.
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

- [@mcclean2018barren]: the original result
- [@cerezo2021cost]: cost-function-dependent plateaus
- [@larocca2025barren]: comprehensive review
- [@cerezo2023simulability]: trainability vs simulability
- [@tang2019dequantized]: the first dequantisation
