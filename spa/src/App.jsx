import { useState, useEffect } from "react";
import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";
import { v4 } from "uuid";

function App() {
  const [reminder, setReminder] = useState([]); //lista

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

  useEffect(() => {
    async function fetchReminders() {
      // CHAMAR A API
      const response = await fetch("http://localhost:8000/reminders", {
        method: "GET",
      }); // URL do seu backend
      const data = await response.json();
      setReminder(data);
      console.log(data);
      // PEGAR OS DADOS QUE ELA RETORNA

      //ARMAZENAR/PERSISTIR ESSES DADOS NO STATE
    }
    fetchReminders();
  }, []);

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
