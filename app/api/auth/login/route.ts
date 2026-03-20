import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data/users.json")

export async function POST(req: Request) {

  const { email, password } = await req.json()

  const data = fs.readFileSync(filePath, "utf-8")
  const users = JSON.parse(data)

  const user = users.find(
    (u:any) => u.email === email && u.password === password
  )

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    )
  }

  return NextResponse.json(user)
}