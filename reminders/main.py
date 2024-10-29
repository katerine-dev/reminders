import os 

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from reminders.db import connection as db_connection

from reminders.routes.reminders_route import router as reminder_route
from dotenv import load_dotenv

load_dotenv()


# Create an instance of the FastAPI app
app = FastAPI()

app.include_router(reminder_route)

static_dir = os.path.join(os.path.dirname(__file__), '../spa/dist')
app.mount("/", StaticFiles(directory=static_dir), name="static")

# Custom exception handler for validation errors:
# Forces FastAPI to return a 400 Bad Request status code instead of the default 422 Unprocessable Entity
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)


if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI app using Uvicorn, accessible on host 0.0.0.0 (all network interfaces) and port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)