"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ActivityDropdown({
  activeIndex,
  closeMenu,
  dropdownRef,
  closeTimeoutRef,
  continents,
  activeMenuType,
  setActiveMenuType,
  activeContinent,
  setActiveContinent,
  setActiveActivityId,
  visibleTrips,
  visibleCities,
}: any) {
  return (
    <>
      {activeIndex === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed left-1/2 -translate-x-1/2 top-[90px] z-50 w-full px-6"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(closeMenu, 150);
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              ref={dropdownRef}
              className="bg-white backdrop-blur-2xl border border-white/30 rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-6"
            >
              <div className="flex gap-10">
                {/* 🧭 LEFT MENU */}
                <div className="w-1/5">
                  <div
                    onMouseEnter={() => {
                      setActiveMenuType("top");
                      setActiveContinent(null);
                      setActiveActivityId(null);
                    }}
                    className={`px-3 py-2 rounded-xl cursor-pointer transition
                      ${
                        activeMenuType === "top"
                          ? "bg-sky-50 text-black font-semibold"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    ⭐ Top experiences
                  </div>

                  {continents.map((continent: any) => (
                    <div
                      key={continent.id}
                      onMouseEnter={() => {
                        setActiveMenuType("continent");
                        setActiveContinent(continent.id);
                        setActiveActivityId(null);
                      }}
                      className={`px-3 py-2 rounded-xl cursor-pointer transition
                        ${
                          activeMenuType === "continent" &&
                          activeContinent === continent.id
                            ? "bg-sky-50 text-black font-semibold"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      {continent.name}
                    </div>
                  ))}
                </div>

                {/* 🎯 TRIPS (CENTER) */}
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-4 text-gray-700">
                    Top experiences
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {visibleTrips.map((trip: any) => (
                      <Link
                        key={trip.id}
                        href={`/trips/${trip.slug}`}
                        onClick={closeMenu}
                        className="group relative rounded-xl overflow-hidden"
                      >
                        <div className="relative h-[120px]">
                          <Image
                            src={trip.image}
                            alt={trip.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                          <p className="absolute bottom-2 left-3 right-3 text-white text-sm font-medium">
                            {trip.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 🌍 CITIES (RIGHT) */}
                <div className="w-[260px]">
                  <p className="text-sm font-semibold mb-4 text-gray-700">
                    Explore cities
                  </p>

                  <div className="space-y-3">
                    {visibleCities?.map((city: any) => (
                      <Link
                        key={city?.id}
                        href={`/destinations/${city?.slug}`}
                        onClick={closeMenu}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/80 transition"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                          <Image
                            src={city?.image || "/placeholder.png"}
                            alt={city?.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="text-sm font-medium text-gray-800">
                          {city?.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
