"use client";

import { CarProps } from "@/types";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CustomButton, Payment } from ".";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
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

  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(cityMpg, Number(year));

  const handleRentNow = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col bg-white p-5 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg capitalize">
          {make} {model}
        </h1>
        <Image
          src="Like2.svg"
          alt="like"
          width={20}
          height={20}
          className=""
        ></Image>
      </div>
      <span className="text-[90A3BF] opacity-40 font-medium capitalize">
        {type}
      </span>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={generateCarImageUrl(car)}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <Image
            src="Gas.svg"
            alt="gas"
            width={20}
            height={20}
            className="mr-1"
          ></Image>
          <span className="text-[14px]">{gasoline}</span>
        </div>
        <div className="flex">
          <Image
            src="Tranmision.svg"
            alt="Tranmision"
            width={20}
            height={20}
            className="mr-1"
          ></Image>
          <span className="text-[14px]">
            {transmission === "a" ? "Automatic" : "Manual"}
          </span>
        </div>
        <div className="flex">
          <Image
            src="ManyPeople.svg"
            alt="ManyPeople"
            width={20}
            height={20}
            className="mr-1"
          ></Image>
          <span className="text-[14px]">{capacity} People</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-end">
          <div>
            <div className="text-xl font-semibold">
              <span>$</span>
              <span>{carRent}</span>
              <span>/</span>
              <span className="text-[14px] opacity-40 font-medium ml-1">
                day
              </span>
            </div>
            {/* Có sale thì thêm */}
            <div className="line-through">
              <span>$</span>
              <span>{carRent + 2}</span>
            </div>
          </div>
        </div>
        <CustomButton
          title="Rent Now"
          containerStyles="text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
          handleClick={handleRentNow}
          btnType="button"
        />
      </div>
      <Payment isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
