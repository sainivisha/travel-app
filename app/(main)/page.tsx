import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import TourPackages from "@/components/sections/TourPackages";
import ExploreSection from "@/components/ExploreSection";
import EventsSection from "@/components/EventsSection";
import Testimonials from "@/components/sections/Testimonials";
import BlogSection from "@/components/sections/BlogSection";

async function getHomeData() {
  const res = await fetch("http://localhost:3000/api/home", {
    cache: "no-store",
  });

  console.log(res.json);

  if (!res.ok) {
    throw new Error("Failed to fetch home data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getHomeData();
  return (
    <main>
      <HeroSection />

      <FeaturedDestinations destination={data?.featuredDestinations} />

      <TourPackages tours={data?.tours} />

      <ExploreSection />

      <EventsSection events={data?.events} />

      <Testimonials testimonials={data?.testimonials} />

      <BlogSection blogs={data?.blogs} />
    </main>
  );
}
