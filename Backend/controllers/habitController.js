const Habit = require("../models/Habit");

exports.createHabit = async (req, res) => {
  const { title, frequency } = req.body;
  try {
    const habit = await Habit.create({
      user: req.userId,
      title,
      frequency,
      streaks: [],
    });
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: "Could not create habit" });
  }
};

exports.getHabits = async (req, res) => {
  const habits = await Habit.find({ user: req.userId });
  res.status(200).json(habits);
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
