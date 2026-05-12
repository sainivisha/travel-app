export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "slug required" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_TRAVEL_ENGINE_TRIP_ENDPOINT}/slug/${slug}`,
      {
        headers: {
          Authorization: process.env.TRAVEL_ENGINE_AUTH!,
        },
      },
    );

    if (!res.ok) {
      return Response.json({ error: "Failed" }, { status: 500 });
    }

    const data = await res.json();

    return Response.json(data);
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Internal error" }, { status: 500 });
  }
}
