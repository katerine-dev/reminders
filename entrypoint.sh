#!/bin/sh
set -ex  # Enable debugging and exit on any command failure

# Log the current environment variables to ensure they are loaded correctly
echo "Current Environment Variables:"
env

# Log the working directory
echo "Current Working Directory:"
pwd

# Verify the PORT variable is set
echo "Using PORT: ${PORT:-8000}"

# Construct the database URL and log it for verification
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "Database URL: ${DB_URL}"

# Run database migrations and capture any errors
echo "Running database migrations..."
poetry run yoyo apply --database="${DB_URL}"

# Start the FastAPI application and verify the port setting
echo "Starting FastAPI application..."
exec poetry run uvicorn reminders.main:app --host 0.0.0.0 --port "${PORT:-8000}"
