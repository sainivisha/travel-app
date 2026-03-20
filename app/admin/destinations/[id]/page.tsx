"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditDestination(){

  const { id } = useParams()
  const router = useRouter()

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [image,setImage] = useState("")
  const [description,setDescription] = useState("")
  const [parentId,setParentId] = useState("")
  const [all,setAll] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3000/api/admin/destinations")
      .then(res=>res.json())
      .then(data=>{
        setAll(data)

        const item = data.find((d:any)=>d.id === Number(id))

        if(item){
          setName(item.name)
          setSlug(item.slug)
          setImage(item.image)
          setDescription(item.description)
          setParentId(item.parentId || "")
        }
      })
  },[id])

  const handleUpdate = async () => {

    await fetch(`http://localhost:3000/api/admin/destinations/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name,
        slug,
        image,
        description,
        parentId: parentId ? Number(parentId) : null
      })
    })

    router.push("/admin/destinations")
  }

  return (

    <div className="max-w-xl space-y-4">

      <h1 className="text-xl font-semibold">
        Edit Destination
      </h1>

      <Input value={name} onChange={(e)=>setName(e.target.value)} />
      <Input value={slug} readOnly />

      <Input value={image} onChange={(e)=>setImage(e.target.value)} />

      <textarea
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={parentId}
        onChange={(e)=>setParentId(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="">None</option>

        {all.map((d:any)=>(
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <Button onClick={handleUpdate}>
        Update
      </Button>

    </div>
  )
}