import { Router } from "express";
import { getTasks, createTask, deleteTask, updateTaskStatus } from '../controllers/taskController';

const router = Router()

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:id",deleteTask)
router.patch("/tasks/:id", updateTaskStatus);

export default router; 

