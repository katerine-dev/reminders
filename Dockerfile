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
    RUN ls -la /app/spa  # Verifica a saída da build do frontend
    
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
    COPY --from=frontend /app/spa/dist ./spa/dist
    RUN ls -la ./spa/dist  # Verifica que o dist existe no backend
    
    # Copia o script entrypoint e define permissão de execução
    COPY entrypoint.sh /app/entrypoint.sh
    RUN chmod +x /app/entrypoint.sh
    
    # Expõe a porta da aplicação
    EXPOSE 8000
    
    # Define o entrypoint para garantir que o script seja executado na inicialização
    ENTRYPOINT ["/app/entrypoint.sh"]
    