"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Props = {
  name: string;
  image: string;
};

export default function DestinationCard({ name, image }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Link href={`/destinations/${name.toLowerCase()}`}>
      <motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="group relative h-80 rounded-[28px] overflow-hidden cursor-pointer"
      >
        {/* 🔥 GLOW */}
        <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

        {/* IMAGE */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-700 group-hover:scale-110 group-hover:translate-y-[-2px]"
          />

          {/* 🌄 OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* 💡 RADIAL LIGHT */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>

        {/* 🧊 GLASS CONTENT */}
        <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-xl bg-white/10 border-t border-white/20">
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {name}
          </h3>

          {/* subtle subtitle */}
          <p className="text-sm text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition">
            Explore destination →
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
