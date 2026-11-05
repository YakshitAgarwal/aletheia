"use client";

import { useState, KeyboardEvent, FormEvent } from "react";
import { ArrowUp, ShieldCheck, User } from "lucide-react";
import axios from "axios";
import { useConnection } from "wagmi";
import PayModal from "./PayModal";

interface AnalysisRequestResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    requestId: string;
    userAddress: string;
    prompt: string;
    payment: {
      amount: string;
      status: string;
    };
    status: string;
  };
}

const PromptBar = () => {
  const { address, isConnected } = useConnection();

  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [analysisRequestData, setAnalysisRequestData] =
    useState<AnalysisRequestResponse | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) return;

    if (!isConnected || !address) {
      alert("Please connect your wallet before submitting a request.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/analysis-request",
        {
          userAddress: address,
          prompt: trimmedPrompt,
        },
      );

      console.log("Analysis request created:", data);

      setSubmittedPrompt(trimmedPrompt);
      setPrompt("");
      setSuccess(true);
      setShowPayModal(true);
      setAnalysisRequestData(data);
    } catch (error) {
      console.error("Error submitting analysis request:", error);

      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            "Failed to submit your request. Please try again.",
        );
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <>
      {success ? (
        <div className="w-full max-w-4xl mx-auto px-4 py-12 min-h-[60vh]">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 mb-3 text-gray-400">
              <User size={16} />
              <span className="text-sm">You</span>
            </div>

            <div className="max-w-[85%] bg-[#1C1A22] border border-white/10 rounded-2xl rounded-tr-sm px-5 py-4">
              <p className="text-white text-[16px] leading-relaxed whitespace-pre-wrap">
                {submittedPrompt}
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-start gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 shrink-0">
              <ShieldCheck size={19} className="text-white" />
            </div>

            <div>
              <h3 className="text-white font-semibold">Aletheia</h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                Your request has been registered. Complete the payment to begin
                the on-chain verification process.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-5">
            <p className="text-gray-500 text-xs text-center">
              Your analysis will begin once the payment is confirmed.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="bg-[#1C1A22] border border-white/10 rounded-2xl p-4 transition-all duration-300 focus-within:border-white/25 focus-within:shadow-lg focus-within:shadow-black/20">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Aletheia anything..."
              rows={3}
              disabled={isLoading}
              className="w-full resize-none bg-transparent text-white placeholder:text-gray-500 outline-none text-[18px] leading-relaxed disabled:opacity-50"
            />

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-gray-400">
                <ShieldCheck size={17} />
                <span className="text-[17px]">On-chain Verification</span>
              </div>

              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-white text-black hover:bg-gray-200 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Submit analysis request"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-gray-400 border-t-black rounded-full animate-spin" />
                ) : (
                  <ArrowUp size={19} />
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-xs mt-3">
            You can challenge any result by raising a dispute if you believe the
            provided analysis is incorrect.
          </p>
        </form>
      )}

      <PayModal
        isOpen={showPayModal}
        onClose={() => setShowPayModal(false)}
        analysisRequestData={analysisRequestData}
      />
    </>
  );
};

export default PromptBar;
