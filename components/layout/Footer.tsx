"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-gray-300 overflow-hidden">
      {/* 💡 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">
        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Travelling Cambodia
          </h2>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Discover breathtaking landscapes, vibrant culture, and unforgettable
            travel experiences across Cambodia.
          </p>
        </motion.div>

        {/* EXPLORE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h3 className="font-semibold text-white mb-5">Explore</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/destinations"
                className="hover:text-white transition"
              >
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/tours" className="hover:text-white transition">
                Tours
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:text-white transition">
                Activities
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* COMPANY */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="font-semibold text-white mb-5">Company</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="font-semibold text-white mb-5">Follow Us</h3>

          <div className="flex gap-4">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <div
                key={i}
                className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-sky-500/20 hover:scale-110 transition"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BOTTOM */}
      <div className="relative text-center text-sm border-t border-white/10 py-6 text-gray-400">
        © 2026 Travelling Cambodia. All rights reserved.
      </div>
    </footer>
  );
}
