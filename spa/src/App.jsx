import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";

function App() {
  return (
    <div className="w-screen h-scree bg-slate-500 flex justify-center p-6">
      <h1 className="text-green-500 text-3xl">Reminders</h1>
      <AddReminder />
      <Reminder />
    </div>
  );
}

export default App;
