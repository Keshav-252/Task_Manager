import express from "express";
import { listUsers, updateUserRole, deleteUser } from "../controllers/admin.js";

const router = express.Router();

router.get("/users", listUsers);
router.patch("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

export default router;