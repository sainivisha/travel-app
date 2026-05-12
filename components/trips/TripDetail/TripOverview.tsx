"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { TripUI } from "@/types/trip";

interface TripOverviewProps {
  facts: TripUI["facts"];
  description: string;
}

export default function TripOverview({ facts, description }: TripOverviewProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Facts grid */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">About this activity</h2>
        <div className="grid grid-cols-2 gap-4">
          {facts?.map((f, i) => (
            <div key={i} className="flex gap-2">
              <CheckCircle className="text-green-500" />
              <p className="text-lg">
                {f.label}: {f.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable description */}
      <div className="max-w-2xl">
        <h2 className="text-2xl font-semibold mb-3">About this experience</h2>

        <div className="relative">
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : 110 }}
            className="overflow-hidden"
          >
            <div
              className="text-gray-700 text-[15px] leading-[1.7]"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>

          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:gap-2 transition-all"
        >
          {expanded ? "Show less" : "Read more"}
          <span className={`transition ${expanded ? "rotate-180" : ""}`}>↑</span>
        </button>
      </div>
    </div>
  );
}
