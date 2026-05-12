// "use client";

// import { useEffect, useMemo, useState } from "react";
// import TripsFilters from "./TripsFilters";
// import TripRowCard from "./TripRowCard";
// import { useParams } from "next/navigation";
// import { fetchTrips } from "@/lib/api";
// import { motion } from "framer-motion";

// export default function TripsPageClient() {
//   const params = useParams();
//   const destination = Array.isArray(params.slug) ? params.slug[0] : params.slug;

//   const [allTrips, setAllTrips] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sort, setSort] = useState("recommended");
//   const [visible, setVisible] = useState(12);

//   const [filters, setFilters] = useState({
//     search: "",
//     destination: "",
//     tripTypes: [],
//     activities: [],
//     chips: [],
//   });

//   const container = {
//     hidden: {},
//     show: {
//       transition: { staggerChildren: 0.08 },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 },
//   };

//   useEffect(() => {
//     if (!destination) return;

//     const loadTrips = async () => {
//       setLoading(true);
//       const data = await fetchTrips(destination);

//       const normalized = data.map((t: any) => ({
//         id: t?.id,
//         title: t?.title,
//         slug: t?.slug,
//         image: t?.gallery?.images?.[0]?.url,
//         rating: t?.rating || 0,
//         price: t?.price?.minimumCheckoutPrice || 0,
//       }));

//       setAllTrips(normalized);
//       setLoading(false);
//     };

//     loadTrips();
//   }, [destination]);

//   const baseTrips = useMemo(() => allTrips, [allTrips]);

//   useEffect(() => {
//     let data = [...baseTrips];

//     if (filters.search) {
//       data = data.filter((t) =>
//         t.title?.toLowerCase().includes(filters.search.toLowerCase()),
//       );
//     }

//     if (sort === "price_low") data.sort((a, b) => a.price - b.price);
//     if (sort === "price_high") data.sort((a, b) => b.price - a.price);
//     if (sort === "rating") data.sort((a, b) => b.rating - a.rating);

//     setFiltered(data);
//   }, [filters, baseTrips, sort]);

//   const visibleTrips = filtered.slice(0, visible);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50"
//     >
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         {/* HERO */}
//         <div className="relative mb-10 rounded-3xl overflow-hidden">
//           <img
//             src="/travel-hero.jpg"
//             className="w-full h-[260px] object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-sky-900/70 via-sky-800/40 to-transparent flex flex-col justify-center px-10">
//             <h1 className="text-5xl font-bold text-white">
//               Explore <span className="text-sky-300">{destination}</span>
//             </h1>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-8">
//           {/* FILTER */}
//           <div className="col-span-3">
//             <TripsFilters
//               filters={filters}
//               setFilters={setFilters}
//               destinations={[]}
//               tripTypes={[]}
//               activities={[]}
//               sort={sort}
//               setSort={setSort}
//             />
//           </div>

//           {/* RIGHT */}
//           <div className="col-span-9">
//             {/* FILTER CHIPS */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {filters.tripTypes.map((id: any) => (
//                 <span
//                   key={id}
//                   className="px-3 py-1 text-xs bg-sky-500 text-white rounded-full"
//                 >
//                   {id}
//                 </span>
//               ))}
//             </div>

//             {/* GRID */}
//             {loading ? (
//               <div className="grid grid-cols-3 gap-6">
//                 {[1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className="relative h-64 bg-gray-200 rounded-2xl overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.2s_infinite]" />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <motion.div
//                 variants={container}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//               >
//                 {visibleTrips.map((trip) => (
//                   <motion.div key={trip.id} variants={item}>
//                     <TripRowCard trip={trip} slug={destination} />
//                   </motion.div>
//                 ))}
//               </motion.div>
//             )}

//             {/* LOAD MORE */}
//             {visible < filtered.length && (
//               <div className="text-center mt-10">
//                 <button
//                   onClick={() => setVisible((prev) => prev + 6)}
//                   className="px-6 py-2 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition"
//                 >
//                   Load More Trips
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
"use client";

import { useEffect, useMemo, useState } from "react";
import TripsFilters from "./TripsFilters";
import TripRowCard from "./TripRowCard";
import { useParams } from "next/navigation";
import { fetchTrips } from "@/lib/api";
import { motion } from "framer-motion";

/* 🔥 Extract filters dynamically */
function extractFilters(trips: any[]) {
  const activitiesSet = new Map();

  trips.forEach((trip) => {
    trip.classifications?.forEach((c: any) => {
      if (c.taxonomyKey === "trip.activity") {
        activitiesSet.set(c.termId, {
          id: c.termId,
          name: c.termId,
        });
      }
    });
  });

  return {
    activities: Array.from(activitiesSet.values()),
  };
}

