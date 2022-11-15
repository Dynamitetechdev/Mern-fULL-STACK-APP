const asyncHandler = require("express-async-handler");
const goal = require("../model/goalModel");
const User = require("../model/userModel");
// @ desc GET get Goals
//@ route /api/goals
// @ private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await goal.find({ user: req.user.id });
  res.json(goals);
});

// @ desc POST add Goals
//@ route /api/goals
// @ private
const addGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("goals not found");
  }
  const addGoals = await goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(addGoals);
});

// @ desc GET update Goals
//@ route /api/goals/:id
// @ private
const updateGoals = asyncHandler(async (req, res) => {
  // find goal
  const updateGoal = await goal.findById(req.params.id);

  if (!updateGoal) {
    res.status(400);
    throw new Error("No goal to update");
  }

  // Find the user before upadting
  const user = await User.findById(req.user.id);

  // check if user exist
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make the sure the logged in user matches the goqal user
  if (updateGoal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoal = await goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: `update my goal ${req.params.id}` });
});

// @ desc PUT delete Goals
//@ route /api/goals/:id
// @ private
const deleteGoals = asyncHandler(async (req, res) => {
  const deleteGoal = await goal.findById(req.params.id);

  if (!deleteGoal) {
    res.status(400);
    throw new Error("No note to delete");
  }

  // Find the user before upadting
  const user = await User.findById(req.user.id);

  // check if user exist
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make the sure the logged in user matches the goqal user
  if (deleteGoal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  await deleteGoal.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  getGoals,
  addGoals,
  updateGoals,
  deleteGoals,
};
