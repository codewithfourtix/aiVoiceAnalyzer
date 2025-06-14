import express from "express";
import cors from "cors";
import uploadRoute from "./routes/uploadRoute.js";

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default development server port
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Routes
app.use("/api", uploadRoute);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
