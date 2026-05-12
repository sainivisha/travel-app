"use client";

import dynamic from "next/dynamic";
import { TripUI } from "@/types/trip";

const TripMap = dynamic(() => import("@/components/tripMap/TripMap"), {
  ssr: false,
});

interface TripPickupMapProps {
  pickupLocations: TripUI["pickupLocations"];
}

export default function TripPickupMap({ pickupLocations }: TripPickupMapProps) {
  if (!pickupLocations?.length) return null;

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Pickup Locations</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <TripMap locations={pickupLocations} showRoute />
        <div className="space-y-3">
          {pickupLocations.map((loc, i) => (
            <div key={i} className="border p-3 rounded-lg">
              <p className="font-medium">📍 {loc.label}</p>
              <p className="text-sm text-gray-500">{loc.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
