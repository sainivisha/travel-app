"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import TripsFilters from "./TripsFilters";
import TripRowCard from "./TripRowCard";

export default function TripsPageClient() {
  const params = useSearchParams();
  const destinationSlug = params.get("destination");

  const [trips, setTrips] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [activities, setActivities] = useState([]);

  // ✅ SINGLE FILTER STATE
  const [filters, setFilters] = useState({
    search: "",
    destination: "",
    tripTypes: [],
    activities: [],
  });

  // 🌳 Recursive helper for hierarchy
  function getChildDestinations(destinations: any[], parentId: number) {
    const children = destinations.filter((d) => d.parentId === parentId);

    let all = [...children];

    children.forEach((child) => {
      all = [...all, ...getChildDestinations(destinations, child.id)];
    });

    return all;
  }

  // 🚀 Load all data
  useEffect(() => {
    const load = async () => {
      const t = await fetch("/api/admin/trips").then((r) => r.json());
      const d = await fetch("/api/admin/destinations").then((r) => r.json());
      const tt = await fetch("/api/admin/tripTypes").then((r) => r.json());
      const act = await fetch("/api/admin/activities").then((r) =>
        r.json(),
      );

      setTrips(t);
      setDestinations(d);
      setTripTypes(tt);
      setActivities(act);

      // 🔥 URL-based destination filter
      if (destinationSlug) {
        const dest = d.find((x: any) => x.slug === destinationSlug);

        setFilters((prev) => ({
          ...prev,
          destination: dest?.id?.toString() || "",
        }));
      }
    };

    load();
  }, [destinationSlug]);

  // 🧠 MAIN FILTER ENGINE (single source of truth)
  useEffect(() => {
    let data = [...trips];

    // 🔍 Search
    if (filters.search) {
      data = data.filter((t: any) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // 🌍 Destination (hierarchy)
    if (filters.destination) {
      const selected = destinations.find(
        (d: any) => d.id === Number(filters.destination),
      );

      if (selected) {
        const children = getChildDestinations(
          destinations,
          selected.id,
        );

        const ids = [selected.id, ...children.map((c) => c.id)];

        data = data.filter((t: any) =>
          ids.includes(t.destinationId),
        );
      }
    }

    // 🎯 Trip Types
    if (filters.tripTypes.length) {
      data = data.filter((t: any) =>
        t.tripTypeIds?.some((id: number) =>
          filters.tripTypes.includes(id),
        ),
      );
    }

    // 🎯 Activities
    if (filters.activities.length) {
      data = data.filter((t: any) =>
        t.activityIds?.some((id: number) =>
          filters.activities.includes(id),
        ),
      );
    }

    setFiltered(data);
  }, [filters, trips, destinations]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

  {/* Header */}
  <div className="mb-8">
    <h1 className="text-4xl font-semibold tracking-tight">
      Explore Tours
    </h1>

    <p className="text-gray-500 mt-2">
      Discover curated travel experiences
    </p>
  </div>

  <div className="grid grid-cols-12 gap-8">

    {/* LEFT SIDEBAR */}
    <div className="col-span-3">

      <TripsFilters
        filters={filters}
        setFilters={setFilters}
        destinations={destinations}
        tripTypes={tripTypes}
        activities={activities}
      />

    </div>

    {/* RIGHT CONTENT */}
    <div className="col-span-9 space-y-6">

      {filtered.length === 0 && (
        <p className="text-center text-gray-500">
          No trips found 😔
        </p>
      )}

      {filtered.map((trip: any) => (
        <TripRowCard key={trip.id} trip={trip} />
      ))}

    </div>

  </div>

</div>
  );
}