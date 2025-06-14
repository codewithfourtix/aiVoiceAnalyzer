import fs from "fs";
import { analyzeWithAssemblyAI } from "../utils/voiceAnalyzer.js";

export const handleVoiceUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    console.log("📁 Received audio file:", req.file.filename);
    console.log("📊 File size:", req.file.size, "bytes");

    // Read the uploaded file
    const audioBuffer = fs.readFileSync(req.file.path);

    // Simulate processing time (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Analyze the voice
    const analysisResult = await analyzeWithAssemblyAI(audioBuffer);

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    console.log("✅ Analysis complete:", analysisResult);

    res.json(analysisResult);
  } catch (error) {
    console.error("❌ Error analyzing voice:", error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: "Failed to analyze voice" });
  }
};
