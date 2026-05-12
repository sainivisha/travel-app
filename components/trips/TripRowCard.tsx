"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function TripCard({ trip, slug }: any) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(saved.includes(trip?.id));
  }, [trip?.id]);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updated;
    if (saved.includes(trip?.id)) {
      updated = saved.filter((id: string) => id !== trip?.id);
      setIsFav(false);
    } else {
      updated = [...saved, trip?.id];
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const image =
    trip?.image || trip?.gallery?.images?.[0]?.url || "/placeholder.png";

  const price = trip?.price || 0;
  const rating = trip?.rating || 4.5;

  const duration = useMemo(() => {
    if (!trip?.dates) return "";
    return `${trip.dates.days}D • ${trip.dates.nights}N`;
  }, [trip]);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="group relative"
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

      <Link
        href={`/destinations/${slug}/${trip?.slug}`}
        className="relative block rounded-[28px] overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.18)] transition-all duration-500"
      >
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <Image
            // src={image}
            src={
              "https://www.worldtribune.org/wp-content/uploads/sites/2/2024/01/GettyImages-1191232894.jpg"
            }
            alt={trip?.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110 group-hover:translate-y-[-2px]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* FAVORITE */}
          <button
            onClick={toggleFav}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <Heart
              size={16}
              className={isFav ? "fill-red-500 text-red-500" : "text-gray-700"}
            />
          </button>

          {/* TITLE */}
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h3 className="text-xl font-semibold leading-tight">
              {trip?.title}
            </h3>
            {duration && (
              <p className="text-xs text-white/80 mt-1">{duration}</p>
            )}
          </div>
        </div>

        {/* GLASS CONTENT PANEL */}
        <div className="p-5 backdrop-blur-xl bg-white/70 border-t border-white/30 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating}</span>
            </div>

            <span className="text-gray-400 text-xs">
              📍 {trip?.location || "Jaipur"}
            </span>
          </div>

          <p className="text-lg font-semibold text-gray-900 tracking-tight">
            ₹{price}
            <span className="text-sm text-gray-500 font-normal"> /person</span>
          </p>

          <p className="text-xs text-green-600 font-medium">
            Free cancellation
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
