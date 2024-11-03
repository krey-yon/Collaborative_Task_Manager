import mongoose from "mongoose";
import { TaskSchema } from "./Task.model.js";
import { v4 as uuidv4 } from "uuid";

const TodoListSchema = new mongoose.Schema(
    {
      todoId: { type: String, default: uuidv4, unique: true },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: String,
      content: String,
      tasks: [TaskSchema],
      collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
  );

  
export default mongoose.model("TodoList", TodoListSchema);  