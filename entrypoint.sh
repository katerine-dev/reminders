#!/bin/sh
set -ex

echo "Current Environment Variables:"
env  # Verifica todas as variáveis de ambiente

echo "Current Working Directory:"
pwd

echo "Using PORT: ${PORT:-8000}"

# Definir URL do banco de dados com valores padrão para teste
DB_URL="postgresql://${DB_USER:-default_user}:${DB_PASSWORD:-default_password}@${DB_HOST:-localhost}:${DB_PORT:-5432}/${DB_NAME:-default_db}"
echo "Database URL: ${DB_URL}"

echo "Running database migrations..."
poetry run yoyo apply --database="${DB_URL}"

echo "Starting FastAPI application..."
exec poetry run uvicorn reminders.main:app --host 0.0.0.0 --port "${PORT:-8000}"
