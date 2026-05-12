// lib/api.ts
export const fetchDestinations = async () => {
  const res = await fetch("/api/destinations");

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  return res.json();
};

export const fetchTrips = async (slug: string) => {
  const res = await fetch(`/api/trips?slug=${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trips");
  }

  return res.json();
};

export const fetchTripDetails = async (slug: string) => {
  console.log(slug);
  const res = await fetch(`/api/trip?slug=${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch trip");
  }

  return res.json();
};
