import React, { useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import { updateTodoTextAPI } from "../api/todo";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos(); // Fetch todos from the backend
      setTodos(response.data.todos); // Update the state
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  const handleTodoAdded = (todo: any) => setTodos((prev) => [...prev, todo]);

  const handleTodoDeleted = (id: string) =>
    setTodos((prev) => prev.filter((todo) => todo._id !== id));

  const handleTodoUpdated = (id: string, newText: string) =>
    setTodos((prev) =>
      prev.map((todo) => (todo._id === id ? { ...todo, title: newText } : todo))
    );

  return (
    <div className="z-10">
      <AddTodoForm onTodoAdded={handleTodoAdded} />
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={handleTodoDeleted}
          onUpdate={handleTodoUpdated}
        />
      ))}
    </div>
  );
};

export default TodoList;
