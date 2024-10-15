from reminders.model.reminder import Reminder
from uuid import UUID
import psycopg2

# CREATE A CRUD FOR REMINDER
def _create_reminder(reminder_tuple: tuple):
    return Reminder(
        id=reminder_tuple[0],
        message=reminder_tuple[1],
        updated_at=reminder_tuple[2],
        completed_at=reminder_tuple[3]
    )


# Create a new reminder and return its ID
def create(cur: psycopg2.extensions.cursor, message: str):
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
        (message,) # tupla
    )
    id = cur.fetchone()[0]
    return id

# Update the message of an existing reminder and set its `updated_at` to the current timestamp
def update(cur:psycopg2.extensions.cursor, id: UUID, new_message: str):
    cur.execute(
        """
        UPDATE reminder
        SET
            message = %s,
            completed = %s,
            updated_at = NOW()

        WHERE id = %s
        AND deleted_at IS NULL
        """,
        (new_message, id)
    )

# Retrieve a reminder by its ID, returning `None` if it is soft deleted
def get_by_id(cur: psycopg2.extensions.cursor, id: UUID):
    cur.execute(
        """
        SELECT id, message, updated_at, completed_at FROM reminder
        WHERE id = %s 
        """,
        (id,)
    )
    data = cur.fetchone()
    if data is not None:
        return _create_reminder(data)

# Retrieve all reminders that have not been soft deleted
def get_all(cur):
    cur.execute(
        """
        SELECT id, message, updated_at, completed_at FROM reminder
        WHERE deleted_at IS NULL
        """,
    )
    data = cur.fetchall()
    
    reminders_list = []
    for reminder in data:
        reminders_list.append(_create_reminder(reminder))
    return reminders_list

#Soft deletes = instead of soft deleting the reminder, we update the deleted_at attribute
def delete(cur: psycopg2.extensions.cursor, id: UUID):
    cur.execute(
        """
        UPDATE reminder
        SET
            deleted_at = NOW()
        WHERE id = %s
        """,
        (id,) 
    )
