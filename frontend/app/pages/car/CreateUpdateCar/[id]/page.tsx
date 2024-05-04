"use client";

import { useStore } from "@/src/components/Store";
import CreateUpdateCar from "@/src/views/cars/CreateUpdateCar";
import ViewCar from "@/src/views/cars/CarView";
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

  const carModel = {
    carId: 0,
    make: "",
    model: "",
    type: "",
    gasoline: 0,
    capacity: 0,
    year: "",
    cityMpg: 0,
    fuel: "",
    transmission: "",
    photos: [],
    brandId: 0,
  };

  useEffect(() => {
    if (carId != 0) {
      const car = async () => {
        const result = await fetchCarByCarId(carId, token);
        if (result) {
          setCar(result);
        }
      };
      car();
    } else {
      setCar(carModel);
    }
  }, [carId, token]);

  return (
    <>
      <CreateUpdateCar car={car} />
    </>
  );
};

export default page;
