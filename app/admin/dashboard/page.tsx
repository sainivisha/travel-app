"use client"

import {
  Users,
  Map,
  Calendar,
  DollarSign,
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

export default function AdminDashboard() {

  const stats = [
    { title: "Total Tours", value: 24, icon: Map },
    { title: "Bookings", value: 128, icon: Calendar },
    { title: "Users", value: 52, icon: Users },
    { title: "Revenue", value: "$12,430", icon: DollarSign },
  ]

  const data = [
    { month: "Jan", bookings: 20 },
    { month: "Feb", bookings: 45 },
    { month: "Mar", bookings: 30 },
    { month: "Apr", bookings: 60 },
  ]

  return (

    <div className="space-y-8">

      <h1 className="text-3xl font-semibold">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, index) => {

          const Icon = item.icon

          return (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
            >

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h3 className="text-2xl font-semibold">
                  {item.value}
                </h3>

              </div>

              <Icon className="text-gray-400" size={28} />

            </div>

          )

        })}

      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Bookings Overview
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={data}>

            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">
          Recent Bookings
        </h2>

        <table className="w-full text-sm">

          <thead className="border-b">

            <tr>
              <th className="py-2 text-left">User</th>
              <th className="text-left">Tour</th>
              <th className="text-left">Date</th>
              <th className="text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            <tr className="border-b">
              <td className="py-2">John Doe</td>
              <td>Angkor Wat Sunrise</td>
              <td>12 Apr</td>
              <td>Confirmed</td>
            </tr>

            <tr>
              <td className="py-2">Anna Smith</td>
              <td>Koh Rong Escape</td>
              <td>15 Apr</td>
              <td>Pending</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  )
}