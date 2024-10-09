import { ChevronRight } from "lucide-react";

function Reminder(props) {
  return (
    <ul className="space-y-4 p-5 bg-slate-200 rounded-md shadow">
      {props.reminder.map((reminder) => (
        <li key={reminder.id} className="flex gap-2">
          <button
            onClick={() => props.onReminderClick(reminder.id)}
            className="bg-slate-400 text-left w-full text-white p-2 rounded-md"
          >
            {reminder.title}
          </button>
          <button className="bg-slate-400 text-white p-2 rounded-md">
            <ChevronRight />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Reminder;
