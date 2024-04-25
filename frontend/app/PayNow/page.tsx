"use client";

import { CarProps } from "@/types";
import { calculateCarRent } from "@/utils";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

const page = () => {
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

  return <div className="content">page</div>;
};

export default page;
