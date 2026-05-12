export async function getTrip(tripId: string) {
  const res = await fetch(
    `https://travelengine-trip-iapi-152348523675.us-central1.run.app/v1/trips/${tripId}`,
    {
      method: "GET",
      headers: {
        Authorization: "SSSSS",
        "x-user-id": "tarunrohila@gmail.com",
        "x-filter-active": "true",
        "Correlation-Id": "test-travel",
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("API ERROR:", data);
    throw new Error("Failed to fetch trip");
  }

  return data;
}
