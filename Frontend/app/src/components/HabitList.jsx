import { useEffect, useState } from "react";
import API from "../api";

export default function HabitList() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    API.get("/habit")
      .then((res) => setHabits(res.data))
      .catch((err) => console.error(err));
  }, []);

  const track = async (id) => {
    await API.put(`/habit/${id}/track`);
    window.location.reload();
  };

  return (
    <div>
      <h3>Your Habits</h3>
      {habits.map((h) => (
        <div key={h._id}>
          <strong>{h.title}</strong> ({h.frequency})
          <button onClick={() => track(h._id)}>✓ Mark Today</button>
          <p>Streaks: {h.streaks.length}</p>
        </div>
      ))}
    </div>
  );
}
