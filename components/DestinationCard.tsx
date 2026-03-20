type Props = {
  title: string
  image: string
}

export default function DestinationCard({ title, image }: Props) {
  return (
    <div className="relative rounded-xl overflow-hidden group cursor-pointer">

      <img
        src={image}
        alt={title}
        className="h-72 w-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">
          {title}
        </h3>
      </div>

    </div>
  )
}