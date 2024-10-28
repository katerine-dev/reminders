#!/bin/sh
set -e

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT
do
  echo "Waiting for database connection at $DB_HOST:$DB_PORT..."
  sleep 1
done
echo "Database is up and running at $DB_HOST:$DB_PORT!"

# Run YoYo migrations
echo "Running database migrations..."
poetry run yoyo apply

# Start the FastAPI application
echo "Starting FastAPI application..."
exec poetry run uvicorn reminders.main:app --host 0.0.0.0 --port 8000
