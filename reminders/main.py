import os
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from reminders.db import connection as db_connection
from reminders.routes.reminders_route import router as reminder_route

load_dotenv()

# Create an instance of the FastAPI app
app = FastAPI()

# Inclui o roteador de lembretes com prefixo "/static"
app.include_router(reminder_route, prefix="/api")

static_dir = os.path.join(os.path.dirname(__file__), "../spa/dist")

app.mount("/static", StaticFiles(directory=static_dir), name="static")

# Custom exception handler for validation errors:
# Forces FastAPI to return a 400 Bad Request status code instead of the default 422 Unprocessable Entity
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)

@app.get("/", include_in_schema=False)
@app.head("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

