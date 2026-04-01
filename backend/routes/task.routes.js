import express from "express";
import {
  createTask,
  getTasks,
  getMyTasks,
  updateTask,
  deleteTask,
  getTaskStats,
} from "../controllers/task.controlller.js";

import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

// Create → admin, manager
router.post("/", authorizeRoles("admin", "manager"), createTask);

// Read → all
router.get("/", getTasks);

// My Tasks → all authenticated users
router.get("/my-tasks", getMyTasks);

// ✅ Update → ALL users (controller handles permission)
router.put("/:id", updateTask);

// Delete → admin, manager
router.delete("/:id", authorizeRoles("admin", "manager"), deleteTask);

router.get("/stats", getTaskStats);

export default router;