"use client";

import { CarCard, Hero, Sidebar } from "@/components";
import { useStore } from "@/components/Store";
import { PhotoProps } from "@/types";
import { fetchCarCount, fetchCars } from "@/utils";
import LocationOrder from "@/views/locations/LocationOrder";
import { useEffect, useState, memo } from "react";

const page = () => {
  const [allCars, setAllCars] = useState([]);

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
    searchValue,
    currentPage,
    token,
    user,
    setUser,
    bank,
  } = useStore();

  const [carId, setCarId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  const [limit, setLimit] = useState(10);
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const getCars = async () => {
    try {
      const result = await fetchCars(
        {
          carId,
          make,
          model,
          type,
          gasoline,
          year,
          capacity,
          cityMpg,
          fuel,
          transmission,
          photos,
          brandId,
        },
        currentPage,
        itemsPerPage,
        searchValue
      );
      setAllCars(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCars();
  }, [token, itemsPerPage, searchValue]);

  const handleViewAll = async () => {
    const countCar = await fetchCarCount(searchValue, token);
    setItemsPerPage(countCar);
  };

  return (
    <>
      <div className="content overflow-hidden relative">
        <LocationOrder />
        <div className="flex justify-between px-5 py-5 sm:py-10">
          <span className="text-[90A3BF] font-medium opacity-40">
            Popular Car
          </span>
          <button
            className="text-blue-400 font-semibold hover:opacity-80 p-2"
            onClick={() => handleViewAll()}
          >
            View All
          </button>
        </div>
        <div>
          {allCars.length > 0 ? (
            <section>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
                {allCars?.map((car, index) => (
                  <CarCard key={index} car={car} />
                ))}
              </div>
            </section>
          ) : (
            <>
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">
                  Oops, no results
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(page);
