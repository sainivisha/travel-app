// "use client";

// import { motion } from "framer-motion";

// type ItineraryItem = {
//   label: string;
//   title: string;
//   description: string;
//   date?: string;
// };

// function getIcon(text: string) {
//   const t = text.toLowerCase();

//   if (t.includes("arrival") || t.includes("pickup")) return "🚗";
//   if (t.includes("hotel") || t.includes("stay")) return "🏨";
//   if (t.includes("fort") || t.includes("palace")) return "🏰";
//   if (t.includes("food") || t.includes("dinner")) return "🍜";
//   if (t.includes("nature") || t.includes("park")) return "🌿";
//   if (t.includes("temple")) return "🛕";

//   return "✨";
// }

// export default function TripItinerary({
//   itinerary,
// }: {
//   itinerary?: ItineraryItem[];
// }) {
//   if (!itinerary?.length) return null;

//   return (
//     <div className="max-w-2xl">
//       {/* TITLE */}
//       <h2 className="text-2xl font-semibold mb-6">Your journey, day by day</h2>

//       <div className="relative">
//         {/* TIMELINE LINE */}
//         <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-200 via-gray-200 to-transparent" />

//         <div className="space-y-8">
//           {itinerary.map((item, i) => {
//             const icon = getIcon(item.title + item.description);

//             return (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//                 className="relative pl-12"
//               >
//                 {/* ICON NODE */}
//                 <div
//                   className="
//                   absolute left-0 top-1
//                   w-9 h-9 rounded-xl
//                   bg-white border shadow-sm
//                   flex items-center justify-center text-lg
//                 "
//                 >
//                   {icon}
//                 </div>

//                 {/* CARD */}
//                 <div
//                   className="
//                   bg-white border rounded-2xl p-5
//                   shadow-sm hover:shadow-md
//                   transition-all duration-300
//                 "
//                 >
//                   {/* HEADER */}
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span
//                         className="
//                         text-xs font-medium
//                         bg-sky-100 text-sky-600
//                         px-2 py-1 rounded-full
//                       "
//                       >
//                         {item.label}
//                       </span>

//                       <h3 className="mt-2 text-lg font-semibold text-gray-900">
//                         {item.title}
//                       </h3>
//                     </div>

//                     {item.date && (
//                       <span className="text-xs text-gray-400">{item.date}</span>
//                     )}
//                   </div>

//                   {/* DESCRIPTION */}
//                   <div
//                     className="
//                       mt-3 text-sm text-gray-600 leading-relaxed
//                       [&_ul]:list-disc [&_ul]:pl-5
//                       [&_li]:mb-1
//                     "
//                     dangerouslySetInnerHTML={{
//                       __html: item.description,
//                     }}
//                   />

//                   {/* OPTIONAL TIME SLOTS (AUTO DETECT) */}
//                   {item.description?.includes(":") && (
//                     <div className="mt-3 text-xs text-gray-500">
//                       ⏱ Timeline included
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";

// type ItineraryItem = {
//   label: string;
//   title: string;
//   description: string;
//   image?: string;
//   lat?: number;
//   lng?: number;
// };

// export default function TripItineraryUltraPlus({
//   itinerary,
//   onDayChange, // 🔥 for map sync
// }: {
//   itinerary?: ItineraryItem[];
//   onDayChange?: (day: ItineraryItem) => void;
// }) {
//   const refs = useRef<(HTMLDivElement | null)[]>([]);
//   const [active, setActive] = useState(0);

//   if (!itinerary?.length) return null;

//   // 🔥 SCROLL SYNC
//   useEffect(() => {
//     const handleScroll = () => {
//       refs.current.forEach((ref, i) => {
//         if (!ref) return;
//         const rect = ref.getBoundingClientRect();

//         if (rect.top < 150 && rect.bottom > 150) {
//           setActive(i);
//           onDayChange?.(itinerary[i]); // 🔥 MAP SYNC
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [itinerary]);

