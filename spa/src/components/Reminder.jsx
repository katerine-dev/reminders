import { useState } from "react";
import { Trash, ChevronDown, ChevronUp } from "lucide-react";

function Reminder({
  reminder,
  onReminderClick,
  onDeleteReminderClick,
  clearAllCompleted,
  onUpdateReminderMessage,
}) {
  // State for control dropdown and update message
  const [isCompletedVisible, setIsCompletedVisible] = useState(true);
  const [editingId, UpdateById] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // Filter for reminders completed and active
  const completedReminders = reminder.filter((r) => r.isCompleted);
  const activeReminders = reminder.filter((r) => !r.isCompleted);

  // Function for star update a message
  function handleEdit(reminderId, message) {
    UpdateById(reminderId);
    setNewMessage(message);
  }

  // Function for dave a new message
  function handleSave(reminderId) {
    if (newMessage.trim() !== "") {
      onUpdateReminderMessage(reminderId, newMessage);
    }
    UpdateById(null);
  }

  return (
    <div>
      {/* Conditionally render "NEWS" section if there are active reminders */}
      {activeReminders.length > 0 && (
        <ul className="space-y-1 p-5 bg-white rounded-lg shadow-2xl">
          <h2 className="text-sm font-medium mb-4 text-custom-green-high">
            News
          </h2>
          <div className="space-y-1">
            {activeReminders.map(({ id, message, isCompleted }) => (
              <li
                key={id}
                className="flex items-center gap-2 bg-custom-green-low-trans rounded-md"
              >
                {/* Lógica de edição */}
                {editingId === id ? (
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="text-left w-full p-2 rounded-md bg-white border"
                      onBlur={() => handleSave(id)}
                    />
                  </div>
                ) : (
                  <button
                    className={`text-left w-full p-2 rounded-md ${
                      isCompleted ? "line-through" : ""
                    }`}
                    onClick={() => handleEdit(id, message)}
                  >
                    {message}
                  </button>
                )}
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => onReminderClick(id)}
                  className="h-6 w-6 accent-custom-green-high"
                />
                <button
                  onClick={() => onDeleteReminderClick(id)}
                  className="p-2 rounded-md text-custom-green-high"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </li>
            ))}
          </div>
        </ul>
      )}

      {/* Button to show or hide "COMPLETED" reminders */}
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
                {completedReminders.map(({ id, message }) => (
                  <li
                    key={id}
                    className="flex items-center gap-2 bg-custom-green-low-trans rounded-md"
                  >
                    <button
                      className="text-left w-full p-2 rounded-md line-through"
                      onClick={() => onReminderClick(id)}
                    >
                      {message}
                    </button>
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => onReminderClick(id)}
                      className="h-6 w-6 accent-custom-green-high"
                      readOnly
                    />
                    <button
                      onClick={() => onDeleteReminderClick(id)}
                      className="p-2 rounded-md text-custom-green-high"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Button to "CLEAR ALL" completed reminders */}
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
