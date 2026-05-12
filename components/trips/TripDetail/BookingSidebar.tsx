// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { TripUI } from "@/types/trip";

// interface BookingSidebarProps {
//   slug: string;
//   priceCategories: TripUI["priceCategories"];
//   availableDates: TripUI["availableDates"];
//   inventory: TripUI["inventory"];
// }

// export default function BookingSidebar({
//   slug,
//   priceCategories,
//   availableDates,
//   inventory,
// }: BookingSidebarProps) {
//   const router = useRouter();

//   const [date, setDate] = useState<Date | undefined>();
//   const [adult, setAdult] = useState(1);
//   const [child, setChild] = useState(0);
//   const [selectedPrice, setSelectedPrice] = useState(priceCategories?.[0]);

//   const adultCategory = priceCategories?.find(
//     (p) => p.category?.toLowerCase() === "adult",
//   );
//   const childCategory = priceCategories?.find(
//     (p) => p.category?.toLowerCase() === "child",
//   );

//   const available = availableDates?.map((d) =>
//     new Date(d.startDate).toDateString(),
//   );

//   const adultPrice =
//     adultCategory?.salePrice ||
//     adultCategory?.price ||
//     selectedPrice?.salePrice ||
//     selectedPrice?.price ||
//     0;

//   const childPrice = childCategory?.salePrice || childCategory?.price || 0;

//   const total = adult * adultPrice + (childCategory ? child * childPrice : 0);

//   return (
//     <div className="sticky top-24 rounded-3xl p-6 space-y-6 bg-white/70 backdrop-blur-xl border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
//       {/* Price header */}
//       <div>
//         <p className="text-sm text-gray-500">Starting from</p>
//         <p className="text-3xl font-bold">
//           ₹{selectedPrice?.salePrice || selectedPrice?.price}
//         </p>
//         <p className="text-xs text-gray-400">
//           {selectedPrice?.pricePer === "GROUP" ? "per group" : "per person"}
//         </p>
//       </div>

//       {/* Price category select */}
//       <div>
//         <p className="text-sm font-medium mb-2">Select option</p>
//         <div className="space-y-2">
//           {priceCategories?.map((p, i) => (
//             <button
//               key={i}
//               onClick={() => setSelectedPrice(p)}
//               className={`w-full border p-3 rounded-lg text-left ${
//                 selectedPrice?.category === p.category
//                   ? "border-blue-600 bg-blue-50"
//                   : ""
//               }`}
//             >
//               <div className="flex justify-between">
//                 <span className="font-medium">{p.category}</span>
//                 <span>₹{p.salePrice || p.price}</span>
//               </div>
//               <p className="text-xs text-gray-500">
//                 {p.pricePer === "GROUP" ? "per group" : "per person"}
//               </p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Date selection */}
//       {availableDates?.length > 0 ? (
//         <div>
//           <p className="font-medium mb-2">Select Date</p>
//           <div className="space-y-2">
//             {availableDates.map((d, i) => (
//               <button
//                 key={i}
//                 onClick={() => setDate(new Date(d.startDate))}
//                 className={`w-full border p-3 rounded-lg text-left ${
//                   date?.toISOString() === new Date(d.startDate).toISOString()
//                     ? "border-blue-600 bg-blue-50"
//                     : ""
//                 }`}
//               >
//                 <p className="font-medium">{d.label}</p>
//                 <p className="text-xs text-gray-500">
//                   {d.startDate} → {d.endDate}
//                 </p>
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <Popover>
//           <PopoverTrigger asChild>
//             <button className="w-full border px-4 py-3 rounded-xl flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <CalendarIcon size={16} />
//                 {date ? format(date, "PPP") : "Select date"}
//               </div>
//             </button>
//           </PopoverTrigger>

//           <PopoverContent className="p-4 rounded-2xl shadow-xl border bg-white">
//             <div>
//               <p className="font-medium mb-2">Select your travel date</p>

