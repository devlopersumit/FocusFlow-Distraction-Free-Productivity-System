const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

// Create task
router.post('/', createTask);

// Get tasks for the authenticated user
router.get('/', getTasks);

// Update task by id
router.put('/:id', updateTask);

// Delete task by id
router.delete('/:id', deleteTask);

module.exports = router;


