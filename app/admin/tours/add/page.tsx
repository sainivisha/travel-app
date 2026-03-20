"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddTourPage() {

  const [title,setTitle] = useState("")
  const [location,setLocation] = useState("")
  const [price,setPrice] = useState("")
  const [duration,setDuration] = useState("")
  const [rating,setRating] = useState("")
  const [image,setImage] = useState("")

  // slug generator
  const generateSlug = (text:string) =>
    text.toLowerCase().replace(/\s+/g,"-")

  const handleSave = async () => {

    const newTour = {
      title,
      location,
      price: Number(price),
      duration,
      rating: Number(rating),
      slug: generateSlug(title),
      image
    }

    const res = await fetch("http://localhost:3000/api/admin/tours",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newTour)
    })

    if(!res.ok){
      alert("Failed to add tour")
      return
    }

    alert("Tour added successfully")
  }

  return (

    <div className="max-w-lg space-y-4">

      <h1 className="text-2xl font-semibold">
        Add New Tour
      </h1>

      <Input
        placeholder="Tour Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <Input
        placeholder="Location (e.g. siem-reap)"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
      />

      <Input
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <Input
        placeholder="Duration (e.g. 1 Day)"
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}
      />

      <Input
        placeholder="Rating (e.g. 4.8)"
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
      />

      <Input
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      <Button
        className="w-full"
        onClick={handleSave}
      >
        Save Tour
      </Button>

    </div>

  )
}