//               <div className="rounded-2xl border p-3 bg-white shadow-sm">
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={setDate}
//                   disabled={(d) => {
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);

//                     if (d < today) return true;

//                     if (available?.length) {
//                       return !available.includes(d.toDateString());
//                     }

//                     return false;
//                   }}
//                   modifiers={{
//                     available: (date) =>
//                       available?.includes(date.toDateString()),
//                   }}
//                   modifiersClassNames={{
//                     available:
//                       "bg-sky-100 text-sky-600 font-semibold rounded-full",
//                   }}
//                 />
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       )}

//       {/* Pax counter */}
//       {selectedPrice?.pricePer !== "GROUP" && (
//         <div className="space-y-3">
//           <div className="flex justify-between">
//             <span>Adult</span>
//             <div className="flex gap-2">
//               <button onClick={() => setAdult(Math.max(1, adult - 1))}>
//                 -
//               </button>
//               {adult}
//               <button onClick={() => setAdult(adult + 1)}>+</button>
//             </div>
//           </div>
//           {childCategory && (
//             <div className="flex justify-between">
//               <span>Child</span>
//               <div className="flex gap-2">
//                 <button onClick={() => setChild(Math.max(0, child - 1))}>
//                   -
//                 </button>
//                 {child}
//                 <button onClick={() => setChild(child + 1)}>+</button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Total */}
//       <div className="border-t pt-4 flex justify-between font-semibold">
//         <span>Total</span>
//         <span>₹ {total}</span>
//       </div>

//       <Button
//         className="w-full h-12 bg-sky-500 hover:bg-sky-600 shadow-[0_10px_30px_rgba(14,165,233,0.3)]"
//         disabled={!date}
//         onClick={() =>
//           router.push(`/booking?trip=${slug}&date=${date}&pax=${adult + child}`)
//         }
//       >
//         {date ? "Book Now" : "Select Date"}
//       </Button>

//       {inventory && (
//         <p className="text-xs text-gray-500 text-center">
//           Only {inventory.inventorySize} spots left
//         </p>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { TripUI } from "@/types/trip";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then((mod) => mod.Calendar),
  { ssr: false },
);

interface BookingSidebarProps {
  slug: string;
  priceCategories: TripUI["priceCategories"];
  availableDates: TripUI["availableDates"];
  inventory: TripUI["inventory"];
  tripId: TripUI["id"];
}

