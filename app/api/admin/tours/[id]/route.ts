import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/tours.json")
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const tours = JSON.parse(fs.readFileSync(filePath,"utf-8"))

    const updatedTours = tours.filter(
      (t:any) => t.id !== Number(params.id)
    )

    fs.writeFileSync(filePath, JSON.stringify(updatedTours,null,2))

    return NextResponse.json({ message:"Deleted successfully" })

  } catch (error) {
    return NextResponse.json({ message:"Delete failed" },{ status:500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const updatedData = await req.json()

    const tours = JSON.parse(fs.readFileSync(filePath,"utf-8"))

    const index = tours.findIndex(
      (t:any) => t.id === Number(params.id)
    )

    if(index === -1){
      return NextResponse.json({ message:"Not found" },{ status:404 })
    }

    tours[index] = {
      ...tours[index],
      ...updatedData
    }

    fs.writeFileSync(filePath, JSON.stringify(tours,null,2))

    return NextResponse.json(tours[index])

  } catch (error) {
    return NextResponse.json({ message:"Update failed" },{ status:500 })
  }
}