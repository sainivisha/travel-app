export async function GET(
  req: Request,
  { params }: { params: { bookingId: string } },
) {
  try {
    const { bookingId } = await params;

    console.log("📦 Fetch booking:", bookingId);

    const res = await fetch(
      `https://travelengine-booking-iapi-152348523675.us-central1.run.app/v1/bookings/${bookingId}`,
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

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ Not JSON:", text);
      return new Response(text, { status: res.status });
    }

    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("🔥 GET error:", err);

    return Response.json({ error: "Failed to fetch booking" }, { status: 500 });
  }
}
