import FadeIn from "../animations/FadeIn";
import Container from "../layout/Container";
import TourCard from "../cards/TourCard";

export default function TourPackages({tours}) {

  return (
    <section className="py-24 bg-gray-50">
      <Container>
       <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-semibold tracking-tight">
            Popular Tours
          </h2>

          <p className="mt-4 text-gray-600">
            Discover our most popular travel experiences across Cambodia.
          </p>
        </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours?.map((tour, index) => (
            <FadeIn key={index}>
              <TourCard {...tour} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
