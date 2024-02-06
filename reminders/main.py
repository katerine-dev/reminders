from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, StrictStr
from typing import List
from uuid import UUID

from reminders.db import reminder as db_reminder
from reminders.db import connection as db_connection
from reminders.model.reminder import Reminder


app = FastAPI()

conn = db_connection.get_connection()
cur = conn.cursor()

# forces fastapi to return 400 instead of 422 on a request validation error
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request, exception):
    return JSONResponse(exception.errors(), status_code=400)

class CreateReminderPayload(BaseModel):
    message: StrictStr  # dont accept empty string

class CreateReminderResponse(BaseModel):
    id: UUID

@app.post("/reminders", status_code=201, response_model=CreateReminderResponse)
def create(reminder: CreateReminderPayload):
    return db_reminder.create(cur, reminder.message)


@app.get("/reminders", response_model=List[Reminder])
def get_all_reminders():
    return db_reminder.get_all(cur)

@app.get("/reminders/{id}", response_model=Reminder)
def get_by_id(id: UUID):
    return db_reminder.get_by_id(cur, id)

@app.delete("/reminders/{id}", status_code=204)
def delete(id: UUID):
    return db_reminder.delete(cur, id)

class UpdateReminderPayload(BaseModel):
    new_message: StrictStr

@app.put("/reminders/{id}", status_code=204)
def update(id: UUID, new_reminder: UpdateReminderPayload):
    return db_reminder.update(cur, id, new_reminder.new_message)
