"use client";

import { useStore } from "@/components/Store";
import { CarProps, UploadPhoto } from "@/types";
import { generateCarImageUrl, useClickOutside } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const formRef = useRef<HTMLDivElement | null>(null);

  const { car, setCar, setCurrentPageAdmin } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("Car");
  }, []);

  const searchParams = useSearchParams();

  useEffect(() => {
    const car = searchParams.get("car");
    if (car) {
      const parsedCar = JSON.parse(car);
      setCar(parsedCar);
    }
  }, [searchParams]);

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    if (car && car?.carId !== undefined) {
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
    <div className="flex flex-col gap-4 px-6 py-4">
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
      <Link href="/Car" className="flex justify-end">
        <button className="text-base font-semibold py-2 px-8 text-white bg-blue-500 rounded-md hover:bg-blue-700">
          Back
        </button>
      </Link>
    </div>
  );
};

export default page;
