import DestinationGrid from "@/components/DestinationGrid"
import Container from "@/components/layout/Container"

export default function DestinationsPage() {
  return (
    <main className="py-24">

      <Container>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h1 className="text-4xl font-semibold tracking-tight">
            Explore Destinations
          </h1>

          <p className="mt-4 text-gray-600">
            Discover Cambodia’s most beautiful destinations,
            from ancient temples to tropical islands.
          </p>

        </div>

        {/* Destination Grid */}
        <DestinationGrid />

      </Container>

    </main>
  )
}