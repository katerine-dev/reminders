// FETCH FOR GET ALL REMINDERS
export async function getReminders() {
  try {
    const response = await fetch("/reminders", {
      // request http using fetch
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error fetching reminders: " + response.statusText);
    }

    const data = await response.json(); // Convert the response to JSON
    return data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
}

// FETCH FOR CREATE A REMINDER
export async function createReminder(message) {
  try {
    const response = await fetch("/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Error creating reminders: " + response.statusText);
    }

    const data = await response.json();
    console.debug("Server response:", data);
    return data;
  } catch (error) {
    console.error("Error creating reminders:", error);
    throw error;
  }
}

// FETCH FOR UPDATE
export async function updateReminder(id, newMessage, completedAt) {
  try {
    const response = await fetch(`/reminders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        new_message: newMessage,
        completed_at: completedAt,
      }),
    });
    console.log(completedAt);
    if (!response.ok) {
      throw new Error("Error updating reminder: " + response.statusText);
    }
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw error;
  }
}

// FETCH FOR DELETE A REMINDER
export async function deleteReminder(id) {
  try {
    const response = await fetch(`/reminders/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting reminders: " + response.statusText);
    }
  } catch (error) {
    console.error("Error deleting reminders:", error);
    throw error;
  }
}
