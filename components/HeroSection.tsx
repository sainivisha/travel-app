"use client";

import Image from "next/image";
import Container from "./layout/Container";
import HeroSearchBar from "./search/HeroSearchBar";
import { motion } from "framer-motion";

export default function HeroSection() {
  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="relative h-[760px] flex items-center justify-center overflow-hidden">
      {/* 🌄 BACKGROUND IMAGE (SCALE ANIMATION) */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9"
          alt="travel"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* 🌈 GRADIENT OVERLAY (PREMIUM) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      {/* 💡 RADIAL LIGHT (PREMIUM TOUCH) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      <Container>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto">
          {/* ✨ TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="
              text-4xl md:text-7xl 
              font-semibold 
              tracking-tight 
              leading-[1.05]
            "
          >
            Discover <span className="text-sky-300">extraordinary</span> places
          </motion.h1>

          {/* ✨ SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Handpicked experiences, curated journeys, and unforgettable
            adventures around the world.
          </motion.p>

          {/* 🔍 SEARCH BAR (FLOATING + GLOW) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="mt-12 flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              {/* glow */}
              <div className="absolute inset-0 bg-sky-400/20 blur-xl rounded-full opacity-60" />

              {/* glass search */}
              <div className="relative bg-white/80 backdrop-blur-2xl rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] p-2">
                <HeroSearchBar />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* 🎬 SCROLL INDICATOR (APPLE TOUCH) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center items-start p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
