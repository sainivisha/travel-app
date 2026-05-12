"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

type TourProps = {
  title: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  location: string;
  slug: string;
  destinationSlug: string;
};

export default function TourCard({
  title,
  image,
  price,
  duration,
  rating,
  location,
  slug,
  destinationSlug,
}: TourProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="group relative"
    >
      {/* 🔥 GLOW */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      <Link
        href={`/destinations/${destinationSlug}/${slug}`}
        className="relative block rounded-[28px] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.2)] transition-all duration-500"
      >
        {/* IMAGE */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110 group-hover:translate-y-[-2px]"
          />

          {/* CINEMATIC OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* BADGE */}
          <span className="absolute top-4 left-4 px-3 py-1 text-xs bg-white/90 backdrop-blur-md rounded-full shadow text-gray-900">
            Popular
          </span>

          {/* TITLE OVER IMAGE */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h3 className="text-lg font-semibold leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </div>

        {/* GLASS CONTENT */}
        <div className="p-5 backdrop-blur-xl bg-white/70 border-t border-white/30 space-y-4">
          {/* LOCATION */}
          <div className="flex items-center text-sm text-gray-500 gap-1">
            <MapPin size={14} />
            {location}
          </div>

          {/* INFO */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={14} />
              {duration}
            </div>
          </div>

          {/* PRICE + CTA */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-gray-400">From</p>
              <p className="text-xl font-semibold text-gray-900 tracking-tight">
                ${price}
              </p>
            </div>

            {/* INLINE CTA (NO BUTTON) */}
            <span className="text-sm font-medium text-sky-600 group-hover:underline">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
