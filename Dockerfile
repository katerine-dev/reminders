# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
    FROM node:18 as frontend

    WORKDIR /app/spa

    COPY spa/package*.json ./
    COPY spa/ ./

    RUN npm install
    
    RUN npm run build
    
    # ----------------------------
    # Stage 2: Set Up Backend
    # ----------------------------
    FROM python:3.11-slim
    
    WORKDIR /app

    COPY . .
   
    RUN apt-get update && apt-get install -y --no-install-recommends build-essential
    
    COPY pyproject.toml poetry.lock ./
    RUN pip install --no-cache-dir poetry
    RUN poetry config virtualenvs.create false
    RUN poetry install --no-interaction --no-ansi
    
    COPY --from=frontend /app/spa/dist ./spa/dist
          
    EXPOSE 8000
    
    CMD ["poetry", "run", "uvicorn", "reminders.main:app", "--host", "0.0.0.0", "--port", "8000"]
    