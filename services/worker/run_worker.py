import os
import sys
from pathlib import Path

# Add the repo root to path so services.common can be imported
# This file is at services/worker/run_worker.py
# So we need to go up 2 levels to get to repo root
repo_root = Path(__file__).resolve().parent.parent.parent
common_dir = repo_root / "services" / "common"

# Add repo root and common directory to path
sys.path.insert(0, str(repo_root))
sys.path.insert(0, str(common_dir))

# Debug: Verify the path is correct
print(f"[DEBUG] Repo root: {repo_root}", file=sys.stderr)
print(f"[DEBUG] Common dir: {common_dir}", file=sys.stderr)
print(f"[DEBUG] Common dir exists: {common_dir.exists()}", file=sys.stderr)
print(f"[DEBUG] PYTHONPATH: {sys.path[:3]}", file=sys.stderr)

# Import using absolute path from repo root
try:
    from services.common.db import ensure_schema
    from services.common.ingest import run_ingest_cycle
    from services.common.signals import compute_all_signals
    from services.common.notifications import maybe_notify_top_signals
    print("[DEBUG] Successfully imported from services.common", file=sys.stderr)
except ImportError as e:
    print(f"[DEBUG] Import error: {e}", file=sys.stderr)
    # Re-raise the error so we can see what's actually failing
    raise

def main():
    print("[worker] Starting worker cycle...")
    ensure_schema()
    print("[worker] Running ingest cycle...")
    run_ingest_cycle()
    print("[worker] Computing signals...")
    compute_all_signals(os.getenv("SIGNAL_PROFILE"))
    print("[worker] Sending notifications (if configured)...")
    maybe_notify_top_signals()
    print("[worker] Worker cycle completed successfully!")

if __name__ == "__main__":
    main()
