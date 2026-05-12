"use client";

import Container from "../layout/Container";
import DestinationCard from "../cards/DestinationCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function FeaturedDestinations({ destination }: any) {
  const featuredDestinations = destination?.slice(0, 4);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-sky-50 overflow-hidden">
      {/* 💡 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_60%)] pointer-events-none" />

      <Container>
        {/* ✨ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Featured <span className="text-sky-600">Destinations</span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
            Explore breathtaking destinations and curated travel experiences
            designed to inspire your next journey.
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
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredDestinations?.map((item: any, index: number) => (
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
                  <DestinationCard {...item} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🚀 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          viewport={{ once: true }}
          className="flex justify-center mt-20"
        >
          <Link href="/destinations/all">
            <Button
              size="lg"
              className="
                px-8 py-3 rounded-full 
                bg-sky-500 text-white 
                hover:bg-sky-600 
                hover:scale-105 
                transition-all duration-300 
                shadow-[0_10px_30px_rgba(14,165,233,0.3)]
              "
            >
              Explore All Destinations
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
