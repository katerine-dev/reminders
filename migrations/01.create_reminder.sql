CREATE TABLE reminder (
   id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   message    TEXT NOT NULL,
   updated_at TIMESTAMP NOT NULL DEFAULT now(),
   deleted_at TIMESTAMP
);