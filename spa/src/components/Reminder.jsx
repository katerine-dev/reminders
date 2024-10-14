import { useState } from "react";
import { Trash, ChevronDown, ChevronUp } from "lucide-react";

function Reminder({
  reminder,
  onReminderClick,
  onDeleteReminderClick,
  clearAllCompleted,
}) {
  // State for control dropdown
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);

  // Filter for reminders completed and active
  const completedReminders = reminder.filter((r) => r.isCompleted);
  const activeReminders = reminder.filter((r) => !r.isCompleted);

  return (
    <div>
      {/* Conditionally render "News" section if there are active reminders */}
      {activeReminders.length > 0 && (
        <ul className="space-y-1 p-5 bg-white rounded-lg shadow-2xl">
          <h2 className="text-sm font-medium mb-4 text-custom-green-high">
            News
          </h2>
          {activeReminders.map((reminder) => (
            <li
              key={reminder.id}
              className="flex items-center gap-2 bg-custom-green-low-trans rounded-md"
            >
              <button
                className={`text-left w-full p-2 rounded-md ${
                  reminder.isCompleted ? "line-through" : ""
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
                className="p-2 rounded-md text-custom-green-high"
              >
                <Trash className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Button to show or hide completed reminders */}
      {completedReminders.length > 0 && (
        <div className="mt-4 p-5 bg-white rounded-lg shadow-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium mb-4 text-custom-green-high">
              Completed Tasks
            </h2>
            <button
              onClick={() => setIsCompletedVisible(!isCompletedVisible)}
              className="text-custom-green-high"
            >
              {isCompletedVisible ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Complete reminder list with dropdown */}
          {isCompletedVisible && (
            <>
              <ul className="space-y-1">
                {completedReminders.map((reminder) => (
                  <li
                    key={reminder.id}
                    className="flex items-center gap-2 bg-custom-green-low-trans rounded-md"
                  >
                    <button
                      className="text-left w-full p-2 rounded-md line-through"
                      onClick={() => onReminderClick(reminder.id)}
                    >
                      {reminder.message}
                    </button>
                    <input
                      type="checkbox"
                      checked={reminder.isCompleted}
                      onChange={() => onReminderClick(reminder.id)}
                      className="h-6 w-6 accent-custom-green-high"
                      readOnly
                    />
                    <button
                      onClick={() => onDeleteReminderClick(reminder.id)}
                      className="p-2 rounded-md text-custom-green-high"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Button to clear all completed reminders */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={clearAllCompleted}
                  className="text-right text-custom-pink-high py-1 font-light underline text-xs"
                >
                  Clear All Completed
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Reminder;
