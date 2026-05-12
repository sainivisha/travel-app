"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type EventProps = {
  title: string;
  image: string;
  description: string;
  large?: boolean;
};

export default function EventCard({
  title,
  image,
  description,
  large = false,
}: EventProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className={`group relative rounded-[28px] overflow-hidden cursor-pointer ${
        large ? "h-[420px]" : "h-[260px]"
      }`}
    >
      {/* 🔥 GLOW */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      {/* IMAGE */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110 group-hover:translate-y-[-2px]"
        />

        {/* 🎬 CINEMATIC OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* 💡 RADIAL LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition duration-500" />
      </div>

      {/* 🧊 GLASS CONTENT */}
      {/* 🧊 GLASS CONTENT */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 backdrop-blur-xl bg-white/10 border-t border-white/20 ${
          large ? "space-y-3" : "space-y-2"
        }`}
      >
        <h3
          className={`font-semibold text-white leading-tight ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          {title}
        </h3>

        {/* ✅ ALWAYS SHOW DESCRIPTION (BUT CONTROL IT) */}
        <p
          className={`
      text-white/80 leading-relaxed
      ${large ? "text-sm line-clamp-2" : "text-xs line-clamp-1 opacity-80"}
    `}
        >
          {description}
        </p>

        {/* CTA */}
        <span className="text-sm font-medium text-sky-300 group-hover:underline">
          Explore event →
        </span>
      </div>
    </motion.div>
  );
}
