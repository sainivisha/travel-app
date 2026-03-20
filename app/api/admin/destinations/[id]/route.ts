import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/destinations.json")

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  const destinations = JSON.parse(
    fs.readFileSync(filePath,"utf-8")
  )

  const param = await params;



  const updated = destinations.filter(
    
      (d:any)=> d.id !== Number(param.id)
    
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message: "Deleted" })
}

// PUT (Edit)
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json()

  const destinations = JSON.parse(
    fs.readFileSync(filePath,"utf-8")
  )
  const param = await params;


  const updated = destinations.map((d:any)=>
    d.id === Number(param.id) ? { ...d, ...body } : d
  )

  fs.writeFileSync(filePath, JSON.stringify(updated,null,2))

  return NextResponse.json({ message: "Updated" })
}