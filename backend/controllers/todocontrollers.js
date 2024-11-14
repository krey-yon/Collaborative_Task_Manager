import Todo from "../models/ToDo.model.js";

const handleCreateTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({
      title: title,
    });
    await todo.save();

    res.status(201).json({ message: "Todo created successfully", list :todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleDeleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) return res.status(404).json({ error: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCollaborator = async (req, res) => {
  const { todoId, userId } = req.body;

  try {
    const todoList = await Todo.findById(todoId);
    if (!todoList.collaborators.includes(userId)) {
      todoList.collaborators.push(userId);
      await todoList.save();
    }
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: 'Error adding collaborator' });
  }
};

const removeCollaborator = async (req, res) => {
  const { todoId, userId } = req.body;

  try {
    const todoList = await Todo.findById(todoId);
    const index = todoList.collaborators.indexOf(userId);
    if (index > -1) {
      todoList.collaborators.splice(index, 1);
      await todoList.save();
    }
    res.status(200).json(todoList);
  }
  catch (error) {
    res.status(500).json({ error: 'Error removing collaborator' });
  }
}

export { handleCreateTodo, handleGetTodos, handleDeleteTodo, addCollaborator, removeCollaborator };
