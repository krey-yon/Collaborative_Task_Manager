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

export { handleCreateTodo, handleGetTodos, handleDeleteTodo };
