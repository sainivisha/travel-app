import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(),"data/tripTypes.json")

export async function GET() {
  return NextResponse.json(
    JSON.parse(fs.readFileSync(filePath,"utf-8"))
  )
}