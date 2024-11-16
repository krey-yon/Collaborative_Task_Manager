import express from 'express';
import { addTask } from '../controllers/taskcontrollers.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
router.post('/:todoId/tasks', authenticateToken, addTask);

export default router;
