"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  name: string;
  location: string;
  review: string;
  image: string;
};

export default function TestimonialCard({
  name,
  location,
  review,
  image,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="group relative rounded-[28px] overflow-hidden"
    >
      {/* 🔥 GLOW */}
      <div className="absolute inset-0 rounded-[28px] bg-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      {/* 🧊 GLASS CARD */}
      <div className="relative bg-white/70 backdrop-blur-xl border border-white/30 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500 space-y-5">
        {/* 💬 QUOTE ICON */}
        <Quote className="text-sky-500/40" size={28} />

        {/* ⭐ STARS */}
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" />
          ))}
        </div>

        {/* 📝 REVIEW */}
        <p className="text-gray-600 leading-relaxed text-sm">“{review}”</p>

        {/* 👤 USER */}
        <div className="flex items-center gap-3 pt-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-semibold text-gray-900 text-sm">{name}</p>
            <p className="text-xs text-gray-500">{location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
