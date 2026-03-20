import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/destinations.json")

// GET
export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))
  return NextResponse.json(data)
}

// POST
export async function POST(req: Request) {

  const body = await req.json()

  const destinations = JSON.parse(
    fs.readFileSync(filePath,"utf-8")
  )

  const newDestination = {
    id: Date.now(),
    ...body
  }

  destinations.push(newDestination)

  fs.writeFileSync(filePath, JSON.stringify(destinations,null,2))

  return NextResponse.json(newDestination)
}