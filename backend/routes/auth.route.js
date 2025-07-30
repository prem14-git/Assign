import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Logout endpoint (stateless, for frontend to clear token)
router.post("/logout", (req, res) => {
  // Instruct frontend to remove token
  return res.status(200).json({ message: "Logged out successfully. Please remove token on client." });
});

export default router;