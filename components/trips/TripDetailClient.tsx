"use client";

import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { format } from "date-fns";

export default function TripDetailClient({ trip }: any) {
  const [selectedImage, setSelectedImage] = useState(trip?.image);

  // ✅ BOOKING STATE
  const [date, setDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);

  const price = trip.price || 0;
  const total = price * guests;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!trip) return <p>Trip not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* TOP */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* GALLERY */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative h-[420px] rounded-2xl overflow-hidden">
            <Image src={selectedImage} alt="" fill className="object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[trip.image, trip.image, trip.image, trip.image].map((img, i) => (
              <div
                key={i}
                className="relative h-24 cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 BOOKING CARD (UPGRADED) */}
        <div className="sticky top-24 h-fit border rounded-2xl p-6 shadow bg-white space-y-6">
          {/* PRICE */}
          <div>
            <p className="text-gray-500 text-sm">From</p>
            <h2 className="text-3xl font-semibold">${price}</h2>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Star size={16} className="text-yellow-500" />
              {trip.rating}
            </div>
          </div>

          {/* 📅 DATE PICKER */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full border rounded-lg px-3 py-2 text-left">
                {date ? format(date, "PPP") : "Select Date"}
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < today}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* 👥 GUEST SELECTOR */}
          <div>
            <p className="text-sm font-medium mb-2">Guests</p>

            <div className="flex items-center justify-between border rounded-lg px-3 py-2">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="text-lg"
              >
                -
              </button>

              <span>{guests}</span>

              <button onClick={() => setGuests(guests + 1)} className="text-lg">
                +
              </button>
            </div>
          </div>

          {/* 💰 TOTAL */}
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span className="font-semibold">${total}</span>
          </div>

          {/* 🚀 CTA */}
          <Button
            className="w-full"
            disabled={!date} // ❗ require date
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* TITLE */}
      <div>
        <h1 className="text-3xl font-semibold">{trip.title}</h1>

        <div className="flex gap-6 text-gray-500 mt-3 text-sm">
          <span className="flex items-center gap-1">
            <MapPin size={16} /> {trip.location}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} /> {trip.duration}
          </span>
        </div>
      </div>

      {/* ACTIVITIES */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {trip.activityIds?.map((id: any) => (
          <span key={id} className="text-xs bg-gray-100 px-2 py-1 rounded">
            Activity #{id}
          </span>
        ))}
      </div>

      {/* TABS */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="includes">Includes</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <p className="text-gray-600 leading-relaxed">{trip.description}</p>
        </TabsContent>

        <TabsContent value="includes" className="mt-6">
          <ul className="list-disc pl-6 text-gray-600">
            <li>Guide included</li>
            <li>Transport included</li>
            <li>Meals included</li>
          </ul>
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {[trip.image, trip.image, trip.image].map((img, i) => (
              <div key={i} className="relative h-40 rounded-xl overflow-hidden">
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