//   return (
//     <div className="max-w-4xl">
//       {/* 🔥 PROGRESS BAR */}
//       <div className="mb-6">
//         <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-sky-500 transition-all"
//             style={{
//               width: `${((active + 1) / itinerary.length) * 100}%`,
//             }}
//           />
//         </div>
//         <p className="text-xs text-gray-500 mt-2">
//           Day {active + 1} of {itinerary.length}
//         </p>
//       </div>

//       {/* 🔥 STICKY TABS */}
//       <div className="sticky top-20 bg-white z-20 border-b mb-8">
//         <div className="flex gap-3 overflow-x-auto py-3 px-2">
//           {itinerary.map((item, i) => (
//             <button
//               key={i}
//               onClick={() =>
//                 refs.current[i]?.scrollIntoView({
//                   behavior: "smooth",
//                 })
//               }
//               className={`px-4 py-2 rounded-full text-sm ${
//                 active === i
//                   ? "bg-black text-white"
//                   : "bg-gray-100 text-gray-600"
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 🔥 TIMELINE */}
//       <div className="relative">
//         <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200" />

//         <div className="space-y-12">
//           {itinerary.map((item, i) => {
//             const isActive = active === i;

//             return (
//               <motion.div
//                 key={i}
//                 ref={(el) => (refs.current[i] = el)}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 className="relative pl-12"
//               >
//                 {/* DOT */}
//                 <div
//                   className={`absolute left-0 top-2 w-9 h-9 rounded-full flex items-center justify-center border ${
//                     isActive
//                       ? "bg-sky-500 text-white"
//                       : "bg-white text-gray-600"
//                   }`}
//                 >
//                   {i + 1}
//                 </div>

//                 {/* CARD */}
//                 <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
//                   {/* IMAGE */}
//                   {item.image && (
//                     <div className="h-52">
//                       <img
//                         src={item.image}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}

//                   {/* CONTENT */}
//                   <div className="p-5">
//                     <span className="text-xs bg-sky-100 text-sky-600 px-2 py-1 rounded-full">
//                       {item.label}
//                     </span>

//                     <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

//                     <div
//                       className="mt-3 text-sm text-gray-600"
//                       dangerouslySetInnerHTML={{
//                         __html: item.description,
//                       }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

type ItineraryItem = {
  label: string;
  title: string;
  description: string;
  image?: string;
};

export default function TripItineraryUltra({
  itinerary,
}: {
  itinerary?: ItineraryItem[];
}) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  if (!itinerary?.length) return null;

  // 🔥 SCROLL SYNC
  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        if (rect.top < 150 && rect.bottom > 150) {
          setActive(i);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-4xl">
      {/* TITLE */}
      <h2 className="text-3xl font-semibold mb-6">Your journey, day by day</h2>

      {/* 🔥 STICKY DAY TABS */}
      <div className="sticky top-20 z-20 bg-white/80 backdrop-blur border-b mb-8">
        <div className="flex gap-3 overflow-x-auto py-3 px-2">
          {itinerary.map((item, i) => (
            <button
              key={i}
              onClick={() =>
                sectionRefs.current[i]?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                active === i
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 TIMELINE */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200" />

        <div className="space-y-12">
          {itinerary.map((item, i) => (
            <motion.div
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative pl-12"
            >
              {/* DOT */}
              <div className="absolute left-0 top-2 w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center">
                <span className="text-xs font-semibold">{i + 1}</span>
              </div>

              {/* CARD */}
              <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
                {/* IMAGE */}
                {item.image && (
                  <div className="h-52 relative">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* CONTENT */}
                <div className="p-5">
                  <span className="text-xs bg-sky-100 text-sky-600 px-2 py-1 rounded-full">
                    {item.label}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

                  <div
                    className="
                      mt-3 text-sm text-gray-600 leading-relaxed
                      [&_ul]:list-disc [&_ul]:pl-5
                    "
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
