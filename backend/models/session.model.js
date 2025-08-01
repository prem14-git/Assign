import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    }
  ],
  json_file_url: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Session", sessionSchema);