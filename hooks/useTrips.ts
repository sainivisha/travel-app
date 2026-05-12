import { useEffect, useMemo, useState } from "react";

type Destination = {
  id: string;
  name: string;
  slug: string;
};

type Trip = {
  id: string;
  title: string;
  slug: string;
  destinationId: string;
  rating: number;
  image: string;
  activityIds?: number[];
};

type Props = {
  destinations: Destination[];
  activeMenuType: "top" | "continent" | "activity";
  activeContinent: string | null;
  activeActivityId: number | null;
  getDestinationsByContinent: (id: string) => Destination[];
};

export function useTrips({
  activeMenuType,
  activeContinent,
}: {
  activeMenuType: "top" | "continent";
  activeContinent: string | null;
}) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     try {
  //       setLoading(true);

  //       let data: any[] = [];

  //       // ✅ If continent selected → fetch filtered
  //       if (activeMenuType === "continent" && activeContinent) {
  //         const res = await fetch(
  //           `/api/trips?taxonomyTermId=${activeContinent}`,
  //         );
  //         data = await res.json();
  //       } else {
  //         // ✅ Default → all trips
  //         const res = await fetch(`/api/trips`);
  //         data = await res.json();
  //       }

  //       // ✅ Normalize
  //       const normalized: Trip[] = data.map((t: any) => {
  //         const destination = t.classifications?.find(
  //           (c: any) => c.taxonomyKey === "trip.destination",
  //         );

  //         return {
  //           id: String(t.id),
  //           title: t.title,
  //           slug: t.slug,
  //           destinationId: destination?.termId || "",
  //           rating: t.rating || 0,
  //           image:
  //             t.thumbnail || t.gallery?.images?.[0]?.url || "/placeholder.png",
  //         };
  //       });

  //       setTrips(normalized);
  //     } catch (e) {
  //       console.error("Trips fetch error", e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTrips();
  // }, [activeMenuType, activeContinent]);

  // ✅ Top trips
  const topTrips = useMemo(() => {
    return [...trips].sort((a, b) => b.rating - a.rating).slice(0, 6);
  }, [trips]);

  // ✅ Visible trips
  const visibleTrips = useMemo(() => {
    if (activeMenuType === "top") return topTrips;
    return trips.slice(0, 6);
  }, [activeMenuType, trips, topTrips]);

  return {
    trips,
    visibleTrips,
    loading,
  };
}
