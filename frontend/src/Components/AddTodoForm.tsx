import React, { useState } from "react";
import { createTodo } from "../api/todos";

interface Props {
  onTodoAdded: (todo: any) => void;
}

const AddTodoForm: React.FC<Props> = ({ onTodoAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("handlesubmit")
    if (!title.trim()) return;

    const newTodo = await createTodo(title);
    onTodoAdded(newTodo);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  );
};

export default AddTodoForm;
