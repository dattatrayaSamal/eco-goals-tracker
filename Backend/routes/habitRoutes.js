const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createHabit,
  getHabits,
  trackHabit,
  deleteHabit,
} = require("../controllers/habitController");

router.post("/", auth, createHabit);
router.get("/", auth, getHabits);
router.put("/:id/track", auth, trackHabit);
router.delete("/:id", auth, deleteHabit);

module.exports = router;
