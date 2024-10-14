from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from reminders.db import connection as db_connection

from reminders.routes.reminders_route import router as reminder_route

# Create an instance of the FastAPI app
app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Establish a database connection and get a cursor to interact with the database
conn = db_connection.get_connection()
cur = conn.cursor()


app.include_router(reminder_route)


# Custom exception handler for validation errors:
# Forces FastAPI to return a 400 Bad Request status code instead of the default 422 Unprocessable Entity
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)


if __name__ == "__main__":
    import uvicorn
    # Run the FastAPI app using Uvicorn, accessible on host 0.0.0.0 (all network interfaces) and port 8000
    uvicorn.run(app, host="0.0.0.0", port=8000)