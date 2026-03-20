import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/bookings.json")

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const { status } = await req.json()

  const data = fs.readFileSync(filePath,"utf-8")
  const bookings = JSON.parse(data)

  const index = bookings.findIndex(
    (b:any)=>b.id === Number(params.id)
  )

  if(index === -1){
    return NextResponse.json({ message:"Not found" },{ status:404 })
  }

  bookings[index].status = status

  fs.writeFileSync(filePath, JSON.stringify(bookings,null,2))

  return NextResponse.json(bookings[index])
}