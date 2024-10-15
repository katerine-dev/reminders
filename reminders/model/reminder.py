from datetime import datetime
from pydantic import BaseModel, StrictStr
from uuid import UUID

# This model represents a Reminder entity, which includes its ID, message, and updated timestamp.
class Reminder(BaseModel):
    id: UUID
    message: StrictStr # The reminder's message, which must be a non-empty string
    updated_at: datetime 
    completed_at: datetime  | None
    deleted_at: datetime  | None