import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/tours.json")

export async function GET() {
  try {
    const tours = JSON.parse(fs.readFileSync(filePath,"utf-8"))
    return NextResponse.json(tours)
  } catch (error) {
    return NextResponse.json({ message:"Error loading tours" },{ status:500 })
  }
}

export async function POST(req: Request) {
  try {
    const newTour = await req.json()

    const tours = JSON.parse(fs.readFileSync(filePath,"utf-8"))

    newTour.id = Date.now()

    tours.push(newTour)

    fs.writeFileSync(filePath, JSON.stringify(tours,null,2))

    return NextResponse.json(newTour)
  } catch (error) {
    return NextResponse.json({ message:"Error adding tour" },{ status:500 })
  }
}

