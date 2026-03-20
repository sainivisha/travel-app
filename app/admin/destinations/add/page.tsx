"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function AddDestination(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [parentId,setParentId] = useState("")
  const [description,setDescription] = useState("")
  const [image,setImage] = useState("")
  const [destinations,setDestinations] = useState<any[]>([])

  // fetch parent options
  useEffect(()=>{
    fetch("http://localhost:3000/api/admin/destinations")
      .then(res=>res.json())
      .then(setDestinations)
  },[])

  // auto slug generator 🔥
  useEffect(()=>{
    const s = name
      .toLowerCase()
      .replace(/\s+/g,"-")
      .replace(/[^\w-]+/g,"")

    setSlug(s)
  },[name])

  const handleSave = async () => {

    await fetch("http://localhost:3000/api/admin/destinations",{
      method:"POST",
      body: JSON.stringify({
        name,
        slug,
        description,
        image,
        parentId: parentId ? Number(parentId) : null
      })
    })

    router.push("/admin/destinations")
  }

  return (

    <div className="max-w-2xl space-y-6">

      <h1 className="text-2xl font-semibold">
        Add New Destination
      </h1>

      {/* Name */}
      <div>
        <label className="text-sm font-medium">Name</label>
        <Input
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          The name as it appears on your site.
        </p>
      </div>

      {/* Slug */}
      <div>
        <label className="text-sm font-medium">Slug</label>
        <Input value={slug} readOnly />
        <p className="text-xs text-gray-500 mt-1">
          URL-friendly version (auto generated).
        </p>
      </div>

      {/* Parent */}
      <div>
        <label className="text-sm font-medium">
          Parent Destination
        </label>

        <select
          value={parentId}
          onChange={(e)=>setParentId(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mt-1"
        >
          <option value="">None</option>

          {destinations.map((d)=>(
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}

        </select>

        <p className="text-xs text-gray-500 mt-1">
          Assign a parent to create hierarchy.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">
          Description
        </label>

        <Textarea
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <p className="text-xs text-gray-500 mt-1">
          Optional but useful for SEO.
        </p>
      </div>

      {/* Image */}
      <div>
        <label className="text-sm font-medium">Image URL</label>

        <Input
          placeholder="Paste image URL..."
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        {/* Preview 🔥 */}
        {image && (
          <img
            src={image}
            className="mt-3 rounded-lg h-40 object-cover"
          />
        )}
      </div>

      {/* Submit */}
      <Button onClick={handleSave}>
        Add New Destination
      </Button>

    </div>
  )
}