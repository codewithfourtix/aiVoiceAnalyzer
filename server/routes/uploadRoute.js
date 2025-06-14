import express from "express";
import { handleVoiceUpload } from "../controllers/handleUpload.js";
import { uploadMiddleware } from "../middlewares/multerConfig.js";

const router = express.Router();

router.post(
  "/analyze-voice",
  uploadMiddleware.single("audio"),
  handleVoiceUpload
);

export default router;
