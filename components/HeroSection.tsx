import Image from "next/image";
import Container from "./layout/Container";
import HeroSearchBar from "./search/HeroSearchBar";

export default function HeroSection() {
  return (
    <section className="relative h-[720px] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9"
        alt="Cambodia travel"
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay (IMPORTANT) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <Container>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          {/* Heading */}
          <h1
            className="
            text-4xl md:text-7xl 
            font-semibold 
            tracking-tight 
            leading-[1.1]
          "
          >
            Discover & book things
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Discover breathtaking temples, vibrant culture, and unforgettable
            adventures.
          </p>

          {/* Search */}
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-2xl">
              <HeroSearchBar />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
