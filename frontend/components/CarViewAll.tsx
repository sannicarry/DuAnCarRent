"use client";

import { CarProps } from "@/types";
import { generateCarImageUrl, useClickOutside } from "@/utils";
import Image from "next/image";
import { useRef } from "react";
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

  useClickOutside(formRef, () => setShowViewCar(false));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-10">
      <div
        className="overflow-y-auto flex flex-col justify-center px-6 py-12 lg:px-8 absolute h-[85%] w-[40%] top-[90px] bg-white rounded-md border-2 border-gray-300"
        ref={formRef}
      >
        <button
          type="button"
          className="absolute hover:bg-slate-400 top-2 right-4 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
          onClick={() => setShowViewCar(false)}
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
          <div className="flex flex-col gap-5 mt-10">
            <div className="relative mt-[50px] w-full h-40 bg-pattern bg-cover bg-center bg-blue-500 rounded-lg">
              <Image
                src={generateCarImageUrl(car)}
                alt="car model"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={generateCarImageUrl(car, "29")}
                  alt="car model"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={generateCarImageUrl(car, "33")}
                  alt="car model"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                <Image
                  src={generateCarImageUrl(car, "13")}
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
