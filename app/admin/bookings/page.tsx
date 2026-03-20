"use client";

import { useEffect, useState } from "react";

export default function AdminBookingsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    await fetch(`http://localhost:3000/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    // refresh list
    fetch("http://localhost:3000/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  };

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Bookings</h1>

      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Tour</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Guests</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b: any) => (
              <tr key={b.id} className="border-t">
                <td className="p-4">Guest</td>
                <td className="p-4">{b.tourTitle}</td>
                <td className="p-4">{b.date}</td>
                <td className="p-4">{b.guests}</td>
                <td className="p-4">${b.price}</td>

                <td className="p-4">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
