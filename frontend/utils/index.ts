"use client";

import { useStore } from "@/components/Store";
import { BrandProps, CarProps } from "@/types";
import { useEffect } from "react";

export async function fetchBrands(
  brands: BrandProps,
  searchValue?: string,
  currentPage?: number,
  itemsPerPage?: number
) {
  const { brandId, brandName, address, phone } = brands;
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue && !currentPage && !itemsPerPage) {
    url = "http://localhost:5290/api/brand";
  } else {
    url = `http://localhost:5290/api/brand?BrandName=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch brand data");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching brand data: " + error);
  }
}

export async function fetchBrandCount() {
  try {
    const response = await fetch(`http://localhost:5290/api/brand/GetCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch count brand data");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching count brand data: " + error
    );
  }
}

export async function fetchDeleteBrand(id: number) {
  try {
    const response = await fetch(`http://localhost:5290/api/brand/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting brand");
    }
  } catch (error) {
    throw new Error("Error deleting brand ");
  }
}

export async function fetchCars(
  cars: CarProps,
  searchValue?: string,
  currentPage?: number,
  itemsPerPage?: number
) {
  let {
    carId,
    make,
    model,
    type,
    gasoline,
    capacity,
    year,
    cityMpg,
    fuel,
    transmission,
    carImages,
  } = cars;

  const searchModel: string[] = searchValue?.split(" ") || [];

  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue && !currentPage && !itemsPerPage) {
    url = "http://localhost:5290/api/car";
  } else {
    url = `http://localhost:5290/api/car?CarName=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch brand data");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching brand data: " + error);
  }
}

export async function fetchDeleteCar(id: number) {
  try {
    const response = await fetch(`http://localhost:5290/api/car/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting car");
    }
  } catch (error) {
    throw new Error("Error deleting car ");
  }
}

export async function fetchCarCount() {
  try {
    const response = await fetch(`http://localhost:5290/api/car/GetCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch count brand data");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching count brand data: " + error
    );
  }
}

export async function fetchDeleteCarImage(carId: number, carImageId: number) {
  let url = `http://localhost:5290/api/car/image/${carId}/${carImageId}`;
  console.log(url);
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting carImage");
    }
  } catch (error) {
    throw new Error("Error deleting carImage ");
  }
}

export async function fetchCheckUsername(username: string) {
  let url = `http://localhost:5290/api/account/checkUserName?username=${username}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error check username");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error check username ");
  }
}

export async function fetchCheckEmail(email: string) {
  let url = `http://localhost:5290/api/account/checkEmail?email=${email}`;

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error check email");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error check email ");
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(2);
};

export const generateCarImageUrl = (car: CarProps, angle: string = "1") => {
  // url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  // url.searchParams.append('customer', 'hrjavascript-mastery')
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const useClickOutside = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: (BooleanStore: Boolean) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
