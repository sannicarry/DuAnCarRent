"use client";

import { useStore } from "@/components/Store";
import CarView from "@/views/cars/CarView";
import { fetchCarByCarId } from "@/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const [carId, setCarId] = useState(0);

  const { car, setCar, token, success } = useStore();

  useEffect(() => {
    const carId = searchParams.get("carId");
    if (carId) {
      setCarId(parseInt(carId));
    }
  }, [searchParams]);

  useEffect(() => {
    const car = async () => {
      const result = await fetchCarByCarId(carId, token);
      if (result) {
        setCar(result);
      }
    };
    car();
  }, [carId, token, success]);

  console.log("car slug = ", car);

  return (
    <>
      <CarView car={car} />
    </>
  );
};

export default page;
