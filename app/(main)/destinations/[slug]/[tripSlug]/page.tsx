import TripDetailClient from "@/components/trips/TripDetail/TripDetailClient";
import { transformTrip } from "@/lib/utils/trip";

async function getTrip(tripSlug: string) {
  console.log("Slug:", tripSlug);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TRAVEL_ENGINE_TRIP_ENDPOINT}/slug/${tripSlug}`,
    {
      headers: {
        Authorization: process.env.TRAVEL_ENGINE_AUTH!,
        "x-user-id": "tarunrohila@gmail.com",
        "x-filter-active": "true",
        "Correlation-Id": "test-travel",
      },
      next: { revalidate: 60 },
    },
  );

  const data = await res.json();
  console.log("API DATA:", data);

  return data;
}

export default async function Page({ params }: any) {
  const param = await params;

  const data = await getTrip(param.tripSlug);

  const tripData = transformTrip(data);

  return <TripDetailClient trip={tripData} />;
}
