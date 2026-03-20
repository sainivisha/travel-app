import EventCard from "./EventCard"
import Container from "./layout/Container"

export default function EventsSection({events}) {

  return (
    <section className="py-24 bg-gray-50">

      <Container>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-4xl font-semibold tracking-tight">
            Upcoming Events
          </h2>

          <p className="mt-4 text-gray-600">
            Experience Cambodia’s vibrant festivals, cultural celebrations,
            and unforgettable travel adventures.
          </p>

        </div>

        {/* Event Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              image={event.image}
              description={event.description}
            />
          ))}
        </div>

      </Container>

    </section>
  )
}