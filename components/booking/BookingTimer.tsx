"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  initialSeconds?: number;
}

export default function BookingTimer({ initialSeconds = 1800 }: Props) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const router = useRouter();

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/booking/expired");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, router]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-[#FDECEC] border border-[#FCA5A5] text-[#B42318] px-5 py-3 rounded-xl text-sm flex items-center justify-between">
      <span>⏱️ We’ll hold your spot for</span>
      <span className="font-semibold text-base">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
