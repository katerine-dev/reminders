def create(cur, message):
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


def update(cur, id, new_message):
    cur.execute(
        """
        UPDATE reminder
        SET
            message = %s,
            updated_at = NOW()
        WHERE id = %s
        AND deleted_at IS NULL
        """,
        (new_message, id)
    )

def get_by_id(cur, id):
    cur.execute(
        """
        SELECT id, message, updated_at FROM reminder
        WHERE id = %s 
        AND deleted_at IS NULL
        """,
        (id,)
    )
    data = cur.fetchone()
    return data

def get_all(cur):
    cur.execute(
        """
        SELECT id, message, updated_at FROM reminder
        WHERE deleted_at IS NULL
        """,
    )
    data = cur.fetchall()
    return data

#Soft deletes = instead of soft deleting the reminder, we update the deleted_at attribute
def delete(cur, id):
    cur.execute(
        """
        UPDATE reminder
        SET
            deleted_at = NOW()
        WHERE id = %s
        """,
        (id,) 
    )
