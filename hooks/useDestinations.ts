import { useEffect, useMemo, useState, useCallback } from "react";
import { fetchDestinations } from "@/lib/api";

type Destination = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: number;
  image?: string;
  description?: string;
};

type ApiDestination = {
  id: number;
  name: string;
  parentId?: number;
  level: number;
  slug: string;
  metadata?: { image?: string };
  description?: string;
  taxonomyKey: string;
};

export function useDestinations(debouncedSearch: string) {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDestinations();

      const normalized = data
        .filter((d: ApiDestination) => d.taxonomyKey === "trip.destination")
        .map((d: ApiDestination) => ({
          id: String(d.id),
          name: d.name,
          parentId: d.parentId ? String(d.parentId) : null,
          level: d.level,
          slug: d.slug,
          image: d.metadata?.image || "/placeholder.png",
          description: d.description || "",
        }));

      setDestinations(normalized);
    };

    fetchData();
  }, []);

  const continents = useMemo(
    () => destinations.filter((d) => d.level === 1),
    [destinations],
  );

  const byParent = useMemo(() => {
    const map = new Map<string | null, Destination[]>();

    destinations.forEach((d) => {
      if (!map.has(d.parentId)) map.set(d.parentId, []);
      map.get(d.parentId)!.push(d);
    });

    return map;
  }, [destinations]);

  function getAllChildren(id: string): Destination[] {
    const children = byParent.get(id) || [];

    return children.flatMap((child) => [child, ...getAllChildren(child.id)]);
  }

  const getDestinationsByContinent = useCallback(
    (continentId: string, limit?: number) => {
      const result: Destination[] = [];

      const countries = byParent.get(continentId) || [];

      for (const country of countries) {
        if (country.level !== 2) continue; // ✅ safety

        result.push(country);

        const states = byParent.get(country.id) || [];

        for (const state of states) {
          if (state.level !== 3) continue;

          result.push(state);

          const cities = byParent.get(state.id) || [];

          for (const city of cities) {
            if (city.level !== 4) continue;

            result.push(city);

            if (limit && result.length >= limit) return result;
          }
        }
      }

      return result;
    },
    [byParent],
  );
  const filteredDestinations = useMemo(() => {
    if (!debouncedSearch || debouncedSearch.length < 3) return [];

    const search = debouncedSearch.toLowerCase();
    const results: Destination[] = [];

    destinations.forEach((d) => {
      if (d.name.toLowerCase().includes(search)) {
        results.push(d);
        results.push(...getAllChildren(d.id));
      }
    });

    return Array.from(
      new Map(results.map((item) => [item.id, item])).values(),
    ).slice(0, 20);
  }, [debouncedSearch, destinations, getAllChildren]);

  return {
    destinations,
    continents,
    filteredDestinations,
    getDestinationsByContinent,
  };
}
