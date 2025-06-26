const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  const { title, frequency } = req.body;

  try {
    const habit = await Habit.create({
      user: req.user.id,
      title,
      frequency: frequency || "daily",
      streaks: [],
    });
    res.status(201).json(habit);
  } catch (err) {
    console.error("Error creating habit:", err);
    res
      .status(400)
      .json({ error: "Could not create habit", details: err.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user.id });
    res.status(200).json(habits);
  } catch (err) {
    console.error("Error fetching habits:", err);
    res.status(500).json({ error: "Could not fetch habits" });
  }
};

exports.trackHabit = async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await Habit.findById(id);
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    habit.streaks.push({ date: new Date() });
    await habit.save();
    res.status(200).json(habit);
  } catch (err) {
    res.status(500).json({ error: "Could not track habit" });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // only delete if it belongs to logged-in user
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ message: "Server error" });
  }
};
