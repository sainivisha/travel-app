"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  image: string;
  category: string;
};

export default function BlogCard({ title, image, category }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="group relative"
    >
      {/* 🔥 SUBTLE GLOW */}
      <div className="absolute inset-0 rounded-[28px] bg-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      <Link
        href="/blog"
        className="relative block rounded-[28px] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-500"
      >
        {/* 🖼 IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* 🏷 CATEGORY BADGE */}
          <span className="absolute top-4 left-4 px-3 py-1 text-xs bg-white/90 backdrop-blur-md rounded-full text-gray-800 shadow">
            {category}
          </span>
        </div>

        {/* 🧊 CONTENT */}
        <div className="p-6 space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 leading-snug group-hover:text-sky-600 transition">
            {title}
          </h3>

          {/* subtle CTA */}
          <span className="text-sm text-gray-500 group-hover:text-sky-600 transition">
            Read article →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
