"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");

  const handleSearch = () => {
    router.push(`destinations/${destination}`);
  };

  return (
    <div
      className="
      flex items-center 
      bg-white 
      rounded-full 
      shadow-2xl 
      overflow-hidden 
      w-full
      max-w-3xl
      mx-auto
    "
    >
      {/* Input */}
      <div className="flex items-center gap-3 px-6 py-4 flex-1">
        <MapPin className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Find places and things to do"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full outline-none text-gray-800 placeholder-gray-400 text-base"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSearch}
        className="
          bg-blue-600 
          hover:bg-blue-700 
          text-white 
          px-8 md:px-10 
          py-4 
          font-medium 
          rounded-full 
          m-2
          transition
        "
      >
        Search
      </button>
    </div>
  );
}
