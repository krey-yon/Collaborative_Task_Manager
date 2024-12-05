import React from "react";
import { deleteTodo } from "../api/todos";
import CollaboratorForm from "./CollaboratorForm";

interface Props {
  todo: any;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    await deleteTodo(todo._id);
    onDelete(todo._id);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{todo.title}</h3>
        <button onClick={handleDelete} className="btn btn-error">
          Delete
        </button>
        <CollaboratorForm todoId={todo._id} />
      </div>
    </div>
  );
};

export default TodoItem;
