"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import UserMenu from "../navbar/UserMenu"
import Image from "next/image"

export default function Navbar() {

  const links = [
    { name: "Destinations", href: "/destinations" },
    { name: "Tours", href: "/trips" },
    { name: "Activities", href: "/activities" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link href="/" className="text-xl font-bold text-red-500">
           <Image
            src="https://travellingcambodia.com/wp-content/uploads/2026/03/logo_main.png"
            alt="Travelling Cambodia"
            width={180}
            height={50}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>

       
        <div className="flex items-center gap-6">

  <UserMenu />

</div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>

          <SheetContent side="right">

            <div className="flex flex-col gap-6 mt-10">

              {links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}

              <Button>
                Book Now
              </Button>

            </div>

          </SheetContent>
        </Sheet>

      </div>

    </header>
  )
}