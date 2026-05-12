# Backend API — Python 3.11 (matches runtime.txt)
FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt \
  && pip install --no-cache-dir \
    "https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl"

COPY . .

EXPOSE 8000
ENV PORT=8000

CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
