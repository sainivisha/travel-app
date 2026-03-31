"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
};

export default function DestinationCard({ name, image }: Props) {
  return (
    <Link href={`/destinations/${name.toLowerCase()}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group"
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
          href={`destinatons/${name}`}
        />

        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
