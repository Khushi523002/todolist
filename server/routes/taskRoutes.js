const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Get tasks
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// Add task
router.post('/', auth, async (req, res) => {
  const newTask = new Task({ ...req.body, user: req.user.id });
  await newTask.save();
  res.json(newTask);
});

// Toggle complete
router.put('/complete/:id', auth, async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;
