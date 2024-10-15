// FETCH FOR GET ALL REMINDERS
export async function getReminders() {
  try {
    const response = await fetch("http://localhost:8000/reminders", {
      // request http using fetch
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching reminders: " + response.statusText);
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
}

// FETCH FOR CREATE A REMINDER
export async function createReminder(message) {
  try {
    const response = await fetch("http://localhost:8000/reminders", {
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
    console.debug("Server response:", data); // Certifique-se de que o `message` está aqui
    return data;
  } catch (error) {
    console.error("Error creating reminders:", error);
    throw error;
  }
}

// FETCH FOR DELETE A REMINDER
export async function deleteReminder(id) {
  try {
    const response = await fetch(`http://localhost:8000/reminders/${id}`, {
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
