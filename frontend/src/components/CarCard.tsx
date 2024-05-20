"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, memo } from "react";
import { CustomButton, Payment } from ".";
import { CarProps, UploadPhoto } from "@/types";
import {
  calculateCarRent,
  createUploadPhotoPromises,
  fetchCreateCarFavorite,
  fetchDeleteCarFavorite,
  getPhotoUrl,
} from "@/utils";
import { useStore } from "./Store";

interface CarCardProps {
  car: CarProps;
}

const CarCard = memo(({ car }: CarCardProps) => {
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

  const { user, token, success, setSuccess, searchValue } = useStore();

  const carRent = calculateCarRent(cityMpg, Number(year));
  const [photos, setPhotos] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (car && car?.carId !== undefined) {
        try {
          const baseURL = process.env.SERVER_URL;

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

    fetchPhoto();
  }, [car]);

  const handleCarFavorite = async (carId: number) => {
    const checkExistCar = user.carFavorites.find(
      (x) => x.car.carId === car.carId
    );

    if (checkExistCar) {
      const fetchDelete = await fetchDeleteCarFavorite(
        user.userId,
        car.carId,
        token
      );
    } else {
      const fetchCreate = await fetchCreateCarFavorite(
        user.userId,
        car.carId,
        token
      );
    }
    setSuccess(!success);
  };

  const containsSearchValue = (value: string) => {
    return (
      searchValue != "" &&
      value.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col bg-white p-5 rounded-xl">
      <div className="grid grid-cols-5 items-center">
        <h1 className="col-span-4 font-bold text-lg capitalize h-14 truncate">
          {containsSearchValue(make) ? (
            <span className="bg-blue-500">{make} </span>
          ) : (
            <>{make} </>
          )}
          {containsSearchValue(model) ? (
            <span className="bg-blue-500">{model}</span>
          ) : (
            <>{model}</>
          )}
        </h1>
        <button
          onClick={() => {
            handleCarFavorite(car.carId);
          }}
          className="h-full col-span-1 flex justify-end items-start"
        >
          <Image
            src={
              user.carFavorites?.find((x) => x.car.carId === car.carId)
                ? "/LikeFill.svg"
                : "/LikeNoFill.svg"
            }
            alt="like"
            width={20}
            height={20}
            className="mt-1"
          ></Image>
        </button>
      </div>
      <span className="text-[90A3BF] opacity-60 font-medium capitalize">
        {containsSearchValue(type) ? (
          <span className="bg-blue-500">{type}</span>
        ) : (
          <>{type}</>
        )}
      </span>
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={getPhotoUrl(photos[0]) ?? "/NoCarPhoto.webp"}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex">
          <Image
            src="/Gas.svg"
            alt="gas"
            width={20}
            height={20}
            className="mr-1"
          ></Image>
          <span className="text-[14px]">{gasoline}</span>
        </div>
        <div className="flex">
          <Image
            src="/Tranmision.svg"
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
            src="/ManyPeople.svg"
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
        <Link
          href={{
            pathname: "/pages/rentNow",
            query: { car: JSON.stringify(car) },
          }}
        >
          <CustomButton
            title="Rent Now"
            containerStyles="text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
            btnType="button"
          />
        </Link>
      </div>
    </div>
  );
});

export default memo(CarCard);
