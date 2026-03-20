import Image from "next/image"
import Link from "next/link"

type Props = {
  title: string
  image: string
  category: string
}

export default function BlogCard({ title, image, category }: Props) {
  return (
    <Link
      href="/blog"
      className="group block rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />

      </div>

      {/* Content */}
      <div className="p-6">

        <p className="text-sm text-gray-500">
          {category}
        </p>

        <h3 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-primary">
          {title}
        </h3>

      </div>

    </Link>
  )
}