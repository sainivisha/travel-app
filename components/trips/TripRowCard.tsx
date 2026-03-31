"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function TripCard({ trip, destination }: any) {
  const [isFav, setIsFav] = useState(false);

  // 🔥 Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFav(saved.includes(trip.id));
  }, [trip.id]);

  // 🔥 Toggle favorite
  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault(); // 🚫 stop link navigation
    e.stopPropagation(); // 🚫 stop bubbling

    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updated;

    if (saved.includes(trip.id)) {
      updated = saved.filter((id: number) => id !== trip.id);
      setIsFav(false);
    } else {
      updated = [...saved, trip.id];
      setIsFav(true);
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Link
      href={`/destinations/${destination.slug}/${trip.slug}`}
      className="group bg-white rounded-2xl border hover:shadow-xl transition overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative w-full h-48">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

        {/* 🔥 BADGE */}
        {trip.badge && (
          <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-2.5 py-1 rounded-full font-medium">
            {trip.badge}
          </span>
        )}

        {/* ❤️ HEART */}
        <button
          onClick={toggleFav}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur p-1.5 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={16}
            className={`transition ${
              isFav ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {trip.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">{trip.duration}</p>

        <div className="flex items-center gap-1 mt-2">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium text-gray-800">
            {trip.rating}
          </span>

          {trip.reviews && (
            <span className="text-xs text-gray-400">({trip.reviews})</span>
          )}
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            {trip.oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                ₹{trip.oldPrice}
              </p>
            )}

            <p className="text-lg font-semibold text-gray-900">
              From ₹{trip.price}
            </p>
          </div>

          <span className="text-xs text-gray-400">per person</span>
        </div>
      </div>
    </Link>
  );
}
