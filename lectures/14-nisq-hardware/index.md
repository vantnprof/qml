---
title: "📡 QML on NISQ Hardware"
short_title: "14 · QML on NISQ Hardware"
subtitle: "Noise models, error mitigation and running trained models on real qubits."
---

::::{div}
:class: lecture-banner phase-5

:::{div}
:class: lecture-number
14
:::

:::{div}
:class: lecture-info
**Lecture 14** · Layer 5 — 🔬 Reality Check
:::

::::

:::{div}
:class: big-idea
A model trained in a perfect simulator meets the real world at inference time.
:::

## 🎯 Learning objectives

- Describe NISQ devices: qubit counts, fidelities and connectivity
- Simulate QML models under realistic noise models
- Apply error mitigation: readout correction and zero-noise extrapolation
- Transpile a trained model and run inference on a real QPU

## 🧩 Prerequisites

You should already be comfortable with:

- **Noise, Decoherence & Error Correction**. Noise channels and error correction.
- **Running on Real Quantum Hardware**. Accounts, transpilation and job submission.

## 🗺️ What we cover

1. **The NISQ era**: what today's devices can and cannot do
2. **Noise and $\langle O\rangle$**: how decoherence shrinks expectation values
3. **Error mitigation**: readout correction, ZNE and probabilistic error cancellation
4. **Transpilation**: native gates, connectivity and depth after routing
5. **Train in simulation, infer on hardware**: and measure the gap

## 🤔 Warm-up

Global depolarising noise of strength $p$ after each of $L$ layers rescales a traceless observable's expectation value by roughly what factor?

:::{dropdown} Reveal the answer
By $(1-p)^L$, so the signal shrinks **exponentially** with depth. That is one reason shallow circuits dominate NISQ-era QML, and zero-noise extrapolation tries to undo exactly this shrinkage.
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

- [@preskill2018nisq]: the paper that named the NISQ era
- [@temme2017mitigation]: error mitigation for short-depth circuits
- [@kandala2017hardware]: hardware-efficient ansätze
- [@kim2023utility]: utility before fault tolerance
