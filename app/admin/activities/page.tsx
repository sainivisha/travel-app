"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ActivitiesPage() {
  const [data, setData] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/admin/activities");
    setData(await res.json());

    const d = await fetch("/api/destinations");
    setDestinations(await d.json());
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/activities");
      setData(await res.json());

      const d = await fetch("/api/destinations");
      setDestinations(await d.json());
    };

    fetchData();
  }, []);

  const getDestinationNames = (ids: number[]) =>
    ids
      .map((id) => destinations.find((d: any) => d.id === id)?.name)
      .join(", ");

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Activities</h1>

        <Link href="/admin/activities/add">
          <Button>Add Activity</Button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-3">Name</th>
            <th>Destinations</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a: any) => (
            <tr key={a.id} className="border-t">
              <td className="p-3">{a.name}</td>

              <td>{getDestinationNames(a.destinationIds || [])}</td>

              <td className="flex gap-2 p-3">
                <Link href={`/admin/activities/${a.id}`}>
                  <Button size="sm">Edit</Button>
                </Link>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={async () => {
                    await fetch(`/api/activities/${a.id}`, {
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
