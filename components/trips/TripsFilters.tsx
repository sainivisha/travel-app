"use client"

import { Input } from "@/components/ui/input"

export default function TripsFilters({
  filters,
  setFilters,
  destinations,
  tripTypes,
  activities
}: any){

  const toggle = (id:number, key:string) => {

    setFilters((prev:any)=>{

      const arr = prev[key]

      return {
        ...prev,
        [key]: arr.includes(id)
          ? arr.filter((i:number)=>i!==id)
          : [...arr,id]
      }

    })

  }

  return (

    <div className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm sticky top-24 h-fit">

      {/* Search */}
      <div>
        <p className="font-medium mb-2">Search</p>

        <Input
          placeholder="Search tours..."
          value={filters.search}
          onChange={(e)=>
            setFilters({...filters,search:e.target.value})
          }
        />
      </div>

      {/* Destination */}
      <div>
        <p className="font-medium mb-2">Destination</p>

        <select
          value={filters.destination}
          onChange={(e)=>
            setFilters({...filters,destination:e.target.value})
          }
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">All</option>

          {destinations.map((d:any)=>(
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Trip Types */}
      <div>
        <p className="font-medium mb-2">Trip Type</p>

        <div className="space-y-2">

          {tripTypes.map((t:any)=>(
            <label key={t.id} className="flex items-center gap-2 text-sm">

              <input
                type="checkbox"
                checked={filters.tripTypes.includes(t.id)}
                onChange={()=>toggle(t.id,"tripTypes")}
              />

              {t.name}

            </label>
          ))}

        </div>
      </div>

      {/* Activities */}
      <div>
        <p className="font-medium mb-2">Activities</p>

        <div className="space-y-2">

          {activities.map((a:any)=>(
            <label key={a.id} className="flex items-center gap-2 text-sm">

              <input
                type="checkbox"
                checked={filters.activities.includes(a.id)}
                onChange={()=>toggle(a.id,"activities")}
              />

              {a.name}

            </label>
          ))}

        </div>
      </div>

    </div>
  )
}