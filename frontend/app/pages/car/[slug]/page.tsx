"use client";

import { useStore } from "@/src/components/Store";
import CarView from "@/src/views/cars/CarView";
import { fetchCarByCarId } from "@/src/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const [carId, setCarId] = useState(0);

  const { car, setCar, token } = useStore();

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
  }, [carId, token]);

  return (
    <>
      <CarView car={car} />
    </>
  );
};

export default page;
