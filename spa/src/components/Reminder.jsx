import { Trash } from "lucide-react";

function Reminder({ reminder, onReminderClick, onDeleteReminderClick }) {
  return (
    <ul className="space-y-4 p-5 bg-slate-200 rounded-md shadow">
      {reminder.map((reminder) => (
        <li key={reminder.id} className="flex gap-2">
          <button
            onClick={() => onReminderClick(reminder.id)}
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
              reminder.isCompleted && `line-through`
            }`}
          >
            {reminder.title}
          </button>
          <input
            type="checkbox"
            checked={reminder.isCompleted}
            onChange={() => onReminderClick(reminder.id)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <button
            onClick={() => onDeleteReminderClick(reminder.id)}
            className="bg-slate-400 text-white p-2 rounded-md"
          >
            <Trash />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Reminder;
