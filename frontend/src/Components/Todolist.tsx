import React, { useEffect, useState } from "react";
import { getTodos } from "../api/todos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  const handleTodoAdded = (todo: any) => setTodos((prev) => [...prev, todo]);

  const handleTodoDeleted = (id: string) =>
    setTodos((prev) => prev.filter((todo) => todo._id !== id));

  return (
    <div>
      <AddTodoForm onTodoAdded={handleTodoAdded} />
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={handleTodoDeleted} />
      ))}
    </div>
  );
};

export default TodoList;
