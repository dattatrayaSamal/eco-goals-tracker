import { useState } from "react";
import { api } from "../api";

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addHabit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const res = await api.post("/habits", { title, frequency });
      onAdd(res.data); // Pass the new habit to parent
      setTitle("");
      setFrequency("daily");
    } catch (err) {
      console.error("Failed to add habit:", err);
      setError("Failed to add habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={addHabit}
      className="flex flex-col gap-4 bg-white p-4 rounded shadow-md"
    >
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Use reusable water bottle"
          className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 text-white rounded transition ${
          loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Adding..." : "Add Habit"}
      </button>
    </form>
  );
}
