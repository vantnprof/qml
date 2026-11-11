---
title: "🌊 Quantum Reservoir Computing"
short_title: "10 · Quantum Reservoir Computing"
subtitle: "Let a fixed quantum system do the remembering; train only the readout."
---

::::{div}
:class: lecture-banner phase-4

:::{div}
:class: lecture-number
10
:::

:::{div}
:class: lecture-info
**Lecture 10** · Layer 4 — 🌊 Dynamics & Generative Models
:::

::::

:::{div}
:class: big-idea
Do not train the dynamics. Use them as they are.
:::

## 🎯 Learning objectives

- Describe classical reservoir computing and the echo-state property
- Implement the Fujii–Nakajima input-injection update
- Extract features $x_{k,m} = \mathrm{Tr}(O_m \rho_k)$ and fit a linear readout
- Measure memory capacity on a time-series prediction task

## 🧩 Prerequisites

You should already be comfortable with:

- **Multi-Qubit Systems & Entanglement**. Partial trace: forgetting one qubit while keeping the rest.
- **Noise, Decoherence & Error Correction**. Density matrices and open-system dynamics.

## 🗺️ What we cover

1. **Classical reservoirs**: echo state networks and liquid state machines
2. **Quantum reservoir computing**: a quantum system as a recurrent feature extractor
3. **The update**: $\rho_k = U_\tau\left[\sigma(u_k)\otimes\mathrm{Tr}_1(\rho_{k-1})\right]U_\tau^\dagger$
4. **Training**: ridge regression on measured features, in closed form
5. **Inference**: memory and non-linearity benchmarks on time series

## 🤔 Warm-up

Why is training a quantum reservoir so much cheaper than training a variational classifier?

:::{dropdown} Reveal the answer
Only the linear readout is trained, so fitting is a closed-form ridge regression. There are no gradients through the quantum system and no parameter-shift circuits: each input sequence goes through the reservoir once.
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

- [@fujii2017harnessing]: the original QRC proposal
- [@jaeger2004harnessing]: classical echo state networks
- [@mujal2021reservoir]: review of QRC and extreme learning machines
