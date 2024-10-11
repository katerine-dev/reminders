import { useState } from "react";
import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";
import { v4 } from "uuid";

function App() {
  const [reminder, setReminder] = useState([
    {
      id: 1,
      message: "Buy groceries",
      isCompleted: false,
    },
    {
      id: 2,
      message: "Finish project report",
      isCompleted: false,
    },
    {
      id: 3,
      message: "Schedule doctor appointment",
      isCompleted: false,
    },
    {
      id: 4,
      message: "Exercise",
      isCompleted: false,
    },
    {
      id: 5,
      message: "Read a book",
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

  // ADICIONAR UMA TAREFA
  function onAddReminderSubmit(message) {
    const newReminder = {
      id: v4(),
      message,
      isCompleted: false,
    };
    /*coloco tudo que estava no reminder e no newReminder*/
    setReminder([...reminder, newReminder]);
  }

  return (
    <div className="w-screen h-screen bg-background bg-cover bg-center flex justify-center p-6">
      {/*O theme está no módulo de configuração do tailwind, o responsável em fazer o thema aparever é bg-background*/}
      <div className="w-[500px] space-y-3">
        <h1 className="text-6xl text-white font-bold text-center drop-shadow-lg">
          Reminders
        </h1>
        <AddReminder onAddReminderSubmit={onAddReminderSubmit} />
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
