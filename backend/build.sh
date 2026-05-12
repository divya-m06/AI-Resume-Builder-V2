#!/usr/bin/env bash
set -euo pipefail

pip install -r requirements.txt

# SpaCy English model — CLI download can fail on some platforms; fall back to pinned wheel.
if ! python -m spacy download en_core_web_sm 2>/dev/null; then
  echo "spacy download failed; installing en_core_web_sm via pip wheel..."
  pip install --no-cache-dir \
    "https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl"
fi
