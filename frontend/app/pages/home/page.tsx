"use client";

import { CarCard, Hero, Location, Sidebar } from "@/src/components";
import { useStore } from "@/src/components/Store";
import { PhotoProps } from "@/src/types";
import { fetchBrands, fetchCars } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../../globals.css";

const page = () => {
  const [allCars, setAllCars] = useState([]);

  const {
    make,
    setMake,
    model,
    setModel,
    type,
    setType,
    gasoline,
    setGasoline,
    capacity,
    setCapacity,
    year,
    setYear,
    cityMpg,
    setCityMpg,
    fuel,
    setFuel,
    transmission,
    setTransmission,
    searchValue,
    setSearchValue,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    userRole,
    loading,
    setLoading,
    login,
    setLogin,
  } = useStore();

  const [carId, setCarId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  const [limit, setLimit] = useState(10);
  const [photos, setPhotos] = useState<PhotoProps[]>([]);

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
  }, [token]);

  return (
    <>
      <div className="content overflow-hidden relative">
        <Hero />
        <Location />
        <div className="flex justify-between px-5 py-5 sm:py-10">
          <span className="text-[90A3BF] font-medium opacity-40">
            Popular Car
          </span>
          <Link href="#">
            <span className="text-blue-400 font-semibold">View All</span>
          </Link>
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

export default page;
