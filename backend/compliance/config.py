"""Compliance config endpoint - single source of truth for thresholds and windows.

The frontend fetches this once on boot and caches it on window.APEX_COMPLIANCE_CONFIG.
Backend code imports the constants directly.
"""
from fastapi import APIRouter

# --- Constants exported to backend code ---
MASTERY_THRESHOLD = 0.70                  # 16 TAC POI-DE; SS 84.502 adult
IDENTITY_RESPONSE_SECONDS = 90            # SS 84.501 personal-validation window
IDENTITY_WARMUP_MIN_TOTAL = 10            # don't lock out before this many challenges
IDENTITY_WRONG_RATE_LOCKOUT = 0.30        # SS 84.501 30% wrong -> lockout
MULTIMEDIA_GATE_MIN_SECONDS = 180         # SS 84.501 clip >180s requires Q
TIMER_IDLE_PAUSE_SECONDS = 60             # tab-blur / no-input pause threshold
OPERATING_HOURS_START = 5                 # SS 84.600 5 a.m. local
OPERATING_HOURS_END = 23                  # SS 84.600 11 p.m. local

router = APIRouter(prefix="/api/compliance")


@router.get("/config")
def get_config():
    """Public - no auth required. Used to seed frontend constants."""
    return {
        "mastery_threshold": MASTERY_THRESHOLD,
        "identity_response_seconds": IDENTITY_RESPONSE_SECONDS,
        "identity_warmup_min_total": IDENTITY_WARMUP_MIN_TOTAL,
        "identity_wrong_rate_lockout": IDENTITY_WRONG_RATE_LOCKOUT,
        "multimedia_gate_min_seconds": MULTIMEDIA_GATE_MIN_SECONDS,
        "timer_idle_pause_seconds": TIMER_IDLE_PAUSE_SECONDS,
        "operating_hours_local": {
            "start_hour": OPERATING_HOURS_START,
            "end_hour": OPERATING_HOURS_END,
        },
    }
