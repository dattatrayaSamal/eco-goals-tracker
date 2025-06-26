import { useState } from "react";
import { api } from "../api";
import dayjs from "dayjs";

export default function HabitList({ habits, onDelete, loading }) {
  const [tracking, setTracking] = useState({});
  const [deleting, setDeleting] = useState({});

  const trackHabit = async (id) => {
    try {
      setTracking((prev) => ({ ...prev, [id]: true }));
      await api.put(`/habits/${id}/track`);
      onDelete(); // Refresh the list
    } catch (err) {
      console.error("Failed to track habit:", err);
    } finally {
      setTracking((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting((prev) => ({ ...prev, [id]: true }));
      await api.delete(`/habits/${id}`);
      onDelete(); // Refresh the list
    } catch (err) {
      console.error("Failed to delete habit:", err);
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }));
    }
  };

  const isTrackedToday = (habit) => {
    if (!habit.streaks || !habit.streaks.length) return false;
    const today = dayjs().format("YYYY-MM-DD");
    return habit.streaks.some(
      (date) => dayjs(date).format("YYYY-MM-DD") === today
    );
  };

  if (loading)
    return <p className="text-center py-4">Loading your eco-habits...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-700">
        🌿 Your Sustainable Habits
      </h2>

      {habits.length === 0 ? (
        <p className="text-gray-500 italic">
          No habits yet. Add your first eco-friendly habit!
        </p>
      ) : (
        <ul className="space-y-3">
          {habits.map((habit) => (
            <li
              key={habit._id}
              className="flex justify-between items-center bg-white border border-green-200 p-4 rounded-md hover:shadow-sm transition"
            >
              <div className="flex-1">
                <p className="font-semibold text-green-800">{habit.title}</p>
                <p className="text-sm text-gray-500">
                  🔥 Streak: {habit.streaks?.length || 0} days
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => trackHabit(habit._id)}
                  disabled={isTrackedToday(habit) || tracking[habit._id]}
                  className={`px-3 py-1 text-sm rounded ${
                    isTrackedToday(habit)
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {tracking[habit._id]
                    ? "..."
                    : isTrackedToday(habit)
                    ? "Done today"
                    : "Track"}
                </button>

                <button
                  onClick={() => handleDelete(habit._id)}
                  disabled={deleting[habit._id]}
                  className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 disabled:opacity-50"
                >
                  {deleting[habit._id] ? "..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
