#!/bin/sh
set -e

# Esperar o banco de dados ficar pronto
echo "Waiting for the database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 1
done
echo "Database is up and running at $DB_HOST:$DB_PORT!"

# Criar a URL do banco de dados a partir das variáveis de ambiente
DB_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"

# Executar as migrações do YoYo com a URL direta
echo "Running database migrations..."
poetry run yoyo apply --database="$DB_URL"

# Iniciar a aplicação FastAPI
echo "Starting FastAPI application..."
exec poetry run uvicorn reminders.main:app --host 0.0.0.0 --port 8000
