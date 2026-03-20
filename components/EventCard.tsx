import Image from "next/image"
import { Button } from "@/components/ui/button"

type EventProps = {
  title: string
  image: string
  description: string
}

export default function EventCard({ title, image, description }: EventProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

      </div>

      {/* Content */}
      <div className="p-6 text-center">

        <h3 className="text-xl font-semibold tracking-tight">
          {title}
        </h3>

        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        <Button className="mt-5">
          Learn More
        </Button>

      </div>

    </div>
  )
}