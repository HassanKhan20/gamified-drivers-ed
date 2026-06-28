"""CLI: grant role='admin' to an existing user by email.

Usage:
    python -m backend.promote_admin <email>

The user must have signed up first. Admin role grants access to /api/admin/*
endpoints, including listing and closing lockouts via /admin-lockouts.html.
"""
from __future__ import annotations

import os
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = Path(os.environ.get("APEX_DB_PATH", str(ROOT / "backend" / "apex.db")))


def main() -> None:
    if len(sys.argv) != 2:
        print("Usage: python -m backend.promote_admin <email>", file=sys.stderr)
        sys.exit(2)
    email = sys.argv[1].lower().strip()
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    row = conn.execute("SELECT id, email, role FROM users WHERE LOWER(email) = ?", (email,)).fetchone()
    if not row:
        print(f"No user with email {email}", file=sys.stderr)
        sys.exit(1)
    if row["role"] == "admin":
        print(f"User {email} is already admin.")
        return
    conn.execute("UPDATE users SET role = 'admin' WHERE id = ?", (row["id"],))
    conn.commit()
    print(f"Promoted {email} to admin. Can now access /admin-lockouts.html.")


if __name__ == "__main__":
    main()