export default function TripsPageClient() {
  const params = useParams();
  const destination = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [allTrips, setAllTrips] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    activities: [],
  });

  const [sort, setSort] = useState("recommended");
  const [visible, setVisible] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  const [activities, setActivities] = useState([]);

  const [scrolled, setScrolled] = useState(false);

  /* 🔥 Scroll detection (HEADER SHRINK) */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* 🔥 Fetch trips */
  useEffect(() => {
    if (!destination) return;

    const loadTrips = async () => {
      setLoading(true);
      const data = await fetchTrips(destination);

      const normalized = data.map((t: any) => ({
        id: t?.id,
        title: t?.title,
        slug: t?.slug,
        image: t?.gallery?.images?.[0]?.url,
        rating: t?.rating || 0,
        price: t?.price?.minimumCheckoutPrice || 0,
        classifications: t?.classifications || [],
      }));

      setAllTrips(normalized);
      setLoading(false);
    };

    loadTrips();
  }, [destination]);

  /* 🔥 Extract filters */
  useEffect(() => {
    if (!allTrips.length) return;
    const { activities } = extractFilters(allTrips);
    setActivities(activities);
  }, [allTrips]);

  const baseTrips = useMemo(() => allTrips, [allTrips]);

  /* 🔥 Filtering */
  useEffect(() => {
    let data = [...baseTrips];

    if (filters.search) {
      data = data.filter((t) =>
        t.title?.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    if (filters.activities.length > 0) {
      data = data.filter((trip) =>
        trip.classifications?.some((c: any) =>
          filters.activities.includes(c.termId),
        ),
      );
    }

    if (sort === "price_low") data.sort((a, b) => a.price - b.price);
    if (sort === "price_high") data.sort((a, b) => b.price - a.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);

    setFiltered(data);
  }, [filters, baseTrips, sort]);

  const visibleTrips = filtered.slice(0, visible);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔥 HEADER (SHRINK ON SCROLL) */}
      <div
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          scrolled ? "py-2 shadow-sm" : "py-6"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <h1
            className={`text-center font-semibold transition-all duration-300 ${
              scrolled ? "text-xl mb-2" : "text-3xl mb-4"
            }`}
          >
            Explore {destination}
          </h1>

          {/* SEARCH */}
          <div className="max-w-3xl mx-auto relative">
            <input
              placeholder={`Search in ${destination}...`}
              className="w-full rounded-full border bg-white px-6 py-3 shadow-sm focus:ring-2 focus:ring-blue-500"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />

            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-sm">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 FILTER ROW */}
      <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur py-3">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex items-center gap-3 overflow-x-auto">
            {/* FILTER BUTTON */}
            <button
              onClick={() => setShowFilters(true)}
              className="px-4 py-2 rounded-full border bg-gray-100 text-sm font-medium"
            >
              ⚙ Filters
            </button>

            {/* FILTER CHIPS (ANIMATED) */}
            {activities.map((a: any) => {
              const active = filters.activities.includes(a.id);

              return (
                <motion.button
                  key={a.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setFilters((prev: any) => {
                      const arr = prev.activities || [];

                      return {
                        ...prev,
                        activities: arr.includes(a.id)
                          ? arr.filter((i: string) => i !== a.id)
                          : [...arr, a.id],
                      };
                    })
                  }
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition
                    ${
                      active
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                  {a.name}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 🔥 RESULT COUNT */}
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 mt-4 text-sm text-gray-600">
        {filtered.length}+ tours in {destination}
      </div>

      {/* 🔥 GRID */}
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 py-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading trips...</p>
        ) : (
          <motion.div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
            "
          >
            {visibleTrips.map((trip) => (
              <motion.div key={trip.id} whileHover={{ y: -6, scale: 1.02 }}>
                <TripRowCard trip={trip} slug={destination} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* LOAD MORE */}
        {visible < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((prev) => prev + 8)}
              className="px-6 py-3 bg-blue-600 text-white rounded-full"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="
        w-full 
        max-w-3xl 
        h-[80vh]
        bg-white 
        rounded-2xl 
        shadow-2xl 
        flex flex-col
        overflow-hidden
      "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>

              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* BODY (SCROLLABLE) */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <TripsFilters
                filters={filters}
                setFilters={setFilters}
                tripTypes={[]}
                activities={activities}
                sort={sort}
                setSort={setSort}
              />
            </div>

            {/* FOOTER (ACTIONS) */}
            <div className="border-t px-6 py-4 flex justify-between">
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    activities: [],
                  })
                }
                className="text-sm text-gray-500 hover:text-black"
              >
                Clear all
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
