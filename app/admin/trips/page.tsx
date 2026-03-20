"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setTrips(await (await fetch("http://localhost:3000/api/admin/trips")).json());
      setDestinations(await (await fetch("http://localhost:3000/api/admin/destinations")).json());
    };
    fetchData();
  }, []);

  const getDestination = (id: number) =>
    destinations.find((d: any) => d.id === id)?.name;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Trips</h1>

        <Link href="/admin/trips/add">
          <Button>Add Trip</Button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-3">Title</th>
            <th>Destination</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((t: any) => (
            <tr key={t.id} className="border-t">
              <td className="p-3">{t.title}</td>
              <td>{getDestination(t.destinationId)}</td>
              <td>${t.price}</td>

              <td className="flex gap-2 p-3">
                <Link href={`/admin/trips/${t.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    await fetch(`/api/trips/${t.id}`, {
                      method: "DELETE",
                    });
                    fetchData();
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
