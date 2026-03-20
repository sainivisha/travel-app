"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  isAdmin?: boolean
}

export default function TripsList({ isAdmin }: Props){

  const [trips,setTrips] = useState([])
  const [filtered,setFiltered] = useState([])
  const [destinations,setDestinations] = useState([])
  const [selectedDest,setSelectedDest] = useState("")

 

  useEffect(()=>{ 
     const fetchData = async () => {
    const t = await fetch("/api/trips").then(r=>r.json())
    const d = await fetch("/api/destinations").then(r=>r.json())

    setTrips(t)
    setFiltered(t)
    setDestinations(d)
  }
    
    fetchData() },[])

  // 🔥 Filter by destination
  useEffect(()=>{
    if(!selectedDest){
      setFiltered(trips)
    } else {
      setFiltered(
        trips.filter((t:any)=>t.destinationId === Number(selectedDest))
      )
    }
  },[selectedDest,trips])

  const getDestination = (id:number)=>
    destinations.find((d:any)=>d.id === id)?.name

  const handleDelete = async (id:number)=>{
    await fetch(`/api/trips/${id}`,{ method:"DELETE" })
    fetchData()
  }

  return (

    <div className="space-y-6">

      {/* Filters */}
      <div className="flex gap-4">

        <select
          value={selectedDest}
          onChange={(e)=>setSelectedDest(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Destinations</option>

          {destinations.map((d:any)=>(
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

      </div>

      {/* Table */}
      <table className="w-full border">

        <thead>
          <tr>
            <th className="p-3">Title</th>
            <th>Destination</th>
            <th>Price</th>

            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>

          {filtered.map((t:any)=>(
            <tr key={t.id} className="border-t">

              <td className="p-3">{t.title}</td>

              <td>{getDestination(t.destinationId)}</td>

              <td>${t.price}</td>

              {/* 🔥 Admin Actions */}
              {isAdmin && (
                <td className="flex gap-2 p-3">

                  <Link href={`/admin/trips/${t.id}`}>
                    <Button size="sm">Edit</Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={()=>handleDelete(t.id)}
                  >
                    Delete
                  </Button>

                </td>
              )}

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}