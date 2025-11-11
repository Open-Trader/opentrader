FROM python:3.11-slim
WORKDIR /app

# Copy common module (if UI needs it)
# Note: Railway uses repo root as build context when Root Directory is set
COPY services/common /app/services/common

# Copy UI service files
COPY services/ui/requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY services/ui /app

# Use PORT env var (Railway) or default to 8501
CMD sh -c "streamlit run app.py --server.port=${PORT:-8501} --server.address=0.0.0.0"
