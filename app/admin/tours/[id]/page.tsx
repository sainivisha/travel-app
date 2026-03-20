"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditTourPage() {

  const { id } = useParams()
  const router = useRouter()

  const [title,setTitle] = useState("")
  const [location,setLocation] = useState("")
  const [price,setPrice] = useState("")
  const [duration,setDuration] = useState("")
  const [rating,setRating] = useState("")
  const [image,setImage] = useState("")

  // fetch tour data
  useEffect(()=>{

    fetch("http://localhost:3000/api/admin/tours")
      .then(res=>res.json())
      .then(data=>{

        const tour = data.find((t:any)=>t.id === Number(id))

        if(tour){
          setTitle(tour.title)
          setLocation(tour.location)
          setPrice(tour.price)
          setDuration(tour.duration)
          setRating(tour.rating)
          setImage(tour.image)
        }

      })

  },[id])

  const generateSlug = (text:string) =>
    text.toLowerCase().replace(/\s+/g,"-")

  const handleUpdate = async () => {

    const updatedTour = {
      title,
      location,
      price: Number(price),
      duration,
      rating: Number(rating),
      slug: generateSlug(title),
      image
    }

    const res = await fetch(`/api/tours/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(updatedTour)
    })

    if(!res.ok){
      alert("Update failed")
      return
    }

    alert("Tour updated")

    router.push("/admin/tours")
  }

  return (

    <div className="max-w-lg space-y-4">

      <h1 className="text-2xl font-semibold">
        Edit Tour
      </h1>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />

      <Input
        placeholder="Location"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
      />

      <Input
        placeholder="Price"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
      />

      <Input
        placeholder="Duration"
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}
      />

      <Input
        placeholder="Rating"
        value={rating}
        onChange={(e)=>setRating(e.target.value)}
      />

      <Input
        placeholder="Image URL"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      {/* Preview */}
      {image && (
        <img
          src={image}
          className="h-40 w-full object-cover rounded"
        />
      )}

      <Button
        className="w-full"
        onClick={handleUpdate}
      >
        Update Tour
      </Button>

    </div>

  )
}