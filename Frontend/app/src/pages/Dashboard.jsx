import { useState, useEffect } from "react";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import StreakCalendar from "../components/StreakCalendar";
import Navbar from "../components/Navbar";
import { api } from "../api";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/habits");
      setHabits(res.data);
    } catch (err) {
      console.error("Failed to fetch habits", err);
      setError("Failed to load habits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (newHabit) => {
    try {
      const res = await api.post("/habits", newHabit);
      setHabits((prev) => [...prev, res.data]); // Optimistic update
    } catch (err) {
      console.error("Failed to add habit:", err);
      fetchHabits(); // Fallback to refetch if optimistic update fails
      throw err; // Re-throw to let HabitForm handle the error
    }
  };

  return (
    <div>
      <Navbar />
      <main className="p-4 space-y-6 max-w-3xl mx-auto">
        <HabitForm onAdd={handleAddHabit} />

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
            <p>{error}</p>
          </div>
        )}

        <HabitList
          habits={habits}
          onDelete={() => fetchHabits()}
          loading={loading}
        />
        <StreakCalendar habits={habits} />
      </main>
    </div>
  );
}
