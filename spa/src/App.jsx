import AddReminder from "./components/AddReminder";
import Reminder from "./components/Reminder";

function App() {
  return (
    <div>
      <h1 className="text-red-500">Reminders</h1>
      <AddReminder />
      <Reminder />
    </div>
  );
}

export default App;
