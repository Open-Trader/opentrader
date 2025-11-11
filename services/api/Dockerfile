FROM python:3.11-slim
WORKDIR /app

# Copy services package structure (needed for services.common imports)
# Note: Railway uses repo root as build context when Root Directory is set
COPY services/__init__.py /app/services/__init__.py
COPY services/common /app/services/common

# Copy the root-level services_common namespace package (not the old shim)
# This makes services.common importable as services_common
COPY services_common /app/services_common

# Copy API service files (excluding the old services_common shim directory)
COPY services/api/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy API service files, but exclude the old services_common shim
COPY services/api/main.py /app/main.py
COPY services/api/railway.json /app/railway.json

# Use PORT env var (Railway) or default to 8000
CMD sh -c "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"
