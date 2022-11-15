const express = require("express");
const router = express.Router();
const {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
} = require("../controller/goalController");
const { protect } = require("../middleware/authMiddleWare");
router.get("/", protect, getGoals);
router.post("/", protect, addGoals);
router.put("/:id", protect, updateGoals);
router.delete("/:id", protect, deleteGoals);

module.exports = router;
