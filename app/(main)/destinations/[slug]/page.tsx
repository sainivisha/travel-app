import { notFound } from "next/navigation";
import TripsPageClient from "@/components/trips/TripsPageClient";

async function getData(slug: string) {
  const [destRes, tripsRes] = await Promise.all([
    fetch("http://localhost:3000/api/admin/destinations", {
      cache: "no-store",
    }),
    fetch("http://localhost:3000/api/admin/trips", {
      cache: "no-store",
    }),
  ]);

  const destinations = await destRes.json();
  const trips = await tripsRes.json();

  if (slug === "all") {
    return {
      destination: {
        id: "all",
        name: "All Destinations",
        slug: "all",
      },
      destinations,
      trips,
      isAll: true, // 👈 important flag
    };
  }

  const destination = destinations.find((d: any) => d.slug === slug);
  console.log(destination, slug);

  if (!destination) return null;

  return { destination, destinations, trips, isAll: false };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const param = await params;
  const data = await getData(param.slug);

  if (!data) return notFound();

  return <TripsPageClient {...data} />;
}
