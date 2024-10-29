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
    # Verifica se o diretório 'dist' foi gerado
    RUN if [ ! -d "/app/spa/dist" ]; then echo "Erro: Diretório /app/spa/dist não encontrado!"; exit 1; fi
    # Verifique o conteúdo após o build do frontend
    RUN echo "Conteúdo de /app/spa após o build:" && ls -la /app/spa

    # Verifique o conteúdo após a cópia para o backend
    RUN echo "Conteúdo de /app/spa/dist após a cópia para o backend:" && ls -la /app/spa/dist


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
    
    # Verifica se o diretório dist foi copiado corretamente
    RUN ls -la /app/spa/dist

    # Exibir valores das variáveis de ambiente essenciais antes de iniciar o serviço
    RUN echo "DB_USER: ${DB_USER}, DB_PASSWORD: ${DB_PASSWORD}, DB_HOST: ${DB_HOST}, DB_PORT: ${DB_PORT}, DB_NAME: ${DB_NAME}"
    
    # Comando de execução para aplicar migrações e iniciar a aplicação
    CMD poetry run yoyo apply --database "postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" && \
        poetry run uvicorn reminders.main:app --host 0.0.0.0 --port "${PORT:-8000}"
    