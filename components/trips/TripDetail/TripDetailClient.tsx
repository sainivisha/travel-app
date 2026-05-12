"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, Heart, Share2 } from "lucide-react";
import { TripUI } from "@/types/trip";

import TripGallery from "./TripGallery";
import TripOverview from "./TripOverview";
import TripHighlights from "./TripHighlights";
import IncludesExcludes from "./IncludesExcludes";
import TripFaq from "./TripFaq";
import TripAttachments from "./TripAttachments";
import TripPickupMap from "./TripPickupMap";
import BookingSidebar from "./BookingSidebar";
import MobileBookingBar from "./MobileBookingBar";
import { parseList } from "@/lib/utils/trip";
import TripItinerary from "./TripItinerary";

export default function TripDetailClient({ trip }: { trip: TripUI }) {
  const [wishlist, setWishlist] = useState(false);

  const images = trip.images?.length ? trip.images : [trip.image];
  const basePrice =
    trip.priceCategories?.[0]?.salePrice ||
    trip.priceCategories?.[0]?.price ||
    trip.price ||
    0;

  return (
    <div className="relative bg-gradient-to-b from-white via-slate-50 to-white min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900">{trip.title}</h1>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            {trip.rating ? (
              <span className="flex items-center gap-1">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                {trip.rating}
              </span>
            ) : (
              <span className="text-xs text-gray-400">New</span>
            )}
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {trip.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {trip.duration}
            </span>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setWishlist(!wishlist)}
              className="p-2 rounded-full bg-white/70 backdrop-blur border border-white/30 shadow hover:scale-110 transition"
            >
              <Heart className={wishlist ? "fill-red-500 text-red-500" : ""} />
            </button>
            <button className="p-2 rounded-full bg-white/70 backdrop-blur border border-white/30 shadow hover:scale-110 transition">
              <Share2 />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <TripGallery
                images={images}
                caption={trip.imagesMeta?.[0]?.caption}
              />
            </motion.div>

            {trip.video && (
              <video src={trip.video} controls className="w-full rounded-xl" />
            )}

            <TripOverview facts={trip.facts} description={trip.description} />
            <TripHighlights highlights={trip.highlights} />
            <TripItinerary itinerary={trip.itinerary} />
            <IncludesExcludes
              includes={parseList(trip.includes)}
              excludes={parseList(trip.excludes)}
            />
            <TripFaq faq={trip.faq} />
            <TripAttachments attachments={trip.attachments} />
            <TripPickupMap pickupLocations={trip.pickupLocations} />
          </div>

          <div className="col-span-4">
            <BookingSidebar
              slug={trip.slug}
              priceCategories={trip.priceCategories}
              availableDates={trip.availableDates}
              inventory={trip.inventory}
              tripId={trip.id}
            />
          </div>
        </div>
      </div>

      <MobileBookingBar slug={trip.slug} basePrice={basePrice} />
    </div>
  );
}
