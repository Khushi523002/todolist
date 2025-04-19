const mongoose = require('mongoose');

const SubtaskSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  category: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: Date,
  completed: { type: Boolean, default: false },
  recurring: { type: Boolean, default: false },
  subtasks: [SubtaskSchema],
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
