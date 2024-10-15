from reminders.model.reminder import Reminder
from uuid import UUID
import psycopg

def _create_reminder(reminder_tuple: tuple):
    return Reminder(
        id=reminder_tuple[0],
        message=reminder_tuple[1],
        updated_at=reminder_tuple[2],
        completed_at=reminder_tuple[3],
        deleted_at=reminder_tuple[4]
    )

def create(cur: psycopg.Cursor, message: str):
    cur.execute(
        """
        INSERT INTO reminder (
            message, 
            updated_at
        )
        VALUES (
            %s,
            NOW()
        )
        RETURNING id
        """,
        (message,)
    )
    id = cur.fetchone()[0]
    return id

def update(cur: psycopg.Cursor, id: UUID, new_message: str, completed_at):
    cur.execute(
        """
        UPDATE reminder
        SET
            message = %s,
            completed_at = %s,
            updated_at = NOW()
        WHERE id = %s
        AND deleted_at IS NULL
        """,
        (new_message,completed_at, id)
    )

def get_by_id(cur: psycopg.Cursor, id: UUID):
    cur.execute(
        """
        SELECT id, message, updated_at, completed_at, deleted_at FROM reminder
        WHERE id = %s 
        """,
        (id,)
    )
    data = cur.fetchone()
    if data is not None:
        return _create_reminder(data)

def get_all(cur: psycopg.Cursor):
    cur.execute(
        """
        SELECT id, message, updated_at, completed_at, deleted_at FROM reminder
        WHERE deleted_at IS NULL
        """
    )
    data = cur.fetchall()
    reminders_list = []
    for reminder in data:
        reminders_list.append(_create_reminder(reminder))
    return reminders_list

def delete(cur: psycopg.Cursor, id: UUID):
    cur.execute(
        """
        UPDATE reminder
        SET
            deleted_at = NOW()
        WHERE id = %s
        """,
        (id,)
    )
