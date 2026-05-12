"use client";

import Image from "next/image";
import { useState } from "react";

interface TripGalleryProps {
  images: string[];
  caption?: string;
}

export default function TripGallery({ images, caption }: TripGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [openGallery, setOpenGallery] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[420px]">
        {/* Main image */}
        <div
          className="col-span-2 row-span-2 relative cursor-pointer"
          onClick={() => setOpenGallery(true)}
        >
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover rounded-xl hover:scale-105 transition duration-500"
          />
        </div>

        {/* Side thumbnails */}
        {images.slice(1, 5).map((img, i) => (
          <div
            key={i}
            className="relative cursor-pointer"
            onClick={() => {
              setActiveImage(i + 1);
              setOpenGallery(true);
            }}
          >
            <Image src={img} alt="" fill className="object-cover rounded-xl" />
          </div>
        ))}

        <button
          onClick={() => setOpenGallery(true)}
          className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow text-sm"
        >
          View all photos
        </button>
      </div>

      {caption && (
        <p className="text-xs text-gray-500 mt-2">{caption}</p>
      )}

      {/* Lightbox */}
      {openGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setOpenGallery(false)}
            className="absolute top-6 right-6 text-white text-2xl"
          >
            ✕
          </button>
          <button
            onClick={() =>
              setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))
            }
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>
          <Image
            src={images[activeImage]}
            alt=""
            width={1000}
            height={700}
            className="rounded-lg"
          />
          <button
            onClick={() =>
              setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))
            }
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>
          <div className="absolute bottom-6 text-white text-sm">
            {activeImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
