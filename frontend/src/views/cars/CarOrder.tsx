"use client";

import { useStore } from "@/components/Store";
import { CarProps, UploadPhoto } from "@/types";
import {
  calculateCarRent,
  createUploadPhotoPromises,
  getPhotoUrl,
} from "@/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CarOrder = () => {
  const {
    price,
    setPrice,
    totalPrice,
    setTotalPrice,
    quantityOfDay,
    setQuantityOfDay,
    car,
    setCar,
    photosCar,
    setPhotosCar,
  } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const isCar = localStorage.getItem("car");
      if (isCar) {
        try {
          const car = JSON.parse(isCar) as CarProps;
          setCar(car);
        } catch (error) {
          console.error("Error parsing car data:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Object.keys(car).length > 0) {
      setPrice(Number(calculateCarRent(car.cityMpg, Number(car.year))));
      const fetchPhoto = async () => {
        try {
          const baseURL = process.env.SERVER_URL;

          const uploadPromises = createUploadPhotoPromises(
            car?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotosCar(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      };

      fetchPhoto();
    }
  }, [car]);

  return (
    <>
      {Object.keys(car).length > 0 && (
        <div className="bg-white p-8 border-teal-300 rounded-md gap-5">
          <div className="grid grid-cols-8 items-center">
            <div className="col-span-4">
              <h1 className="text-slate-900 font-bold">Car</h1>
            </div>
            <div className="col-span-1">
              <h1 className="font-medium text-slate-700">Price / Day</h1>
            </div>
            <div className="col-span-1">
              <h1 className="font-medium text-slate-700">Quantity Of Day</h1>
            </div>
            <div className="col-span-2 flex justify-end items-end">
              <h1 className="font-medium text-slate-700">Total Price</h1>
            </div>
          </div>
          <div className="grid grid-cols-8 items-center">
            <div className="col-span-4">
              <div className="flex items-center gap-8">
                <Image
                  src={getPhotoUrl(photosCar[0]) ?? "/NoCarPhoto.webp"}
                  alt="Car image"
                  width={100}
                  height={100}
                ></Image>
                <div className="flex gap-4">
                  <span className="text-slate-900 font-semibold">
                    {car.make} {car.model}
                  </span>
                  <span className="text-slate-700 font-semibold">
                    Capacity:
                    {car.capacity}
                  </span>
                  <span className="text-slate-700 font-semibold">
                    Fuel: {car.fuel}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <span className="font-semibold text-slate-900">{price}</span>
            </div>
            <div className="col-span-1">
              <span className="font-semibold text-slate-900">
                {quantityOfDay}
              </span>
            </div>
            <div className="col-span-2 flex justify-end items-end">
              <span className="font-semibold text-slate-900">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarOrder;
