import express from "express";
import authorizeRoles from "../middleware/role.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.use(authMiddleware); // protect all routes

// Admin & Manager → create project
router.post("/", authorizeRoles("admin", "manager"), createProject);

// Everyone → read
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin & Manager → update
router.put("/:id", authorizeRoles("admin", "manager"), updateProject);

// Only Admin → delete
router.delete("/:id", authorizeRoles("admin"), deleteProject);

export default router;