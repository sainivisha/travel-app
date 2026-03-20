"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function AddActivity(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [image,setImage] = useState("")
  const [description,setDescription] = useState("")
  const [destinations,setDestinations] = useState([])
  const [selected,setSelected] = useState<number[]>([])

  useEffect(()=>{
    fetch("http://localhost:3000/api/admin/destinations")
      .then(res=>res.json())
      .then(setDestinations)
  },[])

  useEffect(()=>{
    setSlug(name.toLowerCase().replace(/\s+/g,"-"))
  },[name])

  const toggleDestination = (id:number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i=>i!==id)
        : [...prev,id]
    )
  }

  const handleSave = async () => {

    await fetch("/api/activities",{
      method:"POST",
      body: JSON.stringify({
        name,
        slug,
        image,
        description,
        destinationIds: selected
      })
    })

    router.push("/admin/activities")
  }

  return (

    <div className="max-w-xl space-y-6">

      <h1 className="text-xl font-semibold">
        Add Activity
      </h1>

      <Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />

      <Input placeholder="Slug" value={slug} readOnly />

      <Input placeholder="Image URL" value={image} onChange={(e)=>setImage(e.target.value)} />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* 🔥 DESTINATION MULTI SELECT */}
      <div>
        <p className="font-medium mb-2">Select Destinations</p>

        <div className="grid grid-cols-2 gap-2">

          {destinations.map((d:any)=>(
            <label
              key={d.id}
              className="flex items-center gap-2 border p-2 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(d.id)}
                onChange={()=>toggleDestination(d.id)}
              />

              {d.name}
            </label>
          ))}

        </div>

      </div>

      <Button onClick={handleSave}>
        Save Activity
      </Button>

    </div>
  )
}