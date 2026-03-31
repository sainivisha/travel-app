"use client";

import { useEffect, useMemo, useState } from "react";

import TripsFilters from "./TripsFilters";
import TripRowCard from "./TripRowCard";
import TripsChips from "../TripsChips";

export default function TripsPageClient({
  destination,
  destinations,
  trips,
  isAll,
}) {
  const [filtered, setFiltered] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [activities, setActivities] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    destination: "",
    tripTypes: [],
    activities: [],
    chips: [],
  });

  // 🔥 Build children map
  const childrenMap = useMemo(() => {
    const map = new Map();

    destinations.forEach((d) => {
      const parent = d.parentId ?? -1;

      if (!map.has(parent)) {
        map.set(parent, []);
      }

      map.get(parent).push(d);
    });

    return map;
  }, [destinations]);

  // 🔥 Get all descendants
  const getAllDescendants = (parentId) => {
    const children = childrenMap.get(parentId) || [];
    let result = [...children];

    for (const child of children) {
      result = result.concat(getAllDescendants(child.id));
    }

    return result;
  };

  // 🔥 BASE TRIPS
  const baseTrips = useMemo(() => {
    if (isAll) return trips;

    const ids = [
      destination.id,
      ...getAllDescendants(destination.id).map((d) => d.id),
    ];

    const set = new Set(ids);

    return trips.filter((t) => set.has(t.destinationId));
  }, [destination, trips, childrenMap, isAll]);

  // 🔥 SIDEBAR DESTINATIONS
  const sidebarDestinations = useMemo(() => {
    if (isAll) {
      // 👉 show only countries + cities (skip continents)
      return destinations.filter((d) => d.parentId !== null);
    }

    return destinations.filter((d) => d.parentId === destination.id);
  }, [destinations, destination, isAll]);

  // 🔥 Load tripTypes + activities
  useEffect(() => {
    const load = async () => {
      const tt = await fetch("/api/admin/tripTypes").then((r) => r.json());
      const act = await fetch("/api/admin/activities").then((r) => r.json());

      setTripTypes(tt);

      const uniqueIds = [
        ...new Set(baseTrips.flatMap((t) => t.activityIds || [])),
      ];

      setActivities(act.filter((a) => uniqueIds.includes(a.id)));
    };

    load();
  }, [baseTrips]);

  // 🔥 APPLY FILTERS
  useEffect(() => {
    let data = [...baseTrips];

    // 🔍 Search
    if (filters.search) {
      data = data.filter((t) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase()),
      );
    }

    // 🌍 Destination filter
    if (filters.destination) {
      const selected = destinations.find(
        (d) => d.id === Number(filters.destination),
      );

      if (selected) {
        const ids = [
          selected.id,
          ...getAllDescendants(selected.id).map((d) => d.id),
        ];

        const set = new Set(ids);

        data = data.filter((t) => set.has(t.destinationId));
      }
    }

    // 🧭 Trip Types
    if (filters.tripTypes.length) {
      data = data.filter((t) =>
        t.tripTypeIds?.some((id) => filters.tripTypes.includes(id)),
      );
    }

    // 🎯 Activities
    if (filters.activities.length) {
      data = data.filter((t) =>
        t.activityIds?.some((id) => filters.activities.includes(id)),
      );
    }

    // 🔥 Chips filter
    if (filters.chips?.length) {
      data = data.filter((t) => {
        return filters.chips.some((chip) => {
          if (chip === "guided") return t.tripTypeIds?.includes(1);
          if (chip === "private") return t.tripTypeIds?.includes(2);
          if (chip === "boat") return t.activityIds?.includes(3);
          if (chip === "sightseeing") return t.activityIds?.includes(1);

          return true;
        });
      });
    }

    setFiltered(data);
  }, [filters, baseTrips, destinations]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* 🔥 Dynamic Heading */}
      <h1 className="text-4xl font-semibold mb-6">
        {isAll ? "All Trips" : `${destination.name} Trips`}
      </h1>

      {/* 🔥 Chips */}
      <TripsChips filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <TripsFilters
            filters={filters}
            setFilters={setFilters}
            destinations={sidebarDestinations}
            tripTypes={tripTypes}
            activities={activities}
          />
        </div>

        {/* Content */}
        <div className="col-span-9">
          {filtered.length === 0 && (
            <p className="text-center text-gray-500">No trips found 😔</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((trip) => (
              <TripRowCard
                key={trip.id}
                trip={trip}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
