const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  frequency: String,
  streaks: [{ date: Date }],
});

module.exports = mongoose.model("Habit", habitSchema);
