# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
    FROM --platform=linux/amd64 node:18 as frontend

    WORKDIR /app/spa
    
    # Copia os arquivos de configuração e código do frontend
    COPY spa/package*.json ./
    COPY spa/ ./
    
    # Instala as dependências e faz a build do frontend
    RUN npm install
    RUN npm run build

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
    
    # Copia os arquivos compilados do frontend para o backend
    COPY --from=frontend /app/spa/dist /app/spa/dist
    
    # Exibir valores das variáveis de ambiente essenciais antes de iniciar o serviço
    RUN echo "DB_USER: ${DB_USER}, DB_PASSWORD: ${DB_PASSWORD}, DB_HOST: ${DB_HOST}, DB_PORT: ${DB_PORT}, DB_NAME: ${DB_NAME}"
    
    CMD echo "Using PORT: ${PORT:-8000}" && \
    poetry run yoyo apply --database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" && \
    poetry run uvicorn reminders.main:app --host 0.0.0.0 --port "${PORT:-8000}"
