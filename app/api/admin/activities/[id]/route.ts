import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/activities.json")

export async function DELETE(req: Request, { params }) {

  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))

  const updated = data.filter(
    (a:any)=>a.id !== Number(params.id)
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message:"Deleted" })
}

export async function PUT(req: Request, { params }) {

  const body = await req.json()

  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))

  const updated = data.map((a:any)=>
    a.id === Number(params.id) ? { ...a, ...body } : a
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message:"Updated" })
}