import Container from "../layout/Container"
import DestinationCard from "../cards/DestinationCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FeaturedDestinations({destination}) {

  return (
    <section className="py-24 bg-white">

      <Container>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-4xl font-semibold tracking-tight">
            Featured Destinations
          </h2>

          <p className="mt-4 text-gray-600">
            Explore Cambodia’s most breathtaking destinations and unforgettable experiences.
          </p>

        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {destination?.map((item, index) => (
            <DestinationCard key={index} {...item} />
          ))}

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">

          <Link href="/destinations">
            <Button size="lg">
              View All Destinations
            </Button>
          </Link>

        </div>

      </Container>

    </section>
  )
}