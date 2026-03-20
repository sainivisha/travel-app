"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

type Props = {
  name: string
  location: string
  review: string
  image: string
}

export default function TestimonialCard({
  name,
  location,
  review,
  image,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition"
    >
      {/* Stars */}
      <div className="flex gap-1 text-yellow-500">
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
      </div>

      {/* Review */}
      <p className="mt-4 text-gray-600 leading-relaxed">
        {review}
      </p>

      {/* User */}
      <div className="flex items-center gap-3 mt-6">

        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold">
            {name}
          </p>
          <p className="text-sm text-gray-500">
            {location}
          </p>
        </div>

      </div>
    </motion.div>
  )
}