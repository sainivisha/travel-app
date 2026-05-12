// app/api/destinations/route.ts
export async function GET() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TRAVEL_ENGINE_ENDPOINT}/taxonomy-terms/byDefinitionKey/trip.destination`,
    {
      method: "GET",
      headers: {
        Authorization: "SSSSS",
        "x-user-id": "tarunrohila@gmail.com",
        "x-filter-active": "true",
        "Correlation-Id": "test-travel",
      },
    },
  );

  if (!res.ok) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }

  const data = await res.json();

  return Response.json(data);
}
