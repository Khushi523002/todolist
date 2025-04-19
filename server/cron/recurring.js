const cron = require('node-cron');
const Task = require('../models/Task');

cron.schedule('0 0 * * *', async () => {
  const recurringTasks = await Task.find({ recurring: true });
  recurringTasks.forEach(async task => {
    const newTask = new Task({
      ...task.toObject(),
      _id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
    await newTask.save();
  });
  console.log('Recurring tasks duplicated ✔️');
});
