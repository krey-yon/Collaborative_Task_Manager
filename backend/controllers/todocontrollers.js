import Todo from "../models/ToDo.model.js";

const handleCreateTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({
      title: title,
      owner: req.user._id,
    });
    await todo.save();

    res.status(201).json({ message: "Todo created successfully", list :todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      $or: [{ owner: req.user._id }, { collaborators: req.user._id }],
    });
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

const updateTodoText = async (req, res) => {
  const { todoId } = req.params;
  const { text } = req.body;
  const userId = req.user.id; // Extracted from the authenticated token

  // console.log(todoId, text, userId);

  try {
    // Find the todo
    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Check if the user is the owner or a collaborator
    // if (todo.owner.toString() !== userId && !todo.collaborators.includes(userId)) {
    //   return res.status(403).json({ error: "Unauthorized to update this todo" });
    // }

    // Update the todo text
    todo.title = text;
    await todo.save();
    // Notify clients via socket
    req.io.to(todoId).emit("todo:update", { todoId, text });

    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export { handleCreateTodo, handleGetTodos, handleDeleteTodo, addCollaborator, removeCollaborator, updateTodoText };
