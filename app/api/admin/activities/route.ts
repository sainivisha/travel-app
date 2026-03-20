import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/activities.json")

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))
  return NextResponse.json(data)
}

export async function POST(req: Request) {

  const body = await req.json()

  const activities = JSON.parse(fs.readFileSync(filePath,"utf-8"))

  const newItem = {
    id: Date.now(),
    ...body,
    createdAt: new Date().toISOString()
  }

  activities.push(newItem)

  fs.writeFileSync(filePath, JSON.stringify(activities,null,2))

  return NextResponse.json(newItem)
}