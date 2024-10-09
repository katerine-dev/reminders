import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";

function App() {
  return (
    <div className="w-screen h-screen bg-background bg-cover bg-center flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-6xl text-white font-bold text-center drop-shadow-lg">
          Reminders
        </h1>
        <AddReminder />
        <Reminder />
      </div>
    </div>
  );
}

export default App;
