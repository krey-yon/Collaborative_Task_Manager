import express from "express";
import { handleCreateTodo, handleDeleteTodo, handleGetTodos } from "../controllers/todocontrollers.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", authenticateToken, handleCreateTodo);
router.get("/get", authenticateToken, handleGetTodos);
router.delete("/delete/:id", authenticateToken, handleDeleteTodo);

export default router;