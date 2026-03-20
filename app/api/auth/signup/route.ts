import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), "data/users.json")

export async function POST(req: Request) {

  const newUser = await req.json()

  const data = fs.readFileSync(filePath, "utf-8")
  const users = JSON.parse(data)

  newUser.id = Date.now()
  newUser.role = "user"

  users.push(newUser)

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2))

  return NextResponse.json(newUser)

}