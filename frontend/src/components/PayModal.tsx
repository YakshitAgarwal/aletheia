"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { X, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

interface AnalysisRequest {
  _id: string;
  requestId: string;
  userAddress: string;
  prompt: string;
  payment: {
    amount: string;
    status: string;
  };
  status: string;
  createdAt?: string;
}

interface AnalysisRequestResponse {
  success: boolean;
  message: string;
  data: AnalysisRequest;
}

interface PayModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisRequestData?: AnalysisRequestResponse | null;
  onPay?: () => void;
}

const PayModal = ({
  isOpen,
  onClose,
  analysisRequestData,
  onPay,
}: PayModalProps) => {
  const [requestDetails, setRequestDetails] = useState<AnalysisRequest | null>(
    null,
  );

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const requestId = analysisRequestData?.data?.requestId;

  useEffect(() => {
    if (!isOpen || !requestId) return;

    const getAnalysisRequestDetails = async () => {
      setIsFetching(true);
      setError("");

      try {
        const { data } = await axios.get<AnalysisRequestResponse>(
          "http://localhost:8000/analysis-request",
          {
            params: { requestId },
          },
        );

        if (data.success) {
          setRequestDetails(data.data);
        } else {
          setError(data.message || "Unable to fetch request details.");
        }
      } catch (err) {
        console.error("Error fetching analysis request:", err);

        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message ||
                "Failed to fetch analysis request details."
            : "Something went wrong.",
        );
      } finally {
        setIsFetching(false);
      }
    };

    getAnalysisRequestDetails();
  }, [isOpen, requestId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-[#1C1A22] border border-white/10 rounded-2xl p-7 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close payment modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mt-5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <ShieldCheck size={21} className="text-white" />
          </div>

          <div>
            <h2 className="text-white text-xl font-semibold">
              Complete your payment
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              Secure analysis request
            </p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Your analysis request has been registered. Complete the payment to
          initiate the on-chain verification process.
        </p>

        {/* Request details */}
        <div className="mt-6 bg-black/30 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-xs mb-2">REQUEST ID</p>

          {isFetching ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Loader2 size={14} className="animate-spin" />
              Fetching request details...
            </div>
          ) : (
            <p className="text-white text-xs break-all">
              {requestDetails?.requestId || requestId || "Unavailable"}
            </p>
          )}

          {requestDetails && (
            <>
              <div className="border-t border-white/10 my-4" />

              <p className="text-gray-400 text-xs mb-2">YOUR PROMPT</p>

              <p className="text-white text-sm leading-relaxed line-clamp-3">
                {requestDetails.prompt}
              </p>
            </>
          )}
        </div>

        {/* Payment details */}
        <div className="mt-4 bg-black/30 border border-white/10 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Payment method</span>
            <span className="text-white text-sm font-medium">HBAR</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-gray-400 text-sm">Network</span>
            <span className="text-white text-sm font-medium">
              Hedera Testnet
            </span>
          </div>

          <div className="border-t border-white/10 my-4" />

          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Amount</span>
            <span className="text-white text-lg font-semibold">
              {requestDetails?.payment.amount ||
                analysisRequestData?.data?.payment.amount ||
                "10 HBAR"}
            </span>
          </div>
        </div>

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button
          disabled={
            isFetching || (!requestDetails && !analysisRequestData?.data)
          }
          onClick={onPay}
          className="w-full cursor-pointer mt-6 flex items-center justify-center gap-2 bg-white text-black rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isFetching ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Pay with HBAR
              <ArrowRight size={17} />
            </>
          )}
        </button>

        <p className="text-center text-gray-500 text-xs mt-4">
          Your payment will be processed through the Aletheia escrow contract.
        </p>
      </div>
    </div>
  );
};

export default PayModal;
