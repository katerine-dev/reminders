import os 
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from reminders.db import connection as db_connection
from reminders.routes.reminders_route import router as reminder_route

load_dotenv()

# Cria uma instância do FastAPI
app = FastAPI()

app.include_router(reminder_route)

# Define o caminho absoluto para o diretório estático
static_dir = os.path.join(os.path.dirname(__file__), "../spa/dist")

# Monta os arquivos estáticos em "/reminders"
app.mount("/reminders", StaticFiles(directory=static_dir), name="reminders")

# Tratamento customizado de erro de validação
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)

# Redireciona a raiz para "/reminders/index.html"
@app.get("/")
async def root():
    return RedirectResponse(url="/reminders/index.html")

if __name__ == "__main__":
    import uvicorn
    # Executa a aplicação FastAPI usando o Uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)