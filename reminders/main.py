from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from reminders.db import connection as db_connection

from reminders.routes.reminders_route import router as reminder_route

app = FastAPI()

conn = db_connection.get_connection()
cur = conn.cursor()


app.include_router(reminder_route)


# forces fastapi to return 400 instead of 422 on a request validation error
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)