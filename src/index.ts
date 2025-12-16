import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = 3000;
app.use(cookieParser());

// CORS Configuration for Next.js frontend for production
// Middleware
const allowedOrigin = process.env.NEXT_PUBLIC_API_URL as string;
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// development purpose allow all origins
// app.use(cors())

app.use(express.json());

// Database
connectDB();

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime()
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
