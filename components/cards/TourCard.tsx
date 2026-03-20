import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Star, Clock, MapPin } from "lucide-react"

type TourProps = {
  title: string
  image: string
  price: number
  duration: string
  rating: number
  location: string
  slug: string
}

export default function TourCard({
  title,
  image,
  price,
  duration,
  rating,
  location,
  slug,
}: TourProps) {
  return (
    <Link href={`/tours/${slug}`}>

      <div className="group cursor-pointer rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

        {/* Image */}
        <div className="relative h-60 w-full overflow-hidden">

          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition duration-500"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Badge */}
          <Badge className="absolute top-4 left-4">
            Popular
          </Badge>

        </div>

        {/* Content */}
        <div className="p-6">

          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mt-2 gap-1">
            <MapPin size={16} />
            {location}
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-600">

            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              {rating}
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} />
              {duration}
            </div>

          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-6">

            <div>
              <p className="text-sm text-gray-500">
                From
              </p>

              <p className="text-xl font-semibold">
                ${price}
              </p>
            </div>

            <Button>
              Book Now
            </Button>

          </div>

        </div>

      </div>

    </Link>
  )
}