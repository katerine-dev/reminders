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
      const processedData = data.map((reminder) => ({
        ...reminder,
        isCompleted: reminder.completed_at !== null,
      })); // If the completed_at field is not null, it means the task is complete
      setReminders(processedData);
    } catch (error) {
      console.error("Erro ao buscar lembretes:", error);
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
  async function onReminderClick(reminderId) {
    try {
      const currentReminder = reminders.find(
        (reminder) => reminder.id === reminderId
      );

      if (!currentReminder) {
        throw new Error("Lembrete não encontrado");
      }

      // Change the state for isCompleted
      const isCompleted = !currentReminder.isCompleted;

      // If the reminder is marked as complete, we set the value of completed_at to the current date and time.
      // If it is marked as incomplete, we set it to null.
      // converts a date to a string in ISO 8601 format
      const completedAt = isCompleted ? new Date().toISOString() : null;

      // Call updateReminder for update the backend
      await updateReminder(reminderId, currentReminder.message, completedAt);

      // Find all the reminders again and change (update) the state.
      await fetchReminders();
    } catch (error) {
      console.error("Erro ao atualizar o lembrete:", error);
    }
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

  // Function to CLEAR ALL completed reminders
  async function clearAllCompleted() {
    try {
      const completedReminders = reminders.filter(
        (reminder) => reminder.isCompleted
      ); // Filtrar lembretes completados

      // Deletar cada lembrete completado usando deleteReminder
      await Promise.all(
        completedReminders.map(async (reminder) => {
          await deleteReminder(reminder.id); // Chama a função de deletar que você já tem
        })
      );

      console.debug("Todas as tarefas completadas foram deletadas.");
      await fetchReminders(); // Atualiza a lista de lembretes após a remoção
    } catch (error) {
      console.error("Erro ao limpar as tarefas completadas:", error);
    }
  }

  return (
    <div className="bg-background bg-cover bg-center min-h-screen flex flex-col justify-between p-6">
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
      <div className="p-4 w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
