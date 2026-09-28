"""Render the Qiskit figures used by the Quantum bit chapter.

TeX pages are not executed by the book build, so this script runs the same code
as the chapter's listing and saves its output next to the chapter source.
"""

from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")

from qiskit import QuantumCircuit  # noqa: E402
from qiskit.quantum_info import Statevector  # noqa: E402
from qiskit.visualization import plot_bloch_multivector  # noqa: E402

FIGURES = Path(__file__).resolve().parents[1] / "content/Quantum computing/figures"


def main() -> None:
    FIGURES.mkdir(parents=True, exist_ok=True)

    # Keep in sync with the listing in 1_Quantum_bit.tex.
    qc = QuantumCircuit(1)
    qc.h(0)
    qc.s(0)

    qc.draw(output="mpl").savefig(
        FIGURES / "single_qubit_circuit.png", dpi=200, bbox_inches="tight"
    )

    state = Statevector(qc)
    plot_bloch_multivector(state).savefig(
        FIGURES / "single_qubit_bloch.png", dpi=200, bbox_inches="tight"
    )
    print(state)


if __name__ == "__main__":
    main()
