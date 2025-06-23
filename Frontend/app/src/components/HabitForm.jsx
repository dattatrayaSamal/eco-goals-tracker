import React from "react";
import API from "../api";
import { useState } from "react";

export default function HabitForm() {
  const [habit, setHabit] = useState({ title: "", frequency: "Daily" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/habit", habit);
    setHabit({ title: "", frequency: "Daily" });
    window.location.reload();
  };

  return (
    <form onClick={submit}>
      <input
        type="text"
        placeholder="Habit Title"
        value={habit.title}
        onChange={(e) => setHabit({ ...habit, title: e.target.value })}
      />
      <select
        onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
      >
        <option>Daily</option>
        <option>Weekly</option>
      </select>
      <button>Add Habit</button>
    </form>
  );
}
