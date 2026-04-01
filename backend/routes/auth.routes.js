import express from "express";
import {
  registerCompany,
  loginUser,
  getMe,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register-company", registerCompany);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);

export default router;