import express from "express";
import {
  addCollaborator,
  handleCreateTodo,
  handleDeleteTodo,
  handleGetTodos,
  removeCollaborator,
} from "../controllers/todocontrollers.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticateToken, handleCreateTodo);
router.get("/", authenticateToken, handleGetTodos);
router.delete("/delete/:id", authenticateToken, handleDeleteTodo);
router.post("/add-collaborator", authenticateToken, addCollaborator);
router.delete("/remove-collaborator", authenticateToken, removeCollaborator);


export default router;
