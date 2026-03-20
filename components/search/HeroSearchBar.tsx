"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeroSearchBar() {

  const router = useRouter()

  const [destination, setDestination] = useState("")
  const [date, setDate] = useState("")
  const [guests, setGuests] = useState(1)

  const handleSearch = () => {

    const params = new URLSearchParams()

    if (destination) params.append("destination", destination.toLowerCase())
    if (date) params.append("date", date)
    params.append("guests", guests.toString())

    router.push(`/tours?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col md:flex-row gap-4 items-center">

      {/* Destination */}
      <Input
        className="text-black"
        placeholder="Where do you want to go?"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      {/* Date */}
      <div className="flex items-center gap-2">

        <CalendarIcon size={18} className="text-gray-500" />

        <Input
          className="text-black"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

      </div>

      {/* Guests */}
      <div className="flex items-center gap-2">

        <Users size={18} className="text-gray-500" />

        <Input
          className="text-black"
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />

      </div>

      {/* Search Button */}
      <Button onClick={handleSearch}>
        Search
      </Button>

    </div>
  )
}