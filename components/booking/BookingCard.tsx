"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Users } from "lucide-react"
import { useState } from "react"

export default function BookingCard() {

  const [date, setDate] = useState<Date | undefined>()

  return (
    <div className="sticky top-24 border rounded-2xl p-6 shadow-sm bg-white">

      {/* Price */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          From
        </p>

        <p className="text-3xl font-semibold">
          $120
        </p>
      </div>

      {/* Date Picker */}
      <div className="mb-4">

        <label className="text-sm font-medium">
          Select Date
        </label>

        <Popover>

          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full mt-2 justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toDateString() : "Choose date"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </PopoverContent>

        </Popover>

      </div>

      {/* Guests */}
      <div className="mb-6">

        <label className="text-sm font-medium">
          Guests
        </label>

        <div className="flex items-center gap-2 mt-2">

          <Users size={18} />

          <Input
            type="number"
            defaultValue={1}
            min={1}
          />

        </div>

      </div>

      {/* Button */}
      <Button className="w-full">
        Book Now
      </Button>

    </div>
  )
}