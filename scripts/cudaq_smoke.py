"""Check that CUDA-Q can select its portable CPU target."""

import cudaq

cudaq.set_target("qpp-cpu")


def main() -> None:
    target = cudaq.get_target()
    print(f"CUDA-Q {cudaq.__version__}; target={target.name}")
    assert target.name == "qpp-cpu"


if __name__ == "__main__":
    main()
