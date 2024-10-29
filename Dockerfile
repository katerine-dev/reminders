# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
    FROM --platform=linux/amd64 node:18 as frontend

    WORKDIR /app/spa
    
    COPY spa/package*.json ./
    COPY spa/ ./
    
    RUN npm install
    RUN npm run build
    RUN ls -la /app/spa  # Verifica a saída da build do frontend
    
    # ----------------------------
    # Stage 2: Set Up Backend
    # ----------------------------
    FROM --platform=linux/amd64 python:3.11-slim-bullseye as backend
    
    # Define o diretório de trabalho
    WORKDIR /app
    
    # Instala o Poetry e configura as dependências do Python
    COPY pyproject.toml poetry.lock ./
    RUN pip install --no-cache-dir poetry
    RUN poetry config virtualenvs.create false
    RUN poetry install --no-interaction --no-ansi
    
    # Copia o restante do código do backend
    COPY . .
    
    # Copia os arquivos compilados do frontend da primeira etapa para o backend
    COPY --from=frontend /app/spa/dist ./spa/dist
    RUN ls -la ./spa/dist  # Verifica que o dist existe no backend
    
    # Expõe a porta da aplicação
    EXPOSE 8000
    
    # Comando para iniciar a aplicação FastAPI com Uvicorn
    CMD ["poetry", "run", "uvicorn", "reminders.main:app", "--host", "0.0.0.0", "--port", "8000"]
    