#!/bin/sh
set -ex

# Verifique a porta
echo "Using PORT: ${PORT:-8000}"

# Criar a URL do banco de dados a partir das variáveis de ambiente
DB_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# Executar as migrações do YoYo com a URL direta
echo "Running database migrations..."
poetry run yoyo apply --database="$DB_URL"

# Iniciar a aplicação FastAPI com a porta especificada pela variável PORT do Render.com
echo "Starting FastAPI application..."
exec poetry run uvicorn reminders.main:app --host 0.0.0.0 --port ${PORT:-8000}
