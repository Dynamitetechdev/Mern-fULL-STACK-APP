const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserData,
} = require("../controller/userController");

const { protect } = require("../middleware/authMiddleWare");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, getUserData);
module.exports = router;
