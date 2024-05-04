"use client";

import "../../globals.css";
import { CarProps, PhotoProps, UserProps } from "@/src/types";
import { features } from "@/src/constants";
import { calculateCarRent, fetchUser } from "@/src/utils";
import { CarDetails, Comment, CustomButton, Location } from "@/src/components";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/src/components/Store";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const page = () => {
  const router = useRouter();

  const {
    locationFrom,
    setLocationFrom,
    locationTo,
    setLocationTo,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    error,
    setError,
    success,
    setSuccess,
    token,
    user,
    status,
    setStatus,
    login,
    setLogin,
    checkSelectedLocation,
    setHrefAfterLogin,
  } = useStore();

  const [car, setCar] = useState<CarProps | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const carParam = searchParams.get("car");
    if (carParam) {
      const parsedCar = JSON.parse(carParam) as CarProps;
      setCar(parsedCar);
    }
  }, [searchParams]);

  if (!car) {
    return null;
  }
  const { make, model, type, gasoline, capacity, year, cityMpg, transmission } =
    car;

  const carRent = calculateCarRent(cityMpg, Number(year));

  const keyValueFeatures = [
    {
      key: features.typeCar,
      value: type,
    },
    {
      key: features.capacity,
      value: capacity,
    },
    {
      key: features.steering,
      value: transmission === "a" ? "Automatic" : "Manual",
    },
    {
      key: features.gasoline,
      value: gasoline,
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    if (!checkSelectedLocation) {
      alert("Please select location, date and time ...");
    } else {
      event.preventDefault();

      try {
        const convertDateFrom = new Date(dateFrom);
        const formattedDateFrom = format(convertDateFrom, "yyyy-MM-dd");
        const convertDateTo = new Date(dateTo);
        const formattedDateTo = format(convertDateTo, "yyyy-MM-dd");
        const response = await fetch(`http://localhost:5290/api/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user.userId,
            carId: car.carId,
            locationFrom,
            dateFrom: formattedDateFrom,
            timeFrom,
            locationTo,
            dateTo: formattedDateTo,
            timeTo,
            totalPrice: carRent,
            status,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setSuccess(true);
          cleanLocation();
          router.push("/pages/home", { scroll: false });
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const cleanLocation = () => {
    setLocationFrom("");
    setLocationTo("");
    setDateFrom("");
    setDateTo("");
    setTimeFrom("");
    setTimeTo("");
  };

  return (
    <>
      <div className="content bg-[#F6F7F9] gap-5 flex flex-col justify-center items-center">
        <Location />
        <div
          className="w-full relative transform rounded-2xl bg-gray-600 p-6 
        text-left shadow-xl transition-all flex flex-col gap-5"
        >
          <CarDetails car={car} />
          <form onSubmit={handleSubmit} className="" method="POST">
            <div className="flex flex-col gap-4 bg-white border rounded-lg p-2 sm:p-5">
              <h1 className="font-bold text-lg capitalize">
                {make} {model}
              </h1>
              <div className="flex flex-col gap-2 ">
                <span className="text-[3D5278] font-normal opacity-[0.8]">
                  NISMO has become the embodiment of Nissan's outstanding
                  performance, inspired by the most unforgiving proving ground,
                  the "race track".
                </span>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div key={index}>
                        <Image
                          src="/rating.svg"
                          alt="rating"
                          height={20}
                          width={20}
                        ></Image>
                      </div>
                    ))}
                  </div>
                  <span className="text-[3D5278] font-normal opacity-[0.8]">{`100+ Reviews`}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex sm:justify-between gap-5 sm:gap-20">
                  {[0, 1].map((index) => (
                    <div key={index} className="flex w-full justify-between">
                      <span className="text-[90A3BF] font-medium opacity-50">
                        {keyValueFeatures[index].key}
                      </span>
                      <h1 className="text-[3D5278] font-medium capitalize">
                        {keyValueFeatures[index].value}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="flex sm:justify-between gap-5 sm:gap-20">
                  {[2, 3].map((index) => (
                    <div key={index} className="flex w-full justify-between">
                      <span className="text-[90A3BF] font-medium opacity-50">
                        {keyValueFeatures[index].key}
                      </span>
                      <h1 className="text-[3D5278] font-medium capitalize">
                        {keyValueFeatures[index].value}
                      </h1>
                    </div>
                  ))}
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
                    <div className="line-through">
                      <span>$</span>
                      <span>{carRent + 2}</span>
                    </div>
                  </div>
                </div>
                {login ? (
                  <>
                    <CustomButton
                      title="Submit"
                      containerStyles="text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
                      btnType="submit"
                    />
                  </>
                ) : (
                  <>
                    <Link
                      href="/pages/login"
                      onClick={() => {
                        setHrefAfterLogin(window.location.href);
                      }}
                    >
                      <CustomButton
                        title="Submit"
                        containerStyles="text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
            {/* <Comment /> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
