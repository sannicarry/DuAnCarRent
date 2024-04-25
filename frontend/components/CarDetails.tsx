"use client";

import { CarProps, UploadPhoto } from "@/types";
import { generateCarImageUrl } from "@/utils";
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
    if (car && car?.carId !== 0) {
      // Tạo một mảng rỗng để lưu trữ các promise
      const filePromises: Promise<UploadPhoto>[] = [];

      car?.photos.forEach((photo) => {
        const baseURL = process.env.SERVER_URL || "http://localhost:5290";
        const photoUrl = `${baseURL}/${photo.photoUrl}`;

        filePromises.push(
          new Promise<UploadPhoto>(async (resolve, reject) => {
            try {
              const response = await fetch(photoUrl);
              const blob = await response.blob();
              const UploadPhoto: UploadPhoto = {
                file: new File([blob], `image${Date.now()}.jpg`, {
                  type: blob.type,
                }),
                photoId: photo.photoId,
              };
              resolve(UploadPhoto);
            } catch (error) {
              reject(error);
            }
          })
        );
      });

      Promise.all(filePromises)
        .then((photos) => {
          setPhotos(photos);
        })
        .catch((error) => {
          console.error("Error loading images:", error);
        });
    }
  }, [car?.carId]);

  const getPhotoUrl = (photo: UploadPhoto) => {
    if (photo && photo.file) {
      return URL.createObjectURL(photo.file);
    }
    return null;
  };

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
          {photos.map((photo, index) => (
            <>
              {index > 0 && (
                <div
                  key={index}
                  className="p-4 flex justify-center items-center w-full h-24 bg-primary-blue-100 rounded-lg"
                >
                  <Image
                    src={getPhotoUrl(photo) ?? "/nophoto.png"}
                    alt="car model"
                    width={20}
                    height={20}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
