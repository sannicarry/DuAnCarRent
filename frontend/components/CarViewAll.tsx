"use client";

import { CarProps, UploadPhoto } from "@/types";
import { generateCarImageUrl, useClickOutside } from "@/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useStore } from "./Store";

interface CarViewAllProps {
  car: CarProps;
}

const CarViewAll = ({ car }: CarViewAllProps) => {
  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    make,
    model,
    type,
    gasoline,
    capacity,
    year,
    cityMpg,
    fuel,
    transmission,
  } = car;

  const { showViewCar, setShowViewCar } = useStore();

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    if (car && car?.carId !== 0) {
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
          console.error("Error loading photos:", error);
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10">
      <div className="top-[40px] relative w-full max-w-lg max-h-[80vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
        <button
          type="button"
          className="absolute hover:bg-slate-400 top-2 right-4 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
          onClick={() => setShowViewCar({} as CarProps)}
        >
          <Image
            src="/close.svg"
            alt="cose"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>
        <div className="flex flex-col">
          <div className="flex flex-col gap-5">
            <div className="relative w-full h-40 bg-pattern bg-cover bg-center bg-blue-500 rounded-lg">
              <Image
                src={getPhotoUrl(photos[0]) ?? "/nophoto.png"}
                alt="car model"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={getPhotoUrl(photos[1]) ?? "/nophoto.png"}
                  alt="car model"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={getPhotoUrl(photos[2]) ?? "/nophoto.png"}
                  alt="car model"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={getPhotoUrl(photos[3]) ?? "/nophoto.png"}
                  alt="car model"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <h1 className="text-lg font-semibold text-black my-5">
            {make} {model}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Type
              </span>
              <span className="text-base font-medium text-slate-900">
                {type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Gasoline
              </span>
              <span className="text-base font-medium text-slate-900">
                {gasoline}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Capacity
              </span>
              <span className="text-base font-medium text-slate-900">
                {capacity}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Year
              </span>
              <span className="text-base font-medium text-slate-900">
                {year}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                CityMpg
              </span>
              <span className="text-base font-medium text-slate-900">
                {cityMpg}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Fuel
              </span>
              <span className="text-base font-medium text-slate-900">
                {fuel}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-base font-normal opacity-90 text-slate-700">
                Transmission
              </span>
              <span className="text-base font-medium text-slate-900">
                {transmission === "a" ? "Automatic" : "Manual"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarViewAll;
