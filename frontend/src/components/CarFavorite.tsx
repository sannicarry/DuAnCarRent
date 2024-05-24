import { CarProps, UploadPhoto } from "@/types";
import {
  calculateCarRent,
  createUploadPhotoPromises,
  getPhotoUrl,
} from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomButton } from ".";
import { useStore } from "./Store";

interface HistoryCarFavoriteProps {
  car: CarProps;
}

const CarFavorite = ({ car }: HistoryCarFavoriteProps) => {
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

  const { setShowPanel } = useStore();

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
  return (
    <div className="p-4 border-b border-b-gray-300">
      <div className="grid grid-cols-5 bg-white rounded-lg">
        <div className="col-span-1 flex items-center">
          <Image
            src={getPhotoUrl(photos[0]) ?? "/NoCarPhoto.webp"}
            alt="car model"
            width={120}
            height={120}
            className="object-contain"
          ></Image>
        </div>
        <div className="col-span-3 flex items-center ml-10">
          <div className="flex flex-col">
            <h1 className="font-bold text-base capitalize truncate">
              {make} {model}
            </h1>
            <div>
              <div className="text-xl font-semibold">
                <span>$</span>
                <span>{carRent}</span>
                <span>/</span>
                <span className="text-[14px] opacity-40 font-medium ml-1">
                  day
                </span>
              </div>
              <div className="line-through">
                <span>$</span>
                <span>{carRent + 2}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-end p-2">
          <Link
            href={{
              pathname: "/pages/rentNow",
              query: { car: JSON.stringify(car) },
            }}
            onClick={() => {
              setShowPanel("");
            }}
            className=""
          >
            <button className="text-white h-10 w-24 text-[14px] rounded-md max-xl:bg-primary-blue bg-primary-blue">
              Rent Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarFavorite;
