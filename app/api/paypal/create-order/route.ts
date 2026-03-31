import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const PAYPAL_CLIENT_ID = "AestH6X5-jYR1IJPNYanCsWwV5U0qxXzz2WvcX_PUMtVcc5g42z5XzUygsZGALc1zfgi_KjVrme0-eAO";
  const PAYPAL_SECRET = "EK3ESd2Pi0G2Q00jY7-29m6s4QXp4aQDrsrEzSjHK2IUCiZm7hkzRp1-CbArbz4YWd1uPxdysekOVRTy";

  // 🔐 Get access token
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`
  ).toString("base64");

  const tokenRes = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    }
  );

  const tokenData = await tokenRes.json();

  // 💳 Create order
  const orderRes = await fetch(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: body.total,
            },
          },
        ],
        application_context: {
          return_url: "http://localhost:3000/booking/success",
          cancel_url: "http://localhost:3000/booking/cancel",
        },
      }),
    }
  );

  const orderData = await orderRes.json();

  // 🔥 Get approval URL
  const approvalUrl = orderData.links.find(
    (link: any) => link.rel === "approve"
  )?.href;

  return NextResponse.json({ approvalUrl });
}