"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DestinationDropdown({
  activeIndex,
  activeContinent,
  setActiveContinent,
  search,
  setSearch,
  closeMenu,
  dropdownRef,
  closeTimeoutRef,
  recentSearches,
  continents,
  filteredDestinations,
  getDestinationsByContinent,
  saveSearch,
  highlightText,
  hoveredItem,
  setHoveredItem,
}: any) {
  const list =
    search.length > 0
      ? filteredDestinations
      : activeContinent
        ? getDestinationsByContinent(activeContinent)
        : [];

  return (
    <>
      {activeIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed left-1/2 -translate-x-1/2 top-[90px] z-50 w-full px-6"
          onMouseEnter={() => {
            if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
          }}
          onMouseLeave={() => {
            closeTimeoutRef.current = setTimeout(() => {
              closeMenu();
            }, 150);
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div
              ref={dropdownRef}
              className="bg-white backdrop-blur-2xl border border-white/30 rounded-[28px] shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-6"
            >
              {/* 🔍 SEARCH */}
              <div className="mb-6">
                <input
                  placeholder="Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-5 py-3 rounded-full bg-white/80 border border-white/40 shadow-inner text-sm outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* RECENT */}
              {search.length === 0 && recentSearches.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-2">Recent searches</p>

                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((item: string) => (
                      <button
                        key={item}
                        onClick={() => setSearch(item)}
                        className="px-3 py-1 text-xs bg-white/70 rounded-full hover:bg-white transition"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-8">
                {/* 🌍 LEFT PANEL */}
                <div className="w-1/5">
                  {continents.map((c: any) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setActiveContinent(c.id)}
                      className={`group flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-300
                        ${
                          activeContinent === c.id
                            ? "bg-sky-50"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition
                          ${
                            activeContinent === c.id
                              ? "bg-sky-500 scale-125"
                              : "bg-gray-300"
                          }`}
                      />

                      <span
                        className={`text-sm transition
                          ${
                            activeContinent === c.id
                              ? "text-black font-semibold"
                              : "text-gray-500 group-hover:text-gray-800"
                          }`}
                      >
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 🧭 GRID */}
                <div className="flex-1 grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {list.map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/destinations/${item.slug}`}
                      onMouseEnter={() => setHoveredItem(item)}
                      onClick={() => {
                        saveSearch(item.name);
                        closeMenu();
                      }}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/60 hover:bg-white transition shadow-sm hover:shadow-md"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                        <Image
                          // src={item.image || "/placeholder.png"}
                          src={
                            "https://www.worldtribune.org/wp-content/uploads/sites/2/2024/01/GettyImages-1191232894.jpg"
                          }
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>

                      <div className="text-sm font-medium text-gray-800">
                        {highlightText(item.name, search)}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 🖼️ RIGHT PREVIEW */}
                <div className="w-[280px] hidden lg:block">
                  {hoveredItem && (
                    <motion.div
                      key={hoveredItem.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white/70 backdrop-blur-xl rounded-2xl p-3 shadow-md"
                    >
                      <div className="relative h-[160px] rounded-xl overflow-hidden mb-3">
                        <Image
                          // src={hoveredItem.image || "/placeholder.png"}
                          src={
                            "https://www.worldtribune.org/wp-content/uploads/sites/2/2024/01/GettyImages-1191232894.jpg"
                          }
                          alt={hoveredItem.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h3 className="text-sm font-semibold">
                        {hoveredItem.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Explore this destination
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* VIEW ALL */}
              {activeContinent && list.length > 12 && (
                <div className="pt-6">
                  <Link
                    href={`/destinations/${
                      continents.find((c: any) => c.id === activeContinent)
                        ?.slug
                    }`}
                    onClick={closeMenu}
                    className="text-sm font-medium text-sky-500 hover:underline"
                  >
                    View all destinations →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
