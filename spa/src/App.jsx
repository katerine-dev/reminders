import { useState } from "react";
import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";

function App() {
  const [reminder, setReminder] = useState([
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, bread, eggs, and fruits",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Finish project report",
      description: "Complete the final draft and send it to the team",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Schedule doctor appointment",
      description: "Call to book an appointment for next week",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Exercise",
      description: "Go for a 30-minute run or workout",
      isCompleted: false,
    },
    {
      id: 5,
      title: "Read a book",
      description: "Finish reading 'The Great Gatsby'",
      isCompleted: false,
    },
  ]); //lista

  // COMPLETAR TAREFA
  function onReminderClick(reminderId) {
    const newReminder = reminder.map((reminder) => {
      // Preciso atualizar essa tarefa
      if (reminder.id == reminderId) {
        return { ...reminder, isCompleted: !reminder.isCompleted };
      }

      // Não precisa atualizar essa tarefa
      return reminder;
    });
    setReminder(newReminder);
  }
  // DELETAR TAREFA
  function onDeleteReminderClick(reminderId) {
    const newReminder = reminder.filter(
      (reminder) => reminder.id != reminderId
    );
    setReminder(newReminder);
  }

  return (
    <div className="w-screen h-screen bg-background bg-cover bg-center flex justify-center p-6">
      {/*O theme está no módulo de configuração do tailwind, o responsável em fazer o thema aparever é bg-background*/}
      <div className="w-[500px]">
        <h1 className="text-6xl text-white font-bold text-center drop-shadow-lg">
          Reminders
        </h1>
        <AddReminder />
        <Reminder
          reminder={reminder}
          onReminderClick={onReminderClick}
          onDeleteReminderClick={onDeleteReminderClick}
        />
      </div>
    </div>
  );
}

export default App;
