"use client";

import { useEffect, useState } from "react";
import { fetchCarCount, fetchCars } from "@/utils";
import { PhotoProps } from "@/types";
import { useStore } from "@/components/Store";
import CarManagement from "@/views/cars/CarManagement";

const page = () => {
  const [carId, setCarId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [photos, setPhotos] = useState<PhotoProps[]>([]);

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
    itemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    success,
    setSuccess,
    setCurrentPageAdmin,
    allCars,
    setAllCars,
    setLoading,
  } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("Car");
  }, []);

  const getCars = async (searchValue?: string, currentPage?: number) => {
    try {
      setLoading(true);
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
      if (result.length > 0) {
        setAllCars(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSuccess(false);
    }
  };

  useEffect(() => {
    getCars(searchValue, currentPage);
  }, [success, searchValue, currentPage]);

  const getCountCars = async () => {
    try {
      const count = await fetchCarCount(searchValue, token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountCars();
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, searchValue, totalPages]);

  return (
    <>
      <CarManagement allCars={allCars} currentPage={currentPage} />
    </>
  );
};

export default page;
