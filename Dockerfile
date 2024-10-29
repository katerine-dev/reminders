# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
FROM --platform=linux/amd64 node:18 as frontend

WORKDIR /app/spa

# Copy frontend configuration and source code
COPY spa/package*.json ./
COPY spa/ ./

# Install dependencies and build the frontend
RUN npm install
RUN npm run build
RUN ls -la /app/spa/dist  # Check the output of the frontend build

# ----------------------------
# Stage 2: Set Up Backend
# ----------------------------
FROM --platform=linux/amd64 python:3.11-slim-bullseye as backend

# Set the working directory
WORKDIR /app

# Install Poetry and Python dependencies
COPY pyproject.toml poetry.lock ./
RUN pip install --no-cache-dir poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-interaction --no-ansi

# Copy the rest of the backend code
COPY . .

# Copy the frontend build files from the frontend stage to the backend
COPY --from=frontend /app/spa/dist ./spa/dist
RUN ls -la ./spa/dist  # Verify that dist exists in the backend

# Copy the entrypoint script and set execute permissions
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose the application port
EXPOSE 8000

# Set the entrypoint to ensure the script is executed on startup
ENTRYPOINT ["/app/entrypoint.sh"]

    