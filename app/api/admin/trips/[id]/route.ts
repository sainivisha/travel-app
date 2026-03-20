import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/trips.json")


export async function DELETE(req: Request, { params }) {

  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))
  const param = await params;


  const updated = data.filter(
    (t:any)=>t.id !== Number(param.id)
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message:"Deleted" })
}

export async function PUT(req: Request, { params }) {

  const body = await req.json()

  const data = JSON.parse(fs.readFileSync(filePath,"utf-8"))
  const param = await params;


  const updated = data.map((t:any)=>
    t.id === Number(param.id) ? { ...t, ...body } : t
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message:"Updated" })
}