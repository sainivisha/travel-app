import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/trips.json")

export async function GET() {
  return NextResponse.json(
    JSON.parse(fs.readFileSync(filePath,"utf-8"))
  )
}

export async function POST(req: Request) {

  const body = await req.json()

  const trips = JSON.parse(fs.readFileSync(filePath,"utf-8"))

  const newTrip = {
    id: Date.now(),
    ...body,
    createdAt: new Date().toISOString()
  }

  trips.push(newTrip)

  fs.writeFileSync(filePath, JSON.stringify(trips,null,2))

  return NextResponse.json(newTrip)
}