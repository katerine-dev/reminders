# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
    FROM --platform=linux/amd64 node:18 as frontend

    WORKDIR /app/spa
    
    # Copia os arquivos de configuração do frontend
    COPY spa/package*.json ./
    COPY spa/ ./
    
    # Instala as dependências e faz a build do frontend
    RUN npm install
    RUN npm run build
    RUN ls -la /app/spa/dist  # Verifica a saída da build do frontend
    
    # ----------------------------
    # Stage 2: Set Up Backend
    # ----------------------------
    FROM --platform=linux/amd64 python:3.11-slim-bullseye as backend
    
    # Define o diretório de trabalho
    WORKDIR /app
    
    # Instala o Poetry e as dependências do Python
    COPY pyproject.toml poetry.lock ./
    RUN pip install --no-cache-dir poetry
    RUN poetry config virtualenvs.create false
    RUN poetry install --no-interaction --no-ansi
    
    # Copia o restante do código do backend
    COPY . .
    
    # Copia os arquivos compilados do frontend da primeira etapa para o backend
    COPY --from=frontend /app/spa/dist /app/spa/dist
    
    # Debug: Confirma que o diretório dist existe no contêiner
    RUN ls -la /app/spa/dist
    
    # Configura o comando de execução para rodar as migrações e iniciar a aplicação
    CMD poetry run yoyo apply --database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" && \
        poetry run uvicorn reminders.main:app --host 0.0.0.0 --port "${PORT:-8000}"
    