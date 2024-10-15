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

  // Define fetchReminders outside of useEffect so it can be called elsewhere
  async function fetchReminders() {
    try {
      const data = await getReminders();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  }

  // Fetch reminders when the component mounts
  useEffect(() => {
    fetchReminders();
  }, []); // Empty dependency array to run only on mount

  // CREATE A REMINDER
  async function onAddReminderSubmit(message) {
    try {
      await createReminder(message);
      console.debug("New reminder created.");

      // Fetch all reminders again to update the state
      await fetchReminders();
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  }

  // MARK TASK AS COMPLETED
  function onReminderClick(reminderId) {
    const newReminder = reminders.map((reminder) => {
      if (reminder.id === reminderId) {
        return { ...reminder, isCompleted: !reminder.isCompleted };
      }
      return reminder;
    });
    setReminders(newReminder);
  }

  // UPDATE A REMINDER
  async function onUpdateReminderMessage(reminderId, newMessage) {
    try {
      const currentReminder = reminders.find(
        (reminder) => reminder.id === reminderId
      );

      if (!currentReminder) {
        throw new Error("Reminder not found");
      }

      await updateReminder(
        reminderId,
        newMessage,
        currentReminder.completed_at
      );

      // Fetch all reminders again to get the updated data
      await fetchReminders();
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  }

  // DELETE REMINDER
  async function onDeleteReminderClick(reminderId) {
    try {
      await deleteReminder(reminderId);

      // Fetch all reminders again to update the state
      await fetchReminders();
    } catch (error) {
      console.error("Erro ao deletar lembrete:", error);
    }
  }

  // Function to clear all completed reminders
  async function clearAllCompleted() {
    try {
      // Optionally, if you have an API endpoint to delete all completed reminders
      // await deleteCompletedReminders();
      await fetchReminders();
    } catch (error) {
      console.error("Erro ao limpar lembretes completados:", error);
    }
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
