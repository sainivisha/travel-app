"use client";

import Container from "../layout/Container";
import TourCard from "../cards/TourCard";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TourPackages({ tours }: any) {
  const trips = tours?.slice(5, 8);

  const [filteredTrips, setFilteredTrips] = useState([]);

  const ease = [0.22, 1, 0.36, 1];

  useEffect(() => {
    async function getDestinationData() {
      try {
        const res = await fetch("/api/admin/destinations", {
          cache: "no-store",
        });

        const data = await res.json();

        const parentIds = data.filter((dest: any) =>
          trips?.some((t: any) => t.destinationId === dest.id),
        );

        const destinationOfTrip = data.filter((dest: any) =>
          parentIds.some((p: any) => p.parentId === dest.id),
        );

        setFilteredTrips(destinationOfTrip);
      } catch (error) {
        console.error(error);
      }
    }

    getDestinationData();
  }, [tours]);

  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_60%)] pointer-events-none" />

      <Container>
        {/* ✨ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Popular <span className="text-sky-400">Tours</span>
          </h2>

          <p className="mt-6 text-lg text-gray-300">
            Discover our most loved journeys, curated for unforgettable travel
            experiences.
          </p>
        </motion.div>

        {/* 🧊 GRID */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
        >
          {trips?.map((tour: any, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease },
                },
              }}
              className="group"
            >
              <div className="relative">
                {/* glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-sky-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                <div className="relative">
                  <TourCard
                    {...tour}
                    destinationSlug={filteredTrips[index]?.slug}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
