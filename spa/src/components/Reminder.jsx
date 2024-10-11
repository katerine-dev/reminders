import { Trash } from "lucide-react";

function Reminder({ reminder, onReminderClick, onDeleteReminderClick }) {
  return (
    <ul className="space-y-1 p-5 bg-white rounded-lg shadow-2xl">
      {reminder.map((reminder) => (
        <li
          key={reminder.id}
          className="flex items-center gap-2 bg-custom-green-low-trans rounded-md"
        >
          <button
            onClick={() => onReminderClick(reminder.id)}
            className={`text-left w-full text- p-2 rounded-md ${
              reminder.isCompleted && `line-through`
            }`}
          >
            {reminder.message}
          </button>
          <input
            type="checkbox"
            checked={reminder.isCompleted}
            onChange={() => onReminderClick(reminder.id)}
            className="h-6 w-6 accent-custom-green-high"
          />
          <button
            onClick={() => onDeleteReminderClick(reminder.id)}
            className="text-white p-2 rounded-md"
          >
            <Trash />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Reminder;
