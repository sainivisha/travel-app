export default function ExploreSection() {
  return (
    <section
      className="h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34')",
      }}
    >
      <div className="bg-black/50 p-10 rounded-lg max-w-2xl">

        <h2 className="text-4xl font-bold text-red-500">
          Explore The World
        </h2>

        <p className="mt-4 text-lg text-gray-200">
          Discover breathtaking destinations, immerse yourself in diverse cultures,
          and embark on unforgettable adventures around the globe.
        </p>

        <button className="mt-6 bg-blue-600 px-6 py-3 rounded hover:bg-blue-700">
          Learn More
        </button>

      </div>
    </section>
  );
}