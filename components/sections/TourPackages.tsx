"use client";
import FadeIn from "../animations/FadeIn";
import Container from "../layout/Container";
import TourCard from "../cards/TourCard";
import { useEffect, useState } from "react";

export default function TourPackages({ tours }) {
  const trips = tours.slice(5, 8);

  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    async function getDestinationData() {
      try {
        const res = await fetch("/api/admin/destinations", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch home data");
        }

        const data = await res.json();

        const parentIds = data.filter((dest) =>
          trips.some((t) => t.destinationId === dest.id),
        );
        const destinationOfTrip = data.filter((dest) =>
          parentIds.some((p) => p.parentId === dest.id),
        );

        setFilteredTrips(destinationOfTrip);
      } catch (error) {
        console.error(error);
      }
    }

    getDestinationData();
  }, [tours]);

  return (
    <section className="py-24 bg-gray-50">
      <Container>
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-semibold tracking-tight">
              Popular Tours
            </h2>

            <p className="mt-4 text-gray-600">
              Discover our most popular travel experiences across Cambodia.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(trips.length ? trips : trips).map((tour, index) => (
            <FadeIn key={index}>
              <TourCard
                {...tour}
                destinationSlug={filteredTrips[index]?.slug}
              />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
