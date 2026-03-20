"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";


type Tour = {
  id: number
  title: string
  location: string
  price: number
  duration: string
  rating: number
  image: string
}

export default function AdminToursPage() {
  const router = useRouter();


  const [tours,setTours] = useState<Tour[]>([])

  // fetch tours
  

  useEffect(()=>{
    const fetchTours = async () => {
    const res = await fetch("http://localhost:3000/api/admin/tours")
    const data = await res.json()
    setTours(data)
  }
    fetchTours()
  },[])

  // delete tour
  const handleDelete = async (id:number) => {

    const confirmDelete = confirm("Delete this tour?")
    if(!confirmDelete) return

    await fetch(`http://localhost:3000/api/admin/tours/${id}`,{
      method:"DELETE"
    })

  }

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-semibold">
        Manage Tours
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-left">

            <tr>
              <th className="p-4">Image</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {tours.map((tour)=>(
              <tr key={tour.id} className="border-t">

                <td className="p-4">
                  <img
                    src={tour.image}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>

                <td>{tour.title}</td>

                <td>{tour.location}</td>

                <td>${tour.price}</td>

                <td>{tour.rating}</td>

                <td className="p-4">
  <div className="flex items-center gap-2 h-full">

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/tours/${tour.id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={()=>handleDelete(tour.id)}
                  >
                    Delete
                  </Button>
                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}