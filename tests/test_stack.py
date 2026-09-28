"""Compatibility checks for the default notebook quantum stack."""

from importlib.metadata import version


def test_quantum_packages_are_installed() -> None:
    for distribution in ("qiskit", "qiskit-aer", "pennylane", "pennylane-qiskit"):
        assert version(distribution)


def test_qiskit_aer_device_loads() -> None:
    from qiskit_aer import AerSimulator

    assert AerSimulator().name == "aer_simulator"


def test_pennylane_devices_load() -> None:
    import pennylane as qml

    assert qml.device("default.qubit", wires=1).wires.tolist() == [0]
    assert qml.device("qiskit.basicsim", wires=1).wires.tolist() == [0]
