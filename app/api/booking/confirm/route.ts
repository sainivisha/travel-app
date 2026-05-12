export async function POST(req: Request) {
  try {
    const { bookingId, paymentId } = await req.json();

    // 🔥 Update DB here
    const updatedBooking = {
      id: bookingId,
      status: "CONFIRMED",
      paymentId,
    };

    return Response.json(updatedBooking);
  } catch (err) {
    return Response.json(
      { error: "Failed to confirm booking" },
      { status: 500 },
    );
  }
}
