"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

interface TripFaqProps {
  faq: FaqItem[];
}

export default function TripFaq({ faq }: TripFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faq?.length) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">FAQs</h2>
      <div className="space-y-3">
        {faq.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="border rounded-xl overflow-hidden bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                <span>{f.question}</span>
                <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ⌄
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-4 text-gray-600 text-[15px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: f.answer }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
