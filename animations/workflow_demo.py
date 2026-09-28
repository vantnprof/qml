"""Minimal scene demonstrating the publication render pipeline."""

from manim import (
    BLUE,
    GREEN,
    TEAL,
    UP,
    WHITE,
    YELLOW,
    Arrow,
    Create,
    FadeIn,
    LaggedStart,
    RoundedRectangle,
    Scene,
    Text,
    VGroup,
)


class WorkflowDemo(Scene):
    """Show the four stages used to publish an interactive article."""

    def construct(self) -> None:
        title = Text("Quantum publishing workflow", font_size=48).to_edge(UP)
        labels = ("Write", "Execute", "Visualize", "Publish")
        colors = (BLUE, TEAL, GREEN, YELLOW)

        cards = VGroup()
        for label, color in zip(labels, colors, strict=True):
            box = RoundedRectangle(
                width=2.6,
                height=1.4,
                corner_radius=0.18,
                color=color,
                fill_color=color,
                fill_opacity=0.12,
            )
            text = Text(label, font_size=32, color=WHITE)
            cards.add(VGroup(box, text))
        cards.arrange(buff=0.65)

        arrows = VGroup(
            *[
                Arrow(
                    cards[index].get_right(),
                    cards[index + 1].get_left(),
                    buff=0.12,
                    stroke_width=4,
                    max_tip_length_to_length_ratio=0.18,
                )
                for index in range(len(cards) - 1)
            ]
        )

        self.play(FadeIn(title, shift=0.2 * UP))
        self.play(
            LaggedStart(
                *(FadeIn(card, scale=0.9) for card in cards),
                lag_ratio=0.18,
            )
        )
        self.play(LaggedStart(*(Create(arrow) for arrow in arrows), lag_ratio=0.2))
        self.wait(1)
