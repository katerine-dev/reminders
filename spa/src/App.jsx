import { useState, useEffect } from "react";
import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";
import Footer from "./components/Footer";
import {
  createReminder,
  getReminders,
  deleteReminder,
  updateReminder,
} from "/services/reminderService";

function App() {
  const [reminders, setReminders] = useState([]);

  // ADD A REMINDER
  async function onAddReminderSubmit(message) {
    try {
      const newReminder = await createReminder(message);
      console.debug("New reminder created:", newReminder); // Check if `message` and `id` are here
      setReminders([...reminders, newReminder]);
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  }
  // Fetch reminders from API using Fetch
  useEffect(() => {
    async function fetchReminders() {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (error) {
        console.error("Error creating reminders:", error);
      }
    }
    fetchReminders();
  }, [reminders]);

  // MARK TASK AS COMPLED
  function onReminderClick(reminderId) {
    const newReminder = reminders.map((reminder) => {
      // I need to update this task
      if (reminder.id == reminderId) {
        return { ...reminder, isCompleted: !reminder.isCompleted };
      }

      // No need to update this task
      return reminder;
    });
    setReminders(newReminder); // Update the state with the modified reminders
  }

  // UPDATE A REMINDER
  async function onUpdateReminderMessage(reminderId, newMessage) {
    try {
      // Find the current reminder
      const currentReminder = reminders.find(
        (reminder) => reminder.id === reminderId
      );

      if (!currentReminder) {
        throw new Error("Reminder not found");
      }

      // Call the updateReminder service
      await updateReminder(
        reminderId,
        newMessage,
        currentReminder.completed_at
      );

      // Update the state by mapping over the existing reminders
      const updatedReminders = reminders.map((reminder) =>
        reminder.id === reminderId
          ? { ...reminder, message: newMessage } // Update only the message field
          : reminder
      );

      // Set the updated reminders in the state
      setReminders(updatedReminders);
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  }

  // DELETE REMINDER
  async function onDeleteReminderClick(reminderId) {
    try {
      const newReminder = reminders.filter(
        (reminder) => reminder.id !== reminderId
      );
      await deleteReminder(reminderId);
      setReminders(newReminder);
    } catch (error) {
      console.error("Erro ao deletar lembrete:", error);
    }
  }

  // Function to clear all completed reminders
  function clearAllCompleted() {
    const newReminder = reminders.filter((reminder) => !reminder.isCompleted);
    setReminders(newReminder);
  }

  return (
    <div className="w-screen h-screen bg-background bg-cover bg-center flex flex-col justify-between p-6">
      <div className="flex-grow">
        <div className="w-[500px] space-y-3 mx-auto">
          <h1 className="text-6xl text-white font-bold text-center drop-shadow-lg">
            Reminders
          </h1>
          <AddReminder onAddReminderSubmit={onAddReminderSubmit} />
          <Reminder
            reminder={reminders}
            onReminderClick={onReminderClick}
            onDeleteReminderClick={onDeleteReminderClick}
            clearAllCompleted={clearAllCompleted}
            onUpdateReminderMessage={onUpdateReminderMessage}
          />
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
