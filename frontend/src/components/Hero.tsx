"use client";

import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center text-white gap-8">
      <div className="flex flex-col justify-center items-center font-bold text-[64px] leading-[1.05]">
        <h1>Verifiable data.</h1>
        <h1>Trustless payments.</h1>
      </div>
      <div className="flex flex-col justify-center items-center text-gray-200 text-[18px]">
        <p>
          An escrow-powered protocol that turns data exchange into a verifiable
        </p>
        <p>transaction, ensuring agents pay only for what holds up.</p>
      </div>
      <div>
        <button
          onClick={() => router.push("/app")}
          className="mt-4 group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
        >
          <span className="text-[24px]">Launch App</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            <MoveRight size={24} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
