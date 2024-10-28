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
    
    # Instalar dependências do sistema
    RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        netcat-openbsd \
        && rm -rf /var/lib/apt/lists/*
    
    # Copiar arquivos de dependências do backend
    COPY pyproject.toml poetry.lock ./
    
    # Instalar o Poetry e as dependências do Python
    RUN pip install --no-cache-dir poetry
    RUN poetry config virtualenvs.create false
    RUN poetry install --no-interaction --no-ansi
    
    # Copiar o restante do código do backend
    COPY . .
    
    # Copiar o frontend compilado da etapa anterior
    COPY --from=frontend /app/spa/dist ./spa/dist
    
    # Copiar o script entrypoint e dar permissão de execução
    COPY entrypoint.sh /app/entrypoint.sh
    RUN chmod +x /app/entrypoint.sh
    
    # Expor a porta da aplicação
    EXPOSE 8000
    
    # Definir o entrypoint
    ENTRYPOINT ["/app/entrypoint.sh"]
    