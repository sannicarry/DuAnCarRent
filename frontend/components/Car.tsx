"use client";

import { useEffect, useState } from "react";
import {
  fetchBrandCount,
  fetchBrands,
  fetchCarCount,
  fetchCars,
  fetchDeleteBrand,
  fetchDeleteCar,
} from "@/utils";
import { BrandProps, CarImageProps, CarProps } from "@/types";
import { CarViewAll, CustomButton, FormAddBrand, FormAddCar } from ".";
import { useStore } from "./Store";
import Image from "next/image";

const Car = () => {
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

  const [idOptions, setIdOptions] = useState(0);

  const {
    showAddNewCar,
    setShowAddNewCar,
    showViewCar,
    setShowViewCar,
    success,
    setSuccess,
    showOptions,
    setShowOptions,
  } = useStore();

  const getCars = async (searchValue?: string, currentPage?: number) => {
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars(searchValue, currentPage);
  }, [success, searchValue, currentPage]);

  const getCountCars = async () => {
    try {
      const count = await fetchCarCount();
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountCars();
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, totalPages]);

  const [carModel, setCarModel] = useState<CarProps>({
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
    carImages: [],
  });

  const handleEdit = (car: CarProps) => {
    setShowAddNewCar(true);
    setCarModel({ ...car });
  };
  const handleDelete = (id: number) => {
    fetchDeleteCar(id);
    setSuccess();
  };

  const isActivePage = (pageIndex: number) => {
    return pageIndex === currentPage;
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between w-[60%]">
          <h1 className="text-left text-lg font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            CAR
          </h1>
          <div className="flex w-[80%] h-[40px] bg-white border-2 focus-within:border-blue-500 rounded-lg sm:rounded-3xl px-3">
            <Image
              src="search.svg"
              alt="search"
              height={20}
              width={20}
              className="mx-3 object-contain"
            ></Image>
            <input
              type="text"
              className="border-none w-[100%] focus:outline-none truncate"
              placeholder="Search Car"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <CustomButton
          title="Add New Car"
          btnType="button"
          containerStyles="text-white text-white rounded-full bg-primary-blue bg-primary-blue min-w-[130px]"
          handleClick={() => {
            setShowAddNewCar(true);
          }}
        />
      </div>
      <div className="grid grid-cols-9 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">MAKE</div>
        <div className="col-span-3 px-6">MODEL</div>
        <div className="col-span-1 px-6 text-center">TYPE</div>
        <div className="col-span-1 px-6 text-center">CAPACITY</div>
        <div className="col-span-1 px-6 text-center">VIEW MORE</div>
        <div className="col-span-1 px-6 text-center">OPTIONS</div>
      </div>
      <div className="flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allCars.length > 0 ? (
            allCars.map((car: CarProps) => (
              <div className="h-[50px] grid grid-cols-9 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                  {car.make}
                </div>
                <div className="h-full flex items-center border-b  px-6 col-span-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {car.model}
                </div>
                <div className="h-full flex items-center border-b  px-6 col-span-1 text-center">
                  {car.type}
                </div>
                <div className="h-full flex justify-center items-center border-b  px-6 col-span-1">
                  {car.capacity}
                </div>
                <div className="h-full flex justify-center items-center border-b  px-6 col-span-1">
                  <button
                    className="w-full flex justify-center items-center rounded-md hover:bg-slate-300"
                    onClick={() => {
                      setShowViewCar(true);
                    }}
                  >
                    <Image
                      src="ArrowRight.svg"
                      alt="view more"
                      width={20}
                      height={20}
                      className=""
                    />
                  </button>
                  {showViewCar && <CarViewAll car={car} />}
                </div>
                <div className="relative h-full flex items-center border-b  px-6 col-span-1 justify-center">
                  <button
                    className="w-[70%] h-full flex justify-center items-center rounded-md hover:bg-slate-300"
                    onClick={() => {
                      if (idOptions === car.carId) {
                        setShowOptions(false);
                        setIdOptions(0);
                      } else {
                        setShowOptions(true);
                        setIdOptions(car.carId);
                      }
                    }}
                  >
                    <Image
                      src="Options.svg"
                      alt="Options"
                      width={8}
                      height={8}
                      className=""
                    />
                  </button>
                  {showOptions && idOptions === car.carId && (
                    <>
                      <div className="flex h-full gap-[2px] flex-col absolute top-0 left-[-28px]">
                        <button
                          className="w-full h-full border border-slate-600 bg-yellow-600 hover:bg-yellow-400 rounded-md px-2 text-start text-white"
                          onClick={() => handleEdit(car)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full h-full border border-slate-600 bg-red-600 hover:bg-red-400 rounded-md px-2 text-start text-white"
                          onClick={() => handleDelete(car.carId)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="">
              <div className="text-black text-xl font-bold px-6">
                Oops, no results
              </div>
            </div>
          )}
        </div>
        <div className="px-5 flex gap-5 justify-between">
          <div className="flex gap-5">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`border border-black rounded-md ${
                  isActivePage(index + 1)
                    ? "bg-blue-500 text-white"
                    : "bg-slate-200 text-slate-700"
                } text-base font-semibold hover:bg-slate-400 hover:text-blue-950 px-4`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`${
                currentPage === 1 ? "" : "hover:bg-slate-300"
              } border px-5 rounded-md`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Image
                src="AngleLeft.svg"
                alt="previous"
                width={20}
                height={20}
              ></Image>
            </button>
            <button
              className={`${
                currentPage === totalPages ? "" : "hover:bg-slate-300"
              } border px-5 rounded-md`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image
                src="AngleRight.svg"
                alt="next"
                width={20}
                height={20}
              ></Image>
            </button>
          </div>
        </div>
      </div>
      {showAddNewCar && <FormAddCar car={carModel} />}
    </div>
  );
};

export default Car;
