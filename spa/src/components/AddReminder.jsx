import { useState } from "react";

function AddReminder({ onAddReminderSubmit }) {
  // Create a state variable 'message' to store the user's input and set its initial value to an empty string
  const [message, setMessage] = useState("");
  return (
    <div className="flex items-center space-x-1 p-6 bg-white rounded-lg shadow-2xl">
      <input
        type="text"
        placeholder="Write your reminder..."
        className="flex-grow border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></input>

      {/* Button to submit the reminder.
      When clicked, checks if the message is not empty, then calls the 'onAddReminderSubmit' function 
      (which is passed from a parent component) to handle the reminder submission.
      After submitting, the input field is cleared by resetting the 'message' state. */}
      <button
        onClick={() => {
          if (!message.trim()) {
            return alert("Fill in the reminder.");
          }
          onAddReminderSubmit(message);
          setMessage("");
        }}
        className="bg-custom-pink-high text-white px-4 py-2 rounded-md font-medium"
      >
        Create
      </button>
    </div>
  );
}

export default AddReminder;
