import express, { Request, Response } from "express";
import connectDB from "./config/db";
import cors from "cors";
import analysisRequestRoutes from "./routes/analysisRequestRoutes";

const app = express();

const PORT = process.env.PORT || 8000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "PAYMENT-SIGNATURE"],
    exposedHeaders: ["PAYMENT-REQUIRED", "PAYMENT-RESPONSE"],
  }),
);

app.use(express.json());

app.use("/", analysisRequestRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express + TypeScript backend is running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
