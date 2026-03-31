// "use client";

// import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// import { useState } from "react";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// export default function BookingPage() {
//   const params = useSearchParams();

//   const date = params.get("date");
//   const guests = Number(params.get("guests") || 1);

//   // 🔥 TEMP DATA (replace later with API)
//   const trip = {
//     title: "Phnom Penh City Tour",
//     location: "Phnom Penh, Cambodia",
//     price: 49,
//     image: "https://images.unsplash.com/photo-1544739313-6fadf88b13ef",
//     duration: "4 Hours",
//   };

//   const total = trip.price * guests;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handlePay = async () => {
//     const res = await fetch("/api/paypal/create-order", {
//       method: "POST",
//       body: JSON.stringify({ total }),
//     });

//     const data = await res.json();

//     // 🔥 redirect to PayPal
//     window.location.href = data.approvalUrl;
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-3 gap-10">
//       <div className="md:col-span-1">
//         <div className="sticky top-24 space-y-6">
//           {/* IMAGE */}
//           <div className="rounded-2xl overflow-hidden">
//             <Image
//               src={trip.image}
//               alt=""
//               width={500}
//               height={300}
//               className="w-full h-48 object-cover"
//             />
//           </div>

//           {/* DETAILS */}
//           <div className="border rounded-2xl p-5 space-y-4 bg-white shadow-sm">
//             <h2 className="text-lg font-semibold">{trip.title}</h2>

//             <p className="text-sm text-gray-500">{trip.location}</p>

//             <div className="flex justify-between text-sm">
//               <span>Date</span>
//               <span className="font-medium">{date}</span>
//             </div>

//             <div className="flex justify-between text-sm">
//               <span>Guests</span>
//               <span className="font-medium">{guests}</span>
//             </div>

//             <div className="flex justify-between text-sm">
//               <span>Duration</span>
//               <span className="font-medium">{trip.duration}</span>
//             </div>

//             <div className="border-t pt-4 flex justify-between font-semibold">
//               <span>Total</span>
//               <span>${total}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= RIGHT: FORM ================= */}
//       <div className="md:col-span-2">
//         <div className="border rounded-3xl p-8 shadow-sm space-y-8 bg-white">
//           {/* HEADER */}
//           <div>
//             <h1 className="text-2xl font-semibold">Complete Your Booking</h1>
//             <p className="text-gray-500 text-sm mt-1">
//               Fill in your details to confirm your trip
//             </p>
//           </div>

//           {/* FORM */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <input
//               placeholder="Full Name"
//               className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />

//             <input
//               placeholder="Email Address"
//               className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               placeholder="Phone Number"
//               className="border rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>

//           {/* NOTES */}
//           <textarea
//             placeholder="Special requests (optional)"
//             className="w-full border rounded-xl px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-black"
//           />

//           <div className="space-y-5">
//             {/* PAYMENT BOX */}
//             <div className="border rounded-2xl p-5 bg-gray-50 space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span>
//                   ${trip.price} × {guests} guests
//                 </span>
//                 <span>${total}</span>
//               </div>

//               <div className="border-t pt-3 flex justify-between font-semibold">
//                 <span>Total</span>
//                 <span>${total}</span>
//               </div>
//             </div>

//             {/* VALIDATION WARNING */}
//             {(!name || !email || !phone) && (
//               <p className="text-sm text-red-500">
//                 Please fill all details before payment
//               </p>
//             )}

//             {/* PAYPAL */}
//             <div className="border rounded-2xl p-4 bg-white">
//               <PayPalButtons
//                 disabled={!name || !email || !phone}
//                 style={{
//                   layout: "vertical",
//                   shape: "rect",
//                   label: "paypal",
//                 }}
//                 createOrder={(data, actions) => {
//                   return actions.order.create({
//                     purchase_units: [
//                       {
//                         description: `Trip Booking - ${trip.title}`,
//                         amount: {
//                           value: total.toString(),
//                         },
//                       },
//                     ],
//                   });
//                 }}
//                 onApprove={async (data, actions) => {
//                   setLoading(true);

//                   const details = await actions.order!.capture();

//                   console.log("Payment Success:", details);

//                   // 🔥 Simulate saving booking (replace with API later)
//                   const booking = {
//                     name,
//                     email,
//                     phone,
//                     trip: trip.title,
//                     date,
//                     guests,
//                     total,
//                     paymentId: details.id,
//                   };

//                   console.log("Booking Saved:", booking);

//                   // redirect
//                   window.location.href = "/booking/success";
//                 }}
//                 onError={(err) => {
//                   console.error("Payment Error:", err);
//                   alert("Payment failed. Try again.");
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function BookingPage() {
  const params = useSearchParams();
  const routeParams = useParams();

  const date = params.get("date");
  const guests = Number(params.get("guests") || 1);
  const slug = routeParams.slug as string;
  const [trip, setTrip] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getTrip(slug: string) {
      const res = await fetch("http://localhost:3000/api/admin/trips", {
        cache: "no-store",
      });

      const trips = await res.json();
      console.log(slug);

      const trip = trips.find((t: any) => t.slug === slug);

      console.log(trip);
      setTrip(trip);
    }
    getTrip(slug);
  }, []);

  const total = trip?.price * guests;

  const handlePay = async () => {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      body: JSON.stringify({ total }),
    });

    const data = await res.json();

    // 🔥 redirect to PayPal
    window.location.href = data.approvalUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-3 gap-10">
      <div className="md:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* IMAGE */}
          {trip?.image ? (
            <div className="rounded-2xl overflow-hidden shadow">
              <Image
                src={trip.image}
                alt=""
                width={500}
                height={300}
                className="w-full h-56 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ) : null}

          {/* DETAILS */}
          <div className="border rounded-2xl p-5 space-y-4 bg-white shadow-md">
            <h2 className="text-lg font-semibold">{trip.title}</h2>

            <p className="text-sm text-gray-500">{trip.location}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">
                  {format(new Date(date), "MMMM d, yyyy")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Guests</span>
                <span className="font-medium">{guests}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-medium">{trip.duration}</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT: FORM ================= */}
      <div className="md:col-span-2">
        <div className="border rounded-3xl p-8 shadow-sm space-y-8 bg-white">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-semibold">Complete Your Booking</h1>
            <p className="text-gray-500 text-sm mt-1">
              Fill in your details to confirm your trip
            </p>
          </div>

          {/* FORM */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              placeholder="Full Name"
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email Address"
              className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              className="border rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* NOTES */}
          <textarea
            placeholder="Special requests (optional)"
            className="w-full border rounded-xl px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <div className="space-y-5">
            {/* PAYMENT BOX */}
            <div className="border rounded-2xl p-5 bg-gray-50 space-y-3">
              <div className="flex justify-between text-sm">
                <span>
                  ${trip.price} × {guests} guests
                </span>
                <span>${total}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* VALIDATION WARNING */}
            {(!name || !email || !phone) && (
              <p className="text-sm text-red-500">
                Please fill all details before payment
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>🔒 Secure Checkout</span>
              <span>💳 All major cards accepted</span>
              <span>🌍 International payments</span>
            </div>

            {/* PAYPAL */}
            <div className="border rounded-2xl p-4 bg-white">
              <button
                onClick={handlePay}
                className="w-full h-12 bg-black text-white rounded-xl"
              >
                Pay Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
