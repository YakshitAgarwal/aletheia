import mongoose, { Schema } from "mongoose";
import { randomUUID } from "crypto";

const analysisRequestSchema = new Schema(
  {
    // Unique identifier
    requestId: {
      type: String,
      default: randomUUID,
      unique: true,
      index: true,
    },

    // User information
    userAddress: {
      type: String,
      required: true,
      lowercase: true,
    },

    // Request information
    prompt: {
      type: String,
      required: true,
    },

    // Payment information
    payment: {
      amount: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        default: "HBAR",
      },
      status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
      },
      transactionHash: String,
      paidAt: Date,
    },

    // Report information
    report: {
      content: Schema.Types.Mixed,
      reportHash: String,
      status: {
        type: String,
        enum: ["PENDING", "GENERATING", "COMPLETED", "FAILED"],
        default: "PENDING",
      },
      deliveredAt: Date,
    },

    // Dispute information
    dispute: {
      raised: {
        type: Boolean,
        default: false,
      },
      reason: String,
      raisedAt: Date,
      status: {
        type: String,
        enum: ["NONE", "OPEN", "RESOLVED"],
        default: "NONE",
      },
    },

    // Verification information
    verification: {
      status: {
        type: String,
        enum: ["NONE", "PENDING", "IN_PROGRESS", "COMPLETED"],
        default: "NONE",
      },
      totalClaims: Number,
      incorrectClaims: Number,
      incorrectPercentage: Number,
      verifiedAt: Date,
    },

    // Escrow and settlement information
    settlement: {
      status: {
        type: String,
        enum: ["LOCKED", "REFUNDED", "SETTLED", "PARTIALLY_SETTLED"],
        default: "LOCKED",
      },
      refundAmount: String,
      sellerAmount: String,
      transactionHash: String,
      settledAt: Date,
    },

    // Overall request lifecycle
    status: {
      type: String,
      enum: [
        "CREATED",
        "PAID",
        "PROCESSING",
        "DELIVERED",
        "DISPUTED",
        "VERIFYING",
        "RESOLVED",
        "FAILED",
      ],
      default: "CREATED",
    },
  },
  { timestamps: true },
);

const AnalysisRequest = mongoose.model(
  "AnalysisRequest",
  analysisRequestSchema,
);

export default AnalysisRequest;
