import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TripRowCard({ trip }: any){

  return (

    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4 flex gap-6 border">

      {/* Image */}
      <div className="relative w-64 h-44 rounded-xl overflow-hidden">

        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
        />

      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">

        <div>

          <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition">
            {trip.title}
          </h2>

          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">

            <span className="flex items-center gap-1">
              <MapPin size={14}/> {trip.location}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={14}/> {trip.duration}
            </span>

          </div>

          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {trip.description}
          </p>

        </div>

      </div>

      {/* Right Panel */}
      <div className="flex flex-col justify-between items-end">

        <div className="text-right">

          <p className="text-2xl font-semibold">
            ${trip.price}
          </p>

          <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
            <Star size={14}/>
            {trip.rating}
          </div>

        </div>

        <Link href={`/trips/${trip.slug}`}>
          <Button>
            Explore
          </Button>
        </Link>

      </div>

    </div>

  )
}