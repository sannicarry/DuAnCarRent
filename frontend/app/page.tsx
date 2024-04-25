"use client";

import { CarCard, Hero, Location, Sidebar } from "@/components";
import { useStore } from "@/components/Store";
import { PhotoProps } from "@/types";
import { fetchBrands, fetchCars } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([]);

  const router = useRouter();

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
    success,
    loading,
    setLoading,
  } = useStore();

  const [carId, setCarId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  const [limit, setLimit] = useState(10);
  const [photos, setPhotos] = useState<PhotoProps[]>([]);

  const getCars = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [success]);

  useEffect(() => {
    if (userRole === "Admin") {
      router.push("/Dashboard");
    }
  }, [userRole]);

  return (
    <main
      className={`${
        userRole == "Admin" ? "" : "bg-[#F6F7F9]"
      } overflow-hidden content`}
    >
      {/* {userRole == "Admin" ? (
        <Sidebar />
      ) : (
        <>
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
                {loading && (
                  <div className="mt-16 w-full flex-center">
                    <Image
                      src="/loader.svg"
                      alt="loader"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                )}
              </section>
            ) : (
              <div className="home__error-container">
                <h2 className="text-black text-xl font-bold">
                  Oops, no results
                </h2>
              </div>
            )}
          </div>
        </>
      )} */}
    </main>
  );
}
