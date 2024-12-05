import React, { useState } from "react";
import { addCollaborator, removeCollaborator } from "../api/todos";

interface Props {
  todoId: string;
}

const CollaboratorForm: React.FC<Props> = ({ todoId }) => {
  const [userId, setUserId] = useState("");

  const handleAdd = async () => {
    await addCollaborator(todoId, userId);
    setUserId("");
  };

  const handleRemove = async () => {
    await removeCollaborator(todoId, userId);
    setUserId("");
  };

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Collaborator User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="input input-bordered"
      />
      <button onClick={handleAdd} className="btn btn-primary">
        Add
      </button>
      <button onClick={handleRemove} className="btn btn-error">
        Remove
      </button>
    </div>
  );
};

export default CollaboratorForm;
