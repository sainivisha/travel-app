export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    // 🔥 STEP 1: Fetch booking
    const bookingRes = await fetch(
      `https://travelengine-booking-iapi-152348523675.us-central1.run.app/v1/bookings/${bookingId}`,
      {
        headers: {
          Authorization: "SSSSS",
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
      },
    );

    const booking = await bookingRes.json();

    console.log("📦 booking response:", booking);

    // 🔥 STEP 2: Build payment payload
    const payload = {
      providerType: "PAYPAL",
      methodType: "WALLET",
      captureMode: "MANUAL",

      businessReferenceType: "BOOKING",
      businessReferenceId: booking.id,
      businessReferenceCode: booking.bookingReference,

      requestedAmount: booking.pricing.grandTotal,
      currency: booking.pricing.currency,

      payer: {
        partyId: booking.participants?.[0]?.email,
        fullName: booking.participants?.[0]?.fullName,
        email: booking.participants?.[0]?.email,
      },

      instrument: {
        displayName: "PayPal",
      },

      metadata: {
        source: "web-booking",
      },
    };

    // 🔥 STEP 3: Call payment API
    const res = await fetch(
      "https://common-payment-iapi-152348523675.us-central1.run.app/v1/payments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "SSSSS",
          "x-user-id": "tarunrohila@gmail.com",
          "x-filter-active": "true",
          "Correlation-Id": "test-travel",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();

    return Response.json(data, { status: res.status });
  } catch (err: any) {
    console.error("🔥 FULL ERROR:", err);

    return Response.json(
      { error: err?.message || "Payment failed", details: err },
      { status: 500 },
    );
  }
}
