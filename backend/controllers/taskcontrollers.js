import Task from '../models/Task.model.js';
import TodoList from '../models/ToDo.model.js';

const addTask = async (req, res) => {
  const { todoId } = req.params;
  const { title, content, assignedBy, assignedTo, priority, dueDate } = req.body;

  try {
    const newTask = new Task({ title, content, assignedBy, assignedTo, priority, dueDate });
    await newTask.save();

    const todoList = await TodoList.findById(todoId);
    todoList.tasks.push(newTask);
    await todoList.save();
    req.io.to(todoId).emit('task:update', { action: 'add', data: newTask });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

export { addTask };