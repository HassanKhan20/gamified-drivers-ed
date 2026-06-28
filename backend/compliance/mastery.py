"""Mastery threshold - single source of truth for "what counts as passing"
under 16 TAC POI-DE and SS 84.502.
"""

MASTERY_THRESHOLD = 0.70


def passes_mastery(ratio: float) -> bool:
    """ratio in [0.0, 1.0]. Returns True iff ratio >= MASTERY_THRESHOLD."""
    return ratio >= MASTERY_THRESHOLD


def passes_mastery_counts(correct: int, total: int) -> bool:
    """correct/total integers. Returns False on total<=0."""
    if total <= 0:
        return False
    return (correct / total) >= MASTERY_THRESHOLD
