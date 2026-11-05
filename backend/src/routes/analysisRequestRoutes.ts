import express from "express";
import {
  registerAnalysisRequest,
  getAnalysisReportDetails,
} from "../controllers/analysisRequestController";

const router = express.Router();

// Health check
router.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "All well",
  });
});

// Register a new analysis request
router.post("/analysis-request", registerAnalysisRequest);

// Get analysis request details using requestId
router.get("/analysis-request", getAnalysisReportDetails);

export default router;
