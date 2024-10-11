import { ChevronRight, Trash } from "lucide-react";

function Reminder({ reminder, onReminderClick, onDeleteClick }) {
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
          <button className="bg-slate-400 text-white p-2 rounded-md">
            <ChevronRight />
          </button>
          <button
            onClick={() => onDeleteClick(reminder.id)}
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
