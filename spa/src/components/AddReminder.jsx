import { useState } from "react";

function AddReminder({ onAddReminderSubmit }) {
  // para o input da messagem vamos criar um estado
  const [message, setMessage] = useState("");
  return (
    <div className="flex space-y-4 p-6 bg-white rounded-lg shadow-2xl">
      <input
        type="text"
        placeholder="Write your reminder..."
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></input>
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
