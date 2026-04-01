import express from "express";
import { inviteUser } from "../controllers/tenant.controller.js";
import { getUsers } from "../controllers/tenant.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/invite", inviteUser);
router.get("/users", getUsers);

export default router;