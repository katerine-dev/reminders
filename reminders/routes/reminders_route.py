from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, StrictStr
from typing import List
from uuid import UUID

from reminders.db import reminder as db_reminder
from reminders.db import connection as db_connection
from reminders.model.reminder import Reminder

# Create an instance of APIRouter to define routes related to reminders
router = APIRouter()

# Establish a database connection and create a cursor to execute SQL queries
conn = db_connection.get_connection()
cur = conn.cursor()

# Pydantic model to validate the payload for creating a new reminder
class CreateReminderPayload(BaseModel):
    message: StrictStr  # dont accept empty string


class CreateReminderResponse(BaseModel):
    id: UUID

# Route to create a new reminder
# Expects a POST request to "/reminders", returns status 201 on success
@router.post("/reminders", status_code=201, response_model=CreateReminderResponse)
def create(reminder: CreateReminderPayload):
    id = db_reminder.create(cur, reminder.message)
    return {"id": id}


# Route to get all reminders
# Expects a GET request to "/reminders" and returns a list of Reminder objects
@router.get("/reminders", response_model=List[Reminder])
def get_all_reminders():
    return db_reminder.get_all(cur)


# Route to get by id reminders
# Expects a GET request to "/reminders" and returns a list of Reminder objects
@router.get("/reminders/{id}", response_model=Reminder)
def get_by_id(id: UUID):
    reminder = db_reminder.get_by_id(cur, id)

    if not reminder:
        raise HTTPException(status_code=404)

    return reminder


# Route to delete by id reminders
# Expects a DELETE request to "/reminders/{id}"
# {id} is a path parameter, which is the UUID of the reminder to be deleted
# Status code 204 indicates that the request was successful but there is no content to return
@router.delete("/reminders/{id}", status_code=204)
def delete(id: UUID):
    return db_reminder.delete(cur, id)

# Validates that the new message provided must be a non-empty string
class UpdateReminderPayload(BaseModel):
    new_message: StrictStr


# Route to update a reminder by its ID
# Expects a PUT request to "/reminders/{id}"
# {id} is a path parameter representing the UUID of the reminder to be updated
# The payload should contain the new message for the reminder
# Status code 204 indicates a successful update without any content to return
@router.put("/reminders/{id}", status_code=204)
def update(id: UUID, new_reminder: UpdateReminderPayload):
    return db_reminder.update(cur, id, new_reminder.new_message)
