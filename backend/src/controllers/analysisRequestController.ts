import AnalysisRequest from "../models/AnalysisRequest";
import { Request, Response } from "express";
import { randomUUID } from "crypto";

const registerAnalysisRequest = async (req: Request, res: Response) => {
  try {
    const { userAddress, prompt } = req.body;

    if (!userAddress || !prompt) {
      return res.status(400).json({
        success: false,
        message: "User address and prompt are required",
      });
    }

    const requestId = randomUUID();

    const request = await AnalysisRequest.create({
      requestId,
      userAddress,
      prompt,
      payment: {
        amount: "10 HBAR",
        status: "PENDING",
      },
      status: "PROCESSING",
    });

    return res.status(201).json({
      success: true,
      message: "Request registered successfully",
      data: request,
    });
  } catch (error) {
    console.error("Register request error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAnalysisReportDetails = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.query;

    if (!requestId || typeof requestId !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid requestId is required",
      });
    }

    const analysisRequest = await AnalysisRequest.findOne({ requestId });

    if (!analysisRequest) {
      return res.status(404).json({
        success: false,
        message: "Analysis request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Analysis request details retrieved successfully",
      analysisRequestData: analysisRequest,
    });
  } catch (error) {
    console.error("Error fetching analysis request:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerAnalysisRequest, getAnalysisReportDetails };
