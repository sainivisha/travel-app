export const revalidate = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const destRes = await fetch(
      `${process.env.NEXT_PUBLIC_TRAVEL_ENGINE_ENDPOINT}/taxonomy-terms/byDefinitionKey/trip.destination/slug/${slug}`,
      {
        headers: {
          Authorization: process.env.TRAVEL_ENGINE_AUTH!,
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
      },
    );

    if (!destRes.ok) {
      const error = await destRes.text();
      console.error("Destination API error:", error);

      return Response.json(
        { error: "Failed to fetch destination" },
        { status: 500 },
      );
    }

    const destData = await destRes.json();
    const taxonomyTermId = destData?.id || destData?.termId;

    if (!taxonomyTermId) {
      return Response.json(
        { error: "Invalid destination data" },
        { status: 500 },
      );
    }

    // 🔥 Step 2: Fetch trips
    const tripsRes = await fetch(
      `${process.env.NEXT_PUBLIC_TRAVEL_ENGINE_TRIP_ENDPOINT}/byTaxonomy/trip.destination/${taxonomyTermId}?includeDescendants=true`,
      {
        headers: {
          Authorization: process.env.TRAVEL_ENGINE_AUTH!,
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
      },
    );

    if (!tripsRes.ok) {
      const error = await tripsRes.text();
      console.error("Trips API error:", error);

      return Response.json({ error: "Failed to fetch trips" }, { status: 500 });
    }

    const data = await tripsRes.json();

    return Response.json(data);
  } catch (e) {
    console.error("Server error:", e);

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
