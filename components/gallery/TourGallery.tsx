"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

type Props = {
  images: string[]
}

export default function TourGallery({ images }: Props) {

  const [open, setOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const openImage = (index: number) => {
    setActiveImage(index)
    setOpen(true)
  }

  return (
    <>
      {/* Gallery Layout */}
      <div className="grid gap-4">

        {/* Main Image */}
        <div
          className="relative h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => openImage(0)}
        >
          <Image
            src={images[0]}
            alt="Tour image"
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {images.slice(1).map((img, index) => (

            <div
              key={index}
              className="relative h-32 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => openImage(index + 1)}
            >

              <Image
                src={img}
                alt="Tour gallery"
                fill
                className="object-cover hover:scale-105 transition"
              />

            </div>

          ))}

        </div>

      </div>

      {/* Lightbox */}
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogContent className="max-w-5xl p-0 overflow-hidden">

          <div className="relative h-[600px] w-full">

            <Image
              src={images[activeImage]}
              alt="Tour image"
              fill
              className="object-cover"
            />

          </div>

        </DialogContent>

      </Dialog>
    </>
  )
}