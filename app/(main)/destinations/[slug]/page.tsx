import TripsPageClient from "@/components/trips/TripsPageClient";

export default async function Page({ params }: { params: { slug: string } }) {
  return <TripsPageClient />;
}
