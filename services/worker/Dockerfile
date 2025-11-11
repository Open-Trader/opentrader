FROM python:3.11-slim
WORKDIR /app

# Copy services package structure (needed for services.common imports)
# Note: Railway uses repo root as build context when Root Directory is set
COPY services/__init__.py /app/services/__init__.py
COPY services/common /app/services/common

# Copy the root-level services_common namespace package (not the old shim)
# This makes services.common importable as services_common
COPY services_common /app/services_common

# Copy worker service files (excluding the old services_common shim directory)
COPY services/worker/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy worker service files, but exclude the old services_common shim
COPY services/worker/run_worker.py /app/run_worker.py

CMD ["python", "run_worker.py"]
