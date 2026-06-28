import pytest

from backend.compliance.mastery import (
    MASTERY_THRESHOLD,
    passes_mastery,
    passes_mastery_counts,
)


def test_mastery_threshold_is_seventy_percent():
    assert MASTERY_THRESHOLD == 0.70


@pytest.mark.parametrize("score,expected", [
    (0.69, False),
    (0.70, True),
    (0.71, True),
    (1.00, True),
    (0.00, False),
])
def test_passes_mastery_ratio(score, expected):
    assert passes_mastery(score) is expected


def test_passes_mastery_counts():
    assert passes_mastery_counts(6, 8) is True   # 0.75
    assert passes_mastery_counts(5, 8) is False  # 0.625
    assert passes_mastery_counts(7, 10) is True  # exactly 0.70
    assert passes_mastery_counts(0, 0) is False


def test_topic_drive_done_requires_70_percent_quiz(signed_up_client):
    # quiz_score = 0.66 then drive_done -> 409 (below 0.70)
    r = signed_up_client.post("/api/topics/1.1/progress", json={"quiz_score": 0.66})
    assert r.status_code == 200

    r2 = signed_up_client.post("/api/topics/1.1/progress", json={"drive_done": True})
    assert r2.status_code == 409, r2.text

    # bump to 0.70 -> drive_done accepted
    r3 = signed_up_client.post("/api/topics/1.1/progress", json={"quiz_score": 0.70})
    assert r3.status_code == 200

    r4 = signed_up_client.post("/api/topics/1.1/progress", json={"drive_done": True})
    assert r4.status_code == 200, r4.text
    assert r4.json()["drive_done"] is True
