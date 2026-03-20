import Container from "../layout/Container"
import TestimonialCard from "../cards/TestimonialCard"

export default function Testimonials({testimonials}) {

  return (
    <section className="py-24 bg-gray-50">

      <Container>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">

          <h2 className="text-4xl font-semibold tracking-tight">
            What Travelers Say
          </h2>

          <p className="mt-4 text-gray-600">
            Hear from travelers who explored Cambodia with us.
          </p>

        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials?.map((item, index) => (
            <TestimonialCard key={index} {...item} />
          ))}

        </div>

      </Container>

    </section>
  )
}