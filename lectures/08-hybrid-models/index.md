---
title: "🔀 Hybrid Quantum–Classical Models"
short_title: "08 · Hybrid Models"
subtitle: "Plug quantum layers into PyTorch: frozen feature extractors or end-to-end training."
---

::::{div}
:class: lecture-banner phase-3

:::{div}
:class: lecture-number
08
:::

:::{div}
:class: lecture-info
**Lecture 08** · Layer 3 — 🧠 Quantum Models
:::

::::

:::{div}
:class: big-idea
Two ways to mix: keep the quantum part fixed and train the classical part, or train both at once and face the consequences.
:::

## 🎯 Learning objectives

- Use a fixed quantum circuit as a feature extractor and train only a classical head
- Train quantum and classical parameters jointly with automatic differentiation
- Recognise where joint training runs into barren plateaus
- Apply transfer learning: a pretrained classical network with a quantum head

## 🧩 Prerequisites

You should already be comfortable with:

- **Classes & Objects**. Quantum layers are `torch.nn.Module` subclasses.
- **Variational Algorithms (VQE & QAOA)**. Hybrid loops started with VQE.

## 🗺️ What we cover

1. **Design A · frozen quantum features**: a fixed quantum feature extractor with a trained classical head
2. **Design B · joint training**: quantum and classical parameters trained together with autodiff
3. **Quantum layers in PyTorch**: `qml.qnn.TorchLayer` and gradients crossing the boundary
4. **Transfer learning**: pretrained CNN features → variational quantum head
5. **When joint training stalls**: a first look at barren plateaus

## 🤔 Warm-up

In design A, where the quantum circuit has no trainable parameters, do you need parameter-shift gradients at all?

:::{dropdown} Reveal the answer
No. Run each input through the circuit once, cache the measured features, and train the classical head on them as usual. Lecture 10 develops this idea into **quantum reservoir computing**.
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

- [@mari2020transfer]: transfer learning in hybrid networks
- [@bergholm2018pennylane]: PennyLane and hybrid autodiff
- [@mcclean2018barren]: why joint training can stall
