import { getTrip } from "@/lib/api/getTrip";
import BookingLayout from "@/components/booking/BookingLayout";

export default async function Page({ params, searchParams }: any) {
  const { slug, tripId } = await params;

  console.log("Slug:", slug);
  console.log("TripId:", tripId);

  const trip = await getTrip(tripId);

  return <BookingLayout trip={trip} searchParams={searchParams} />;
}
