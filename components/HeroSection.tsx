import Image from "next/image"
import Container from "./layout/Container"
import HeroSearchBar from "./search/HeroSearchBar"

export default function HeroSection() {
  return (
    <section className="relative h-[650px] flex items-center">

      <Image
        src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9"
        alt="Cambodia travel"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <Container>
        <div className="relative text-center text-white max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Unveiling Cambodia’s Wonders
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Discover breathtaking temples, vibrant culture,
            and unforgettable adventures.
          </p>

          <div className="mt-10">
            <HeroSearchBar />
          </div>

        </div>
      </Container>

    </section>
  )
}