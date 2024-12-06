import React, { useState } from "react";
import { updateTodoTextAPI, addCollaborator, removeCollaborator } from "../api/todos";

interface TodoItemProps {
  todo: any;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.title);
  const [collaboratorId, setCollaboratorId] = useState("");

  const handleSave = async () => {
    try {
      await updateTodoTextAPI(todo._id, newText); // Call API to update text
      onUpdate(todo._id, newText); // Update in parent component
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating todo text:", error);
    }
  };

  const handleAddCollaborator = async () => {
    try {
      await addCollaborator(todo._id, collaboratorId);
      alert("Collaborator added successfully!");
      setCollaboratorId(""); // Reset collaborator ID input
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };

  const handleRemoveCollaborator = async () => {
    try {
      await removeCollaborator(todo._id, collaboratorId);
      alert("Collaborator removed successfully!");
      setCollaboratorId(""); // Reset collaborator ID input
    } catch (error) {
      console.error("Error removing collaborator:", error);
    }
  };

  return (
    <div className="flex flex-col p-2 border-b space-y-2">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border p-1 flex-grow"
          />
        ) : (
          <span className="flex-grow">{todo.title}</span>
        )}

        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(todo._id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Collaborator Section */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={collaboratorId}
          onChange={(e) => setCollaboratorId(e.target.value)}
          placeholder="Collaborator ID"
          className="border p-1 flex-grow"
        />
        <button
          onClick={handleAddCollaborator}
          className="bg-purple-500 text-white px-2 py-1 rounded"
        >
          Add
        </button>
        <button
          onClick={handleRemoveCollaborator}
          className="bg-yellow-500 text-black px-2 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
