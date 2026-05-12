export async function POST(
  req: Request,
  { params }: { params: { paymentId: string } },
) {
  try {
    const { paymentId } = await params;
    const body = await req.json();

    console.log("🔐 Authorizing:", paymentId, body);

    const res = await fetch(
      `https://common-payment-iapi-152348523675.us-central1.run.app/v1/payments/${paymentId}/authorize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔥 MISSING BEFORE
          Authorization: "SSSSS",
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
        body: JSON.stringify(body),
      },
    );

    const text = await res.text();
    console.log("🌍 Backend raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(text, { status: res.status });
    }

    if (!res.ok) {
      console.error("❌ Backend error:", data);
      return Response.json(data, { status: res.status });
    }

    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("🔥 Authorize error:", err);

    return Response.json(
      { error: "Authorization failed", details: err },
      { status: 500 },
    );
  }
}
