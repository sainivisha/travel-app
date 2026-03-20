import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/bookings.json")

export async function GET() {
  const data = fs.readFileSync(filePath,"utf-8")
  return NextResponse.json(JSON.parse(data))
}

export async function POST(req: Request) {

  const booking = await req.json()

  const data = fs.readFileSync(filePath,"utf-8")
  const bookings = JSON.parse(data)

  const newBooking = {
    id: Date.now(),
    ...booking,
    status: "confirmed",
    createdAt: new Date().toISOString()
  }

  bookings.push(newBooking)

  fs.writeFileSync(filePath, JSON.stringify(bookings,null,2))

  return NextResponse.json(newBooking)
}