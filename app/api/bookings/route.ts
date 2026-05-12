export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📦 Incoming payload:", body);

    const res = await fetch(
      "https://travelengine-booking-iapi-152348523675.us-central1.run.app/v1/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "SSSSS",
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
        body: JSON.stringify(body),
      },
    );

    const text = await res.text();
    console.log("🌍 Backend response:", text);

    return new Response(text, { status: res.status });
  } catch (err) {
    console.error("🔥 Proxy error:", err);

    return Response.json({ error: "Proxy failed" }, { status: 500 });
  }
}
