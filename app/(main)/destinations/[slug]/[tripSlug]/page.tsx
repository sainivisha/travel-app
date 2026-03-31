import TripDetailClient from "@/components/trips/TripDetailClient";

async function getTrip(slug: string) {
  const res = await fetch("http://localhost:3000/api/admin/trips", {
    cache: "no-store",
  });

  const trips = await res.json();

  console.log(trips, slug);

  return trips.find((t: any) => t.slug === slug);
}

export default async function Page({ params }: any) {
  const param = await params;
  const trip = await getTrip(param.tripSlug);

  return <TripDetailClient trip={trip} />;
}
