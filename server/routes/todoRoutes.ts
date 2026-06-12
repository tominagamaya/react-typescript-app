import { Router } from "express";
import {
  addTodo,
  changeTodo,
  getAllTodos,
} from "../controllers/todoController";

const router = Router();

// api/todos
router.get("/", getAllTodos);
router.post("/", addTodo);
router.put("/:id", changeTodo);

export default router;
