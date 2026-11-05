"use client";

import { useRouter } from "next/navigation";
import ConnectWallet from "./ConnectWallet";

const NewNavbar = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between px-20 py-2">
      <div
        onClick={() => router.push("/")}
        className="text-[32px] font-bold cursor-pointer"
      >
        Aletheia
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default NewNavbar;
