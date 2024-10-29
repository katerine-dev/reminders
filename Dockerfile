# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
    FROM --platform=linux/amd64 node:18 as frontend

    WORKDIR /app/spa
    
    # Copia os arquivos do frontend
    COPY spa/package*.json ./
    COPY spa/ ./
    
    # Instala dependências e gera a build
    RUN npm install
    RUN npm run build
    RUN ls -la /app/spa/dist  # Verifica a build do frontend
    
    # ----------------------------
    # Stage 2: Set Up Backend
    # ----------------------------
    FROM --platform=linux/amd64 python:3.11-slim-bullseye as backend
    
    # Define o diretório de trabalho
    WORKDIR /app
    
    # Define o PYTHONPATH e desativa o uso de virtualenv
    ENV PYTHONPATH=/app
    
    # Instala o Poetry e configura o ambiente
    COPY pyproject.toml poetry.lock ./
    RUN pip install --no-cache-dir poetry
    RUN poetry config virtualenvs.create false
    
    # Remove qualquer `.venv` existente
    RUN rm -rf /app/.venv
    RUN poetry install --no-interaction --no-ansi
    
    # Copia o restante do código do backend
    COPY . .

    # Copia o script entrypoint e define permissões
    COPY ./entrypoint.sh /app/entrypoint.sh
    RUN chmod +x /app/entrypoint.sh
    
    # Copia os arquivos compilados do frontend
    COPY --from=frontend /app/spa/dist ./spa/dist
    RUN ls -la ./spa/dist  # Verifica o dist no backend
    
    # Exibe o conteúdo do diretório para debug
    RUN ls -la /app/entrypoint.sh
    
    # Expor a porta
    EXPOSE 8000
    
    # Defina o comando de entrada para o container
    #CMD ["sh", "/app/entrypoint.sh"]
    