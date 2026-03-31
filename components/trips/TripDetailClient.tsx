"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Star,
  Calendar as CalendarIcon,
  Users,
  Heart,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function TripDetailClient({ trip }: any) {
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [openGallery, setOpenGallery] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);

  const overviewRef = useRef<any>(null);
  const highlightsRef = useRef<any>(null);
  const reviewsRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  const scrollTo = (ref: any) =>
    ref.current?.scrollIntoView({ behavior: "smooth" });

  const images = [trip.image, trip.image, trip.image, trip.image, trip.image];

  const priceAdult = trip.price || 1000;
  const priceChild = Math.round(priceAdult * 0.6);

  const total = adult * priceAdult + child * priceChild;

  const today = new Date();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{trip.title}</h1>

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="text-yellow-500 fill-yellow-500" size={16} />
            {trip.rating}
          </span>

          <span>•</span>

          <span className="flex items-center gap-1">
            <MapPin size={14} /> {trip.location}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} /> {trip.duration}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setWishlist(!wishlist)}
            className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm"
          >
            <Heart
              size={16}
              className={wishlist ? "fill-red-500 text-red-500" : ""}
            />
            Wishlist
          </button>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* STICKY NAV */}
      <div className="sticky top-16 z-40 bg-white border-b flex gap-6 py-3 text-sm">
        <button onClick={() => scrollTo(overviewRef)}>Overview</button>
        <button onClick={() => scrollTo(highlightsRef)}>Highlights</button>
        <button onClick={() => scrollTo(reviewsRef)}>Reviews</button>
        <button onClick={() => scrollTo(mapRef)}>Map</button>
      </div>

      <div className="grid grid-cols-12 gap-10">
        {/* LEFT */}
        <div className="col-span-8 space-y-10">
          {/* IMAGE GRID */}
          <div
            className="grid grid-cols-4 gap-3 cursor-pointer"
            onClick={() => setOpenGallery(true)}
          >
            <div className="col-span-2 row-span-2 relative h-[420px]">
              <Image
                src={images[0]}
                alt=""
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {images.slice(1).map((img, i) => (
              <div key={i} className="relative h-[200px]">
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* GALLERY MODAL */}
          {openGallery && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
              <button
                onClick={() => setOpenGallery(false)}
                className="absolute top-6 right-6 text-white text-xl"
              >
                ✕
              </button>

              <button
                onClick={() =>
                  setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))
                }
                className="absolute left-6 text-white text-3xl"
              >
                ‹
              </button>

              <Image
                src={images[activeImage]}
                alt=""
                width={1000}
                height={700}
                className="rounded-lg"
              />

              <button
                onClick={() =>
                  setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))
                }
                className="absolute right-6 text-white text-3xl"
              >
                ›
              </button>
            </div>
          )}

          {/* OVERVIEW */}
          <div ref={overviewRef}>
            <h2 className="text-xl font-semibold mb-4">About this activity</h2>

            <div className="grid grid-cols-2 gap-6">
              {[
                "Free cancellation",
                "Reserve now & pay later",
                trip.duration,
                "Live tour guide",
              ].map((t, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="text-green-500" />
                  <p className="text-sm">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HIGHLIGHTS */}
          <div ref={highlightsRef}>
            <h2 className="text-xl font-semibold mb-4">Highlights</h2>

            <ul className="space-y-3 text-sm">
              {[
                "UNESCO heritage sites",
                "Iconic landmarks",
                "Local culture",
                "Comfort travel",
              ].map((h, i) => (
                <li key={i} className="flex gap-2">
                  ✔ {h}
                </li>
              ))}
            </ul>
          </div>

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Full description</h2>

            <p className={`${expanded ? "" : "line-clamp-3"} text-sm`}>
              {trip.description}
            </p>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 text-sm mt-2"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </div>

          {/* REVIEWS */}
          <div ref={reviewsRef}>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

            <div className="flex gap-4 overflow-x-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[300px] border p-4 rounded-xl">
                  ⭐ 5.0
                  <p className="text-sm mt-2">Amazing experience!</p>
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div ref={mapRef}>
            <h2 className="text-xl font-semibold mb-4">Map</h2>

            <div className="h-72 bg-gray-200 rounded-xl flex items-center justify-center">
              Map Integration (Google / Mapbox)
            </div>
          </div>
        </div>

        {/* RIGHT BOOKING */}
        <div className="col-span-4">
          <div className="sticky top-24 border rounded-2xl p-6 space-y-6 shadow-sm">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="text-3xl font-bold">₹{priceAdult}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>

            {/* DATE */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full border px-4 py-3 rounded-lg flex gap-2">
                  <CalendarIcon size={16} />
                  {date ? format(date, "PPP") : "Select date"}
                </button>
              </PopoverTrigger>

              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < today}
                />
              </PopoverContent>
            </Popover>

            {/* PRICING */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Adult</span>
                <div className="flex gap-2">
                  <button onClick={() => setAdult(Math.max(1, adult - 1))}>
                    -
                  </button>
                  {adult}
                  <button onClick={() => setAdult(adult + 1)}>+</button>
                </div>
              </div>

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
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              onClick={() =>
                router.push(
                  `/destinations/${trip.slug}/${trip.slug}/booking?date=${date}&guests=${guests}`,
                )
              }
            >
              Check availability
            </Button>

            <div className="text-sm text-gray-600 space-y-2">
              <p>✔ Free cancellation</p>
              <p>✔ Reserve now & pay later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
