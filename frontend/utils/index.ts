"use client";

import { useStore } from "@/components/Store";
import {
  BrandProps,
  CarProps,
  CreatePhoto,
  DeletePhoto,
  UpdatePhoto,
  UserProps,
} from "@/types";
import { useEffect } from "react";

export async function fetchBrands(
  brands: BrandProps,
  token?: string,
  searchValue?: string,
  currentPage?: number,
  itemsPerPage?: number
) {
  const { brandId, brandName, address, phone } = brands;
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue) {
    url = `http://localhost:5290/api/brand?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `http://localhost:5290/api/brand?BrandName=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }

  if (currentPage != 0) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
}

export async function fetchBrandCount(token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/brand/GetCount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function fetchDeleteBrand(id: number, token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/brand/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    photos,
    brandId,
  } = cars;

  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue) {
    url = `http://localhost:5290/api/car?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `http://localhost:5290/api/car?CarName=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }
  if (currentPage != 0) {
    try {
      const response = await fetch(url, {
        method: "GET",
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
}

export async function fetchDeleteCar(id: number, token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/car/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting car");
    }
  } catch (error) {
    throw new Error("Error deleting car ");
  }
}

export async function fetchCarCount(token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/car/GetCount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function fetchCreatePhoto(
  photoCreate: CreatePhoto[],
  token: string
) {
  try {
    const formData = new FormData();
    const { photoType, entityId } = photoCreate[0];
    formData.append("PhotoType", String(photoType));
    formData.append("EntityId", String(entityId));
    for (const photo of photoCreate) {
      formData.append("photos", photo.file);
    }
    const response = await fetch("http://localhost:5290/api/photo", {
      method: "POST",
      body: formData,

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Add photo successfully");
    } else {
      console.error("Error Add photo:", data.message);
    }
  } catch (error) {
    console.error("Error Add photo:", error);
  }
}

export async function fetchUpdatePhoto(
  photoUpdate: UpdatePhoto[],
  token: string
) {
  for (const photo of photoUpdate) {
    if (photo) {
      const formData = new FormData();
      const { photoType, entityId, photoId, file } = photo;
      formData.append("PhotoId", String(photoId));
      formData.append("PhotoType", String(photoType));
      formData.append("EntityId", String(entityId));
      formData.append("photo", file);

      try {
        const response = await fetch("http://localhost:5290/api/photo", {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          console.log("succes");

          console.log("Update photo successfully");
        } else {
          console.error("Error update photo:", data.message);
        }
      } catch (error) {
        console.error("Error update photo:", error);
      }
    }
  }
}

export async function fetchDeletePhoto(
  photoDelete: DeletePhoto[],
  token: string
) {
  for (const photo of photoDelete) {
    const { entityId, photoId } = photo;
    if (parseInt(entityId) > 0 || String(entityId) != "") {
      let url = `http://localhost:5290/api/photo/${photoId}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error deleting photo");
        }
      } catch (error) {
        throw new Error("Error deleting photo ");
      }
    }
  }
}

export async function fetchCheckUsername(username: string, token: string) {
  let url = `http://localhost:5290/api/account/checkusername?username=${username}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function fetchCheckEmail(email: string, token: string) {
  let url = `http://localhost:5290/api/account/checkEmail?email=${email}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function fetchUsers(
  users: UserProps,
  token?: string,
  searchValue?: string,
  currentPage?: number,
  itemsPerPage?: number
) {
  const {
    userId,
    username,
    email,
    phone,
    address,
    birthDate,
    gender,
    isLocked,
  } = users;
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue) {
    url = `http://localhost:5290/api/user?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `http://localhost:5290/api/user?SearchUser=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }
  if (currentPage != 0) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching user data: " + error);
    }
  }
}

export async function fetchUser(users: UserProps, token: string) {
  const {
    userId,
    username,
    email,
    phone,
    address,
    birthDate,
    gender,
    isLocked,
    photos,
  } = users;
  try {
    const response = await fetch("http://localhost:5290/api/user/currentUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching user data: " + error);
  }
}

export async function fetchUserCount(token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/user/GetCount`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch count user data");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching count user data: " + error
    );
  }
}

export async function fetchDeleteUser(id: number, token: string) {
  try {
    const response = await fetch(`http://localhost:5290/api/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting user");
    }
  } catch (error) {
    throw new Error("Error deleting user ");
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
