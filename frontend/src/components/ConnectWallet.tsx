"use client";

import { useConnect, useConnection, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

const ConnectWallet = () => {
  const { address, isConnected } = useConnection();
  const { mutate, isPending } = useConnect();
  const { mutateAsync } = useDisconnect();

  const trimmedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const handleClick = () => {
    if (isConnected) {
      mutateAsync();
    } else {
      mutate({ connector: injected() });
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isPending}
        className="flex justify-center items-center gap-2 text-black bg-white rounded-xl py-2 px-5 font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-200"
      >
        <span
          className={`leading-none ${
            isConnected ? "text-green-500" : "text-gray-400"
          }`}
        >
          ●
        </span>

        <span>
          {isPending
            ? "Connecting..."
            : isConnected
              ? trimmedAddress
              : "Connect"}
        </span>
      </button>
    </div>
  );
};

export default ConnectWallet;
