---
title: Quantum Machine Learning Course
site:
  hide_title_block: true
  hide_outline: true
---

::::::{div}
:class: hero

:::::{grid} 1 1 2 2

::::{div}
:class: hero-text

:::{div}
:class: hero-kicker
Encode · Train · Measure
:::

:::{div}
:class: hero-title
Teach qubits to *learn*
:::

From angle encoding to quantum kernels, reservoirs and real hardware: 16 lectures and 2 projects. Every model you build gets benchmarked honestly against a classical one.

{button}`Start learning → <lectures/00-welcome/index.md>` {button}`Roadmap <#roadmap>`
::::

::::{div}
:class: training-log

`$ make lab  # qml.qnode(dev)`

`epoch 01 │ loss 0.693 │ acc 0.51`

`epoch 10 │ loss 0.412 │ acc 0.78`

`epoch 25 │ loss 0.187 │ acc 0.93`

`epoch 50 │ loss 0.061 │ acc 0.98`

`✓ converged · now beat the baseline`
::::

:::::

::::::

(roadmap)=
## 🗺️ Roadmap

The course is built like a variational circuit: six layers, each one adding parameters to your understanding.

### 🧭 Layer 1 · Foundations

Two worlds, one toolkit: the machine learning loop and the quantum computer it will run on.

::::{grid} 1 2 2 3
:class: roadmap-grid phase-1

:::{card} 🧭 00 · Welcome to Quantum Machine Learning
:link: lectures/00-welcome/index.md

What QML is, what it is not, and how to set up your lab.
:::

:::{card} 📈 01 · Machine Learning Essentials
:link: lectures/01-ml-essentials/index.md

Data, models, losses and gradients: the classical half of QML.
:::

:::{card} ⚛️ 02 · Quantum Computing for ML
:link: lectures/02-quantum-computing-for-ml/index.md

Qubits, gates and measurements, reread through the lens of a model.
:::

::::

### 🔌 Layer 2 · Data Meets Hilbert Space

Turn numbers into quantum states, build trainable circuits and learn how to differentiate them.

::::{grid} 1 2 2 3
:class: roadmap-grid phase-2

:::{card} 🔌 03 · Encoding Classical Data
:link: lectures/03-data-encoding/index.md

Basis, amplitude, angle and re-uploading: how a number becomes a quantum state.
:::

:::{card} 🎛️ 04 · Parameterised Quantum Circuits
:link: lectures/04-parameterised-circuits/index.md

Ansätze, expressibility and entanglement: the architecture of a quantum model.
:::

:::{card} 📉 05 · Training Quantum Models
:link: lectures/05-training-quantum-models/index.md

Parameter-shift gradients, optimisers and the price of every shot.
:::

::::

### 🧠 Layer 3 · Quantum Models

Classifiers, kernels, hybrid networks and QCNNs: the main families of quantum models.

::::{grid} 1 2 2 4
:class: roadmap-grid phase-3

:::{card} 🎯 06 · Variational Quantum Classifiers
:link: lectures/06-variational-classifiers/index.md

Your first end-to-end quantum model: encode, rotate, measure, classify.
:::

:::{card} 🧲 07 · Quantum Kernels & Support Vector Machines
:link: lectures/07-quantum-kernels/index.md

Measure similarity in Hilbert space and let a classical SVM do the rest.
:::

:::{card} 🔀 08 · Hybrid Quantum–Classical Models
:link: lectures/08-hybrid-models/index.md

Plug quantum layers into PyTorch: frozen feature extractors or end-to-end training.
:::

:::{card} 🕸️ 09 · Quantum Neural Networks & QCNNs
:link: lectures/09-quantum-neural-networks/index.md

Quanvolution, quantum convolutional networks and what “deep” means for a circuit.
:::

::::

### 🌊 Layer 4 · Dynamics & Generative Models

Let quantum dynamics remember, let measurement sample, and learn directly from quantum data.

::::{grid} 1 2 2 3
:class: roadmap-grid phase-4

:::{card} 🌊 10 · Quantum Reservoir Computing
:link: lectures/10-quantum-reservoir-computing/index.md

Let a fixed quantum system do the remembering; train only the readout.
:::

:::{card} 🎨 11 · Generative Quantum Models
:link: lectures/11-generative-models/index.md

Born machines and quantum GANs: sample from distributions instead of predicting labels.
:::

:::{card} 🔭 12 · Learning from Quantum Data
:link: lectures/12-quantum-data/index.md

When the data are quantum states: classical shadows, phases of matter and QQ learning.
:::

::::

### 🔬 Layer 5 · Reality Check

Vanishing gradients, noisy qubits and finite memory: what decides whether QML works in practice.

::::{grid} 1 2 2 3
:class: roadmap-grid phase-5

:::{card} 🏜️ 13 · Trainability, Barren Plateaus & Dequantisation
:link: lectures/13-barren-plateaus/index.md

Why gradients vanish, when classical computers catch up, and how to argue for an advantage.
:::

:::{card} 📡 14 · QML on NISQ Hardware
:link: lectures/14-nisq-hardware/index.md

Noise models, error mitigation and running trained models on real qubits.
:::

:::{card} 🚀 15 · Scaling Up: GPUs, CUDA-Q & Cloud QPUs
:link: lectures/15-scaling-up/index.md

Simulate bigger, train faster, and move work onto accelerators and cloud hardware.
:::

::::

### 🚀 Layer 6 · Projects

Put everything together, measure it honestly and publish what you find.

::::{grid} 1 2 2 2
:class: roadmap-grid phase-6

:::{card} 🎯 16 · Project 1
:link: lectures/16-project-1/index.md

Build a quantum classifier end to end and benchmark it honestly.
:::

:::{card} 🏆 17 · Project 2
:link: lectures/17-project-2/index.md

The capstone: a research-style QML study, from question to published article.
:::

::::

## 🧑‍🔬 How to use this course

::::{grid} 1 1 3 3

:::{card} 🧩 Check the prerequisites
Every lecture starts by listing what you should already know. Review anything unfamiliar before you dive in.
:::

:::{card} 🤔 Answer the warm-up first
Each lecture has one question with a hidden answer. Commit to your own answer before you open it.
:::

:::{card} 📓 Train it yourself
Run every notebook with `make lab`. Change the encoding and the ansatz, then compare your model against a classical baseline.
:::

::::
