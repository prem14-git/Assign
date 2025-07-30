import express from "express";
import {
  getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraftSession,
  publishSession,
  deleteSession
} from "../controllers/session.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public sessions
router.get("/sessions", getPublicSessions);

// Protected routes
router.get("/my-sessions", authenticateJWT, getMySessions);
router.get("/my-sessions/:id", authenticateJWT, getMySessionById);
router.post("/my-sessions/save-draft", authenticateJWT, saveDraftSession);
router.post("/my-sessions/publish", authenticateJWT, publishSession);
router.delete("/my-sessions/:id", authenticateJWT, deleteSession);

export default router;