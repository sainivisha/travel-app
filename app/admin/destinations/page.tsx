"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DestinationsPage(){

  const [data,setData] = useState([])


  useEffect(()=>{
      const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/admin/destinations")
    const json = await res.json()
    setData(json)
  }

    fetchData()
  },[])

  const handleDelete = async (id:number) => {
    await fetch(`http://localhost:3000/api/admin/destinations/${id}`,{
      method:"DELETE"
    })
    // fetchData()
  }

  return (

    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">
          Destinations
        </h1>

        <Link href="/admin/destinations/add">
          <Button>Add Destination</Button>
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {data.map((d:any)=>{

            const parent = data.find((p:any)=>p.id === d.parentId)

            return (
              <tr key={d.id} className="border-t">

                <td className="p-3">
                  <img
                    src={d.image}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>

                <td>{d.name}</td>

                <td>
                  {parent ? parent?.name : "—"}
                </td>

                <td className="flex gap-2 p-3">

                  <Link href={`/admin/destinations/${d.id}`}>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={()=>handleDelete(d.id)}
                  >
                    Delete
                  </Button>

                </td>

              </tr>
            )
          })}

        </tbody>

      </table>

    </div>
  )
}