export default function BookingSidebar({
  slug,
  priceCategories,
  availableDates,
  inventory,
  tripId,
}: BookingSidebarProps) {
  const router = useRouter();

  const [range, setRange] = useState<{ from?: Date; to?: Date }>(() => {
    if (availableDates?.length > 0) {
      return {
        from: new Date(availableDates[0]?.startDate),
        to: new Date(availableDates[0]?.endDate),
      };
    }
    return {};
  });
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(priceCategories?.[0]);

  const available = availableDates?.map((d) =>
    new Date(d.startDate).toDateString(),
  );

  const totalDays =
    range.from && range.to
      ? Math.max(
          1,
          Math.ceil(
            (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1,
        )
      : 0;

  const basePrice = selectedPrice?.salePrice || selectedPrice?.price || 0;

  const childCategory = priceCategories?.find(
    (p) => p.category?.toLowerCase() === "child",
  );

  const total =
    totalDays > 0
      ? totalDays * basePrice * (adult + child)
      : basePrice * (adult + child);

  return (
    <div className="sticky top-24 bg-white border shadow-sm rounded-2xl p-6 space-y-6">
      {/* 🔥 JOURNEY SELECTOR */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="w-full bg-sky-50 border rounded-xl p-4 text-left hover:bg-sky-100 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Your journey</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {range.from
                    ? `${format(range.from, "MMM d")} ${
                        range.to ? `→ ${format(range.to, "MMM d")}` : ""
                      }`
                    : "Select your travel dates"}
                </p>
              </div>

              <CalendarIcon size={20} />
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={10}
          className="
            p-0 
            border 
            rounded-2xl 
            shadow-2xl 
            bg-white 
            w-[720px] 
            max-w-[95vw]
          "
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            {/* HEADER */}
            <div className="mb-4">
              <p className="text-lg font-semibold">Select your travel dates</p>
            </div>

            {/* CALENDAR */}
            <div className="overflow-hidden">
              <Calendar
                mode="range"
                selected={range}
                onSelect={(r: any) => setRange(r || {})}
                numberOfMonths={2}
                pagedNavigation
                disabled={(d: Date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return d < today;
                }}
                modifiers={{
                  available: (date: Date) =>
                    available?.includes(date.toDateString()),
                }}
                className="w-full"
                classNames={{
                  months: "flex flex-col md:flex-row gap-6 justify-center",
                  month: "space-y-4",
                  caption: "flex justify-between items-center px-2",
                  caption_label: "text-base font-semibold",
                  nav_button:
                    "h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center",
                  table: "w-full border-collapse",
                  head_row: "flex justify-between text-xs text-gray-500",
                  row: "flex justify-between mt-2",
                  cell: "text-center text-sm p-0",
                  day: "h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition",
                  day_selected: "bg-black text-white",
                  day_today: "border border-black",
                }}
                modifiersClassNames={{
                  available:
                    "bg-sky-100 text-sky-600 font-semibold rounded-full",
                  range_start: "bg-black text-white",
                  range_end: "bg-black text-white",
                  range_middle: "bg-sky-200",
                }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Highlighted dates are recommended
            </p>
          </motion.div>
        </PopoverContent>
      </Popover>

      {/* 🔥 PRICE */}
      <div>
        <p className="text-sm text-gray-500">Starting from</p>
        <p className="text-3xl font-bold">₹{basePrice}</p>
        <p className="text-xs text-gray-400">per person / day</p>
      </div>

      {/* 🔥 OPTIONS */}
      <div className="space-y-2">
        {priceCategories?.map((p, i) => (
          <button
            key={i}
            onClick={() => setSelectedPrice(p)}
            className={`w-full border p-3 rounded-xl text-left transition ${
              selectedPrice?.category === p.category
                ? "border-sky-600 bg-sky-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex justify-between">
              <span>{p.category}</span>
              <span>₹{p.salePrice || p.price}</span>
            </div>
          </button>
        ))}
      </div>

      {/* 🔥 PAX */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Adult</span>
          <div className="flex gap-2">
            <button onClick={() => setAdult(Math.max(1, adult - 1))}>-</button>
            {adult}
            <button onClick={() => setAdult(adult + 1)}>+</button>
          </div>
        </div>

        {childCategory && (
          <div className="flex justify-between">
            <span>Child</span>
            <div className="flex gap-2">
              <button onClick={() => setChild(Math.max(0, child - 1))}>
                -
              </button>
              {child}
              <button onClick={() => setChild(child + 1)}>+</button>
            </div>
          </div>
        )}
      </div>

      {/* 🔥 TOTAL */}
      <div className="border-t pt-4 flex justify-between font-semibold">
        <span>Total</span>
        <span>₹ {total}</span>
      </div>

      {/* 🔥 CTA */}
      <Button
        className="w-full h-12 bg-sky-500 hover:bg-sky-600"
        disabled={!range.from}
        onClick={() =>
          router.push(
            `/trips/${slug}/${tripId}/booking?start=${range.from?.toISOString() ?? ""}&end=${
              range.to?.toISOString() ?? ""
            }&pax=${adult + child}`,
          )
        }
      >
        {range.from ? "Continue to booking" : "Select dates"}
      </Button>

      {inventory && (
        <p className="text-xs text-gray-500 text-center">
          Only {inventory.inventorySize} spots left
        </p>
      )}
    </div>
  );
}
