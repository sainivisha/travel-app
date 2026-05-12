import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false }, { status: 400 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Verification failed" }, { status: 500 });
  }
}
