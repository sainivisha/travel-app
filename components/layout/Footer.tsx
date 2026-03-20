import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white">
            Travelling Cambodia
          </h2>

          <p className="mt-4 text-sm">
            Discover Cambodia’s breathtaking landscapes,
            vibrant culture, and unforgettable travel experiences.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Explore
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link href="/destinations">Destinations</Link></li>
            <li><Link href="/tours">Tours</Link></li>
            <li><Link href="/activities">Activities</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <Facebook size={20} />
            <Instagram size={20} />
            <Twitter size={20} />
          </div>
        </div>

      </div>

      <div className="text-center text-sm border-t border-gray-700 py-6">
        © 2026 Travelling Cambodia. All rights reserved.
      </div>

    </footer>
  )
}