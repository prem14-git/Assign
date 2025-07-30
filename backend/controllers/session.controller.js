import Session from "../models/session.model.js";

export const getPublicSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ status: "published" }).sort({ created_at: -1 });
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch public sessions.", error: err.message });
  }
};

export const getMySessions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessions = await Session.find({ user_id: userId }).sort({ created_at: -1 });
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch your sessions.", error: err.message });
  }
};

export const getMySessionById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessionId = req.params.id;
    const session = await Session.findOne({ _id: sessionId, user_id: userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch the session.", error: err.message });
  }
};

export const saveDraftSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sessionId, title, tags, json_file_url } = req.body;
    if (!title || !json_file_url) {
      return res.status(400).json({ message: "Title and JSON file URL are required." });
    }
    let session;
    let isUpdate = false;
    if (sessionId) {
      // Update existing session (both draft and published)
      session = await Session.findOneAndUpdate(
        { _id: sessionId, user_id: userId },
        { title, tags, json_file_url, updated_at: Date.now() },
        { new: true }
      );
      if (!session) {
        return res.status(404).json({ message: "Session not found or not owned by user." });
      }
      isUpdate = true;
    } else {
      // Create new draft
      session = new Session({
        user_id: userId,
        title,
        tags,
        json_file_url,
        status: "draft",
      });
      await session.save();
    }
    return res.status(200).json({
      message: isUpdate ? "Session updated successfully (auto-saved)." : "Draft created successfully (auto-saved).",
      session
    });
  } catch (err) {
    return res.status(500).json({ message: "Failed to save session.", error: err.message });
  }
};

export const publishSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required to publish." });
    }
    // Allow publishing any session (draft or already published)
    const session = await Session.findOneAndUpdate(
      { _id: sessionId, user_id: userId },
      { status: "published", updated_at: Date.now() },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: "Session not found." });
    }
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: "Failed to publish session.", error: err.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessionId = req.params.id;
    const session = await Session.findOneAndDelete({ _id: sessionId, user_id: userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found or not owned by user." });
    }
    return res.status(200).json({ message: "Session deleted successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Failed to delete session.", error: err.message });
  }
};