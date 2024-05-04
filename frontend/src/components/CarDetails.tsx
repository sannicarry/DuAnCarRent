"use client";

import { CarProps, UploadPhoto } from "@/src/types";
import {
  createUploadPhotoPromises,
  generateCarImageUrl,
  getPhotoUrl,
} from "@/src/utils";
import Image from "next/image";
import { useStore } from "./Store";
import { useEffect, useState } from "react";

interface CarDetailsProps {
  car: CarProps;
}

// const { showRentNow, setShowRentNow } = useStore();

const CarDetails = ({ car }: CarDetailsProps) => {
  const [photos, setPhotos] = useState<UploadPhoto[]>([
    { file: new File([], ""), photoId: 0 },
  ]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (car && car?.carId !== 0) {
        try {
          const baseURL = process.env.SERVER_URL || "http://localhost:5290";

          const uploadPromises = createUploadPhotoPromises(
            car?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotos(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };
    fetchPhotos();
  }, [car?.carId]);

  return (
    <div className="rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-12 w-full h-full bg-gradient-to-br from-blue-500 to-blue-200 bg-cover bg-center rounded-lg p-4">
          <div className="flex flex-col text-white">
            <h1 className="font-semibold text-lg">
              Easy way to rent a car at a low price
            </h1>
            <div className="font-normal text-sm flex flex-col">
              <span>Providing cheap car rental services and</span>
              <span>safe and comfortable facilities.</span>
            </div>
          </div>
          <div className="h-40 flex justify-center items-center">
            <Image
              src={getPhotoUrl(photos[0]) ?? "/nophoto.png"}
              alt="car model"
              width={40}
              height={40}
              className="object-contain h-full w-full"
            />
          </div>
        </div>

        <div className="flex gap-3">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="p-4 flex justify-center items-center w-full h-24 bg-primary-blue-100 rounded-lg"
            >
              <Image
                src={getPhotoUrl(photos[index + 1]) ?? "/NoCarPhoto.webp"}
                alt="car model"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
