import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {

    const destinations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(),"data/featuredDestination.json"),
        "utf-8"
      )
    )

    const tours = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(),"data/tours.json"),
        "utf-8"
      )
    )

    const events = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(),"data/events.json"),
        "utf-8"
      )
    )

    const testimonials = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(),"data/testimonials.json"),
        "utf-8"
      )
    )

    const blogs = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(),"data/blogs.json"),
        "utf-8"
      )
    )

    return NextResponse.json({
      featuredDestinations: destinations,
      tours,
      events,
      testimonials,
      blogs
    })

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { message: "Error loading home data" },
      { status: 500 }
    )
  }
}