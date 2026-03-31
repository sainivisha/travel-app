import Container from "../layout/Container";
import DestinationCard from "../cards/DestinationCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FeaturedDestinations({ destination }) {
  const featuredDestinations = destination.splice(0, 4);
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-6xl font-semibold tracking-tight">
            Featured Destinations
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            Explore Cambodia’s most breathtaking destinations and unforgettable
            experiences.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDestinations?.map((item, index) => (
            <DestinationCard key={index} {...item} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <Link href="/destinations/all">
            <Button size="lg">View All Destinations</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
