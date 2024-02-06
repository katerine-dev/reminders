from datetime import datetime
from pydantic import BaseModel, StrictStr
from uuid import UUID

class Reminder(BaseModel):
    id: UUID
    message: StrictStr
    updated_at: datetime