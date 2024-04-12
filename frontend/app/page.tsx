"use client";

import { CarCard, Hero, Location, Sidebar } from "@/components";
import { useStore } from "@/components/Store";
import { CarImageProps } from "@/types";
import { fetchBrands, fetchCars } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const itemsPerPage: number = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [carId, setCarId] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [gasoline, setGasoline] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [year, setYear] = useState("");
  const [cityMpg, setCityMpg] = useState(0);
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [carImages, setCarImages] = useState<CarImageProps[]>([]);

  const [limit, setLimit] = useState(10);
  const { userRole } = useStore();

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
          carImages,
        },
        searchValue,
        currentPage,
        itemsPerPage
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
  }, []);

  return (
    <main
      className={`${
        userRole == "Admin" ? "" : "bg-[#F6F7F9]"
      } overflow-hidden sm:px-16 px-6 py-6 sm:py-10`}
    >
      {userRole == "Admin" ? (
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
                  {allCars?.map((car) => (
                    <CarCard car={car} />
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
      )}
    </main>
  );
}
