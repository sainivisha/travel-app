import DestinationCard from "./DestinationCard"

export default function DestinationGrid() {

  const destinations = [
    {
      title: "Angkor Wat",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
    },
    {
      title: "Phnom Penh",
      image:
        "https://images.unsplash.com/photo-1587815078133-70c7c9d9f0f6"
    },
    {
      title: "Siem Reap",
      image:
        "https://images.unsplash.com/photo-1589308078053-8c6a7a58a8f5"
    },
    {
      title: "Koh Rong",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    }
  ]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {destinations.map((item, index) => (
        <DestinationCard
          key={index}
          title={item.title}
          image={item.image}
        />
      ))}
    </div>
  )
}