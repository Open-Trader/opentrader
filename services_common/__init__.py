"""
services_common namespace package
This makes services/common importable as services_common
"""
import sys
from pathlib import Path
import importlib

# Ensure repo root is in path
_repo_root = Path(__file__).resolve().parent
if str(_repo_root) not in sys.path:
    sys.path.insert(0, str(_repo_root))

# Import services.common modules and make them available as services_common.*
# Do this eagerly so modules are available immediately
_common_modules = [
    'config', 'db', 'ingest', 'signals', 'schema', 'notifications'
]

for mod_name in _common_modules:
    try:
        mod = importlib.import_module(f'services.common.{mod_name}')
        # Register in sys.modules for direct import access
        sys.modules[f'services_common.{mod_name}'] = mod
    except Exception as e:
        # Log the error but continue - this helps with debugging
        print(f"Warning: Could not import services.common.{mod_name}: {e}", file=sys.stderr)

# Handle adapters package
try:
    adapters = importlib.import_module('services.common.adapters')
    sys.modules['services_common.adapters'] = adapters
    for adapter in ['exchanges', 'open_interest', 'volatility', 'sentiment', 'headlines']:
        try:
            mod = importlib.import_module(f'services.common.adapters.{adapter}')
            sys.modules[f'services_common.adapters.{adapter}'] = mod
        except Exception as e:
            print(f"Warning: Could not import services.common.adapters.{adapter}: {e}", file=sys.stderr)
except Exception as e:
    print(f"Warning: Could not import services.common.adapters: {e}", file=sys.stderr)

