UV ?= uv
.DEFAULT_GOAL := help
export NPM_CONFIG_AUDIT := false
export NPM_CONFIG_FUND := false
export NPM_CONFIG_UPDATE_NOTIFIER := false
BOOK := $(UV) run --locked jupyter book
QUANTUM := $(UV) run --locked --extra quantum
ANIMATION := $(UV) run --locked --extra animation
CUDAQ := $(UV) run --locked --extra quantum --extra cudaq
NPM ?= npm

node_modules/.package-lock.json: package.json package-lock.json
	$(NPM) ci --ignore-scripts --no-audit --no-fund

setup setup-animation setup-cudaq setup-all preview build build-cudaq build-fast check test: node_modules/.package-lock.json

.PHONY: help setup setup-animation setup-cudaq setup-all lab cudaq-lab cudaq-test preview build build-cudaq build-fast animations check test doctor clean
help:
	@echo "setup       Install the book, notebook, and quantum environment"
	@echo "setup-animation  Add the Manim environment"
	@echo "setup-cudaq Add CUDA-Q on a supported host"
	@echo "setup-all   Install quantum, Manim, and CUDA-Q dependencies"
	@echo "lab         Start JupyterLab with the quantum environment"
	@echo "cudaq-lab   Start JupyterLab with CUDA-Q on a supported host"
	@echo "cudaq-test  Check the portable CUDA-Q CPU target"
	@echo "preview     Start the Jupyter Book development server"
	@echo "build       Execute notebooks, render registered scenes, and build"
	@echo "build-cudaq Execute the book with CUDA-Q available"
	@echo "build-fast  Build from saved notebook outputs without execution"
	@echo "animations  Render scenes registered in animations/manifest.toml"
	@echo "check       Run source, notebook, and environment checks"
	@echo "doctor      Report optional tool and accelerator availability"

setup:
	$(UV) sync --locked --extra quantum

setup-animation:
	$(UV) sync --locked --extra quantum --extra animation

setup-cudaq:
	$(UV) sync --locked --extra quantum --extra cudaq

setup-all:
	$(UV) sync --locked --extra quantum --extra animation --extra cudaq

lab:
	$(QUANTUM) jupyter lab

cudaq-lab:
	$(CUDAQ) jupyter lab

cudaq-test:
	$(UV) run --locked --extra cudaq python scripts/cudaq_smoke.py

preview:
	$(BOOK) start

build: animations
	$(QUANTUM) jupyter book build --html --execute --strict

build-cudaq:
	$(CUDAQ) jupyter book build --html --execute --strict

build-fast:
	$(BOOK) build --html --strict

animations:
	$(ANIMATION) python scripts/render_animations.py

check:
	$(UV) lock --check
	$(UV) run --locked ruff check .
	$(UV) run --locked ruff format --check .
	$(UV) run --locked python scripts/check_notebooks.py

test:
	$(QUANTUM) pytest
	$(NPM) test

doctor:
	$(UV) run --locked python scripts/doctor.py

clean:
	$(BOOK) clean
