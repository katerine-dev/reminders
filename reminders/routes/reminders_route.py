from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, StrictStr
from typing import List
from uuid import UUID

from reminders.db import reminder as db_reminder
from reminders.db import connection as db_connection
from reminders.model.reminder import Reminder


router = APIRouter()

conn = db_connection.get_connection()
cur = conn.cursor()


class CreateReminderPayload(BaseModel):
    message: StrictStr  # dont accept empty string


class CreateReminderResponse(BaseModel):
    id: UUID


@router.post("/reminders", status_code=201, response_model=CreateReminderResponse)
def create(reminder: CreateReminderPayload):
    id = db_reminder.create(cur, reminder.message)
    return {"id": id}


@router.get("/reminders", response_model=List[Reminder])
def get_all_reminders():
    return db_reminder.get_all(cur)


@router.get("/reminders/{id}", response_model=Reminder)
def get_by_id(id: UUID):
    reminder = db_reminder.get_by_id(cur, id)

    if not reminder:
        raise HTTPException(status_code=404)

    return reminder


@router.delete("/reminders/{id}", status_code=204)
def delete(id: UUID):
    return db_reminder.delete(cur, id)


class UpdateReminderPayload(BaseModel):
    new_message: StrictStr

@router.put("/reminders/{id}", status_code=204)
def update(id: UUID, new_reminder: UpdateReminderPayload):
    return db_reminder.update(cur, id, new_reminder.new_message)
