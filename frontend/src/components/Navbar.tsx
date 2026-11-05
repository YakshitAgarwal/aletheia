"use client";

import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const navItems = ["Overview", "How It Works", "About"];

  return (
    <div className="text-white flex items-center justify-between px-64 py-4">
      <div className="flex items-center justify-center gap-2">
        <div>Icon</div>
        <div className="font-bold text-[28px]">Aletheia</div>
      </div>

      <div className="flex items-center justify-center gap-12">
        <div className="flex items-center justify-center gap-6 text-gray-400">
          {navItems.map((item) => (
            <div key={item} className="relative cursor-pointer group py-1">
              {item}
              <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-500 scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/app")}
          className="group flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
        >
          <span>Launch App</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
            <MoveRight size={16} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
