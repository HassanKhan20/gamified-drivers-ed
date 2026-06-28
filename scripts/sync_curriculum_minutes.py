"""Parse frontend/scripts/curriculum.js, extract per-chapter minute floors,
and write backend/compliance/curriculum_minutes.json.

We use regex (not a JS engine) - curriculum.js is hand-authored and follows
a stable pattern: `id: 'X.Y', title: '...', minutes: N,`.

Run this whenever curriculum.js minute values change. Commit the regenerated
JSON alongside the curriculum change.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CURRICULUM_JS = ROOT / "frontend" / "scripts" / "curriculum.js"
OUT_JSON = ROOT / "backend" / "compliance" / "curriculum_minutes.json"

PATTERN = re.compile(
    r"id:\s*'(?P<id>\d+\.\d+)'.*?minutes:\s*(?P<minutes>\d+)",
    re.DOTALL,
)


def main() -> None:
    if not CURRICULUM_JS.exists():
        print(f"Curriculum file not found: {CURRICULUM_JS}", file=sys.stderr)
        sys.exit(2)
    text = CURRICULUM_JS.read_text(encoding="utf-8")
    result: dict[str, int] = {}
    for m in PATTERN.finditer(text):
        chapter_id = m.group("id")
        minutes = int(m.group("minutes"))
        if chapter_id in result:
            raise SystemExit(f"Duplicate chapter id: {chapter_id}")
        result[chapter_id] = minutes
    if not result:
        raise SystemExit("No chapters found - regex needs review")
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(result, indent=2, sort_keys=True), encoding="utf-8")
    print(f"Wrote {len(result)} chapters to {OUT_JSON}")


if __name__ == "__main__":
    main()
