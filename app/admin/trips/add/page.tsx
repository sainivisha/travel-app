"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AddTrip(){

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [slug,setSlug] = useState("")
  const [price,setPrice] = useState("")
  const [duration,setDuration] = useState("")
  const [image,setImage] = useState("")
  const [description,setDescription] = useState("")

  const [destinations,setDestinations] = useState([])
  const [activities,setActivities] = useState([])
  const [tripTypes,setTripTypes] = useState([])

  const [destinationId,setDestinationId] = useState("")
  const [selectedActivities,setSelectedActivities] = useState<number[]>([])
  const [selectedTypes,setSelectedTypes] = useState<number[]>([])

  useEffect(()=>{
    fetch("http://localhost:3000/api/admin/destinations").then(res=>res.json()).then(setDestinations)
    fetch("http://localhost:3000/api/admin/activities").then(res=>res.json()).then(setActivities)
    fetch("http://localhost:3000/api/admin/tripTypes").then(res=>res.json()).then(setTripTypes)
  },[])

  useEffect(()=>{
    setSlug(title.toLowerCase().replace(/\s+/g,"-"))
  },[title])

  const toggle = (id:number, set:any) => {
    set((prev:any)=>
      prev.includes(id) ? prev.filter((i:number)=>i!==id) : [...prev,id]
    )
  }

  const handleSave = async () => {

    await fetch("http://localhost:3000/api/admin/trips",{
      method:"POST",
      body: JSON.stringify({
        title,
        slug,
        price: Number(price),
        duration,
        image,
        description,
        destinationId: Number(destinationId),
        activityIds: selectedActivities,
        tripTypeIds: selectedTypes
      })
    })

    router.push("/admin/trips")
  }

  return (

    <div className="max-w-2xl space-y-6">

      <h1 className="text-xl font-semibold">Add Trip</h1>

      <Input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <Input placeholder="Slug" value={slug} readOnly />
      <Input placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
      <Input placeholder="Duration" value={duration} onChange={(e)=>setDuration(e.target.value)} />
      <Input placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)} />

      {/* Destination */}
      <select
        value={destinationId}
        onChange={(e)=>setDestinationId(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Select Destination</option>

        {destinations.map((d:any)=>(
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      {/* Activities */}
      <div>
        <p className="font-medium">Activities</p>

        {activities.map((a:any)=>(
          <label key={a.id} className="block">
            <input
              type="checkbox"
              checked={selectedActivities.includes(a.id)}
              onChange={()=>toggle(a.id,setSelectedActivities)}
            />
            {a.name}
          </label>
        ))}
      </div>

      {/* Trip Types */}
      <div>
        <p className="font-medium">Trip Types</p>

        {tripTypes.map((t:any)=>(
          <label key={t.id} className="block">
            <input
              type="checkbox"
              checked={selectedTypes.includes(t.id)}
              onChange={()=>toggle(t.id,setSelectedTypes)}
            />
            {t.name}
          </label>
        ))}
      </div>

      <Button onClick={handleSave}>
        Save Trip
      </Button>

    </div>
  )
}