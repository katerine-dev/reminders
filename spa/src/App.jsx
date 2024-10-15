import { useState, useEffect } from "react";
import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";
import Footer from "./components/Footer";
import { v4 } from "uuid";

function App() {
  const [reminder, setReminder] = useState([]); //lista

  // MARK TASK AS COMPLED
  function onReminderClick(reminderId) {
    const newReminder = reminder.map((reminder) => {
      // I need to update this task
      if (reminder.id == reminderId) {
        return { ...reminder, isCompleted: !reminder.isCompleted };
      }

      // No need to update this task
      return reminder;
    });
    setReminder(newReminder); // Update the state with the modified reminders
  }
  // DELETE REMINDER
  function onDeleteReminderClick(reminderId) {
    const newReminder = reminder.filter(
      (reminder) => reminder.id != reminderId // Filter out the reminder that needs to be deleted
    );
    setReminder(newReminder);
  }

  // ADD A REMINDER
  function onAddReminderSubmit(message) {
    const newReminder = {
      id: v4(), // Generate a unique ID for the new reminder
      message,
      isCompleted: false, // Set the initial completion status to false
    };
    /*Spread the current reminders and add the new reminder to the list newReminder*/
    setReminder([...reminder, newReminder]);
  }

  // Function to clear all completed reminders
  function clearAllCompleted() {
    const newReminder = reminder.filter((reminder) => !reminder.isCompleted);
    setReminder(newReminder);
  }

  useEffect(() => {
    async function fetchReminders() {
      // CALL THE API
      const response = await fetch("http://localhost:8000/reminders", {
        method: "GET",
      }); // URL of your backend

      // GET THE DATA THAT IT RETURNS
      const data = await response.json();

      // STORE/PERSIST THESE DATA IN THE STATE
      setReminder(data);
    }
    fetchReminders();
  }, []);

  return (
    <div className="w-screen h-screen bg-background bg-cover bg-center flex flex-col justify-between p-6">
      <div className="flex-grow">
        <div className="w-[500px] space-y-3 mx-auto">
          <h1 className="text-6xl text-white font-bold text-center drop-shadow-lg">
            Reminders
          </h1>
          <AddReminder onAddReminderSubmit={onAddReminderSubmit} />
          <Reminder
            reminder={reminder}
            onReminderClick={onReminderClick}
            onDeleteReminderClick={onDeleteReminderClick}
            clearAllCompleted={clearAllCompleted}
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
