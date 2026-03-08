import express from "express";
import { getTasks, getTask, postTask, updateTask, deleteTask } from "../controllers/task.js";

const router = express.Router();
router.get("/", getTasks);
router.get("/:taskId", getTask);
router.post("/", postTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;