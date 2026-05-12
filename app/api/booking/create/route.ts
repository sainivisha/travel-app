export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔥 Normally save in DB
    const booking = {
      id: "BOOK_" + Date.now(),
      status: "PENDING",
      ...body,
    };

    return Response.json(booking);
  } catch (err) {
    return Response.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}
