export async function POST(
  req: Request,
  { params }: { params: { paymentId: string } },
) {
  try {
    const { paymentId } = params;

    console.log("💰 Capturing payment:", paymentId);

    const res = await fetch(
      `https://common-payment-iapi-152348523675.us-central1.run.app/v1/payments/${paymentId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "SSSSS",
          "x-user-id": "tarunrohila@gmail.com",
          "Correlation-Id": "paypal-capture",
        },
      },
    );

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(text, { status: res.status });
    }

    if (!res.ok) {
      console.error("❌ Capture error:", data);
      return Response.json(data, { status: res.status });
    }

    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error("🔥 Capture error:", err);
    return Response.json({ error: "Capture failed" }, { status: 500 });
  }
}
