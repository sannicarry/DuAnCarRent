"use client";

import { CarProps, UploadPhoto } from "@/src/types";
import {
  createUploadPhotoPromises,
  fetchCarByCarId,
  getPhotoUrl,
} from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CarView = ({ car }: { car: CarProps }) => {
  const [photos, setPhotos] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (car && car?.carId !== undefined) {
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
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex flex-col gap-5">
        <div className="relative w-full h-40 bg-pattern bg-cover bg-center bg-blue-500 rounded-lg">
          <Image
            src={getPhotoUrl(photos[0]) ?? "/NoCarPhoto.webp"}
            alt="car model"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={getPhotoUrl(photos[1]) ?? "/NoCarPhoto.webp"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={getPhotoUrl(photos[2]) ?? "/NoCarPhoto.webp"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={getPhotoUrl(photos[3]) ?? "/NoCarPhoto.webp"}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
      <h1 className="text-lg font-semibold text-black my-5">
        {car.make} {car.model}
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Type
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Gasoline
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.gasoline}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Capacity
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.capacity}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Year
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.year}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            CityMpg
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.cityMpg}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Fuel
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.fuel}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base font-normal opacity-90 text-slate-700">
            Transmission
          </span>
          <span className="text-base font-medium text-slate-900">
            {car.transmission === "a" ? "Automatic" : "Manual"}
          </span>
        </div>
      </div>
      <Link href="/pages/car" className="flex justify-end">
        <button className="px-6 py-2 text-base font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Back
        </button>
      </Link>
    </div>
  );
};

export default CarView;
