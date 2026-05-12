import { connectDB } from "@/lib/db/connect";
import Booking from "@/models/Booking";
import crypto from "crypto";

export async function POST(req: Request) {
  await connectDB();

  const body = await req.text(); // RAW body required
  const signature = req.headers.get("x-razorpay-signature")!;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  // ❌ Reject if invalid
  if (signature !== expectedSignature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  try {
    // ✅ Payment Success
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      await Booking.findOneAndUpdate(
        { orderId: payment.order_id },
        {
          status: "CONFIRMED",
          paymentStatus: "SUCCESS",
          paymentId: payment.id,
          provider: "razorpay",
        },
      );
    }

    // ❌ Payment Failed
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;

      await Booking.findOneAndUpdate(
        { orderId: payment.order_id },
        {
          status: "FAILED",
          paymentStatus: "FAILED",
          paymentId: payment.id,
          provider: "razorpay",
        },
      );
    }

    return Response.json({ received: true });
  } catch (err) {
    console.error(err);
    return new Response("Webhook error", { status: 500 });
  }
}
