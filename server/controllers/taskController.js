const Task = require('../models/Task');

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, tag, isCompleted, date } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const task = await Task.create({
      title: title.trim(),
      tag: tag?.trim() || '',
      isCompleted: Boolean(isCompleted) || false,
      userId: req.user._id,
      date: date ? new Date(date) : undefined,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ success: false, message: 'Failed to create task' });
  }
};

// Get tasks for current user
const getTasks = async (req, res) => {
  try {
    const { tag, completed } = req.query;
    const filter = { userId: req.user._id };
    if (tag) filter.tag = tag;
    if (completed === 'true' || completed === 'false') {
      filter.isCompleted = completed === 'true';
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tasks' });
  }
};

// Update a task (only if owned by user)
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tag, isCompleted, date } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (title !== undefined) task.title = String(title).trim();
    if (tag !== undefined) task.tag = String(tag).trim();
    if (isCompleted !== undefined) task.isCompleted = Boolean(isCompleted);
    if (date !== undefined) task.date = new Date(date);

    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ success: false, message: 'Failed to update task' });
  }
};

// Delete a task (only if owned by user)
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete task' });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };


