"use client";

import { SERVER_URL } from "@/constants";
import {
  BrandProps,
  CarProps,
  CreatePhoto,
  DeletePhoto,
  OrderProps,
  PhotoProps,
  UpdatePhoto,
  UploadPhoto,
  UserProps,
} from "@/types";
import { useEffect } from "react";

export async function fetchBrands(
  brands: BrandProps,
  token: string,
  currentPage?: number,
  itemsPerPage?: number,
  searchValue?: string
) {
  const { brandId, brandName, address, phone } = brands;
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue && !currentPage && !itemsPerPage) {
    url = `${SERVER_URL}/api/brand`;
  } else if (!searchValue) {
    url = `${SERVER_URL}/api/brand?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `${SERVER_URL}/api/brand?BrandName=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }

  if (token != "" && currentPage != 0) {
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

export async function fetchBrandByBrandId(brandId?: number, token?: string) {
  let url = `${SERVER_URL}/api/brand/${brandId}`;
  if (token != "" && brandId != 0) {
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

export async function fetchBrandCount(searchValue: string, token: string) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/brand/GetCount?Search=${searchValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await fetch(`${SERVER_URL}/api/brand/${id}`, {
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

export async function fetchCheckBrandExistsFromCars(brandId: number) {
  try {
    const url = `${SERVER_URL}/api/brand/brandExists?brandId=${brandId}`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch check brand from car");
    }
  } catch (error) {
    throw new Error("An error occurred while check brand from car: " + error);
  }
}

export async function fetchCars(
  cars: CarProps,
  currentPage?: number,
  itemsPerPage?: number,
  searchValue?: string
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
    url = `${SERVER_URL}/api/car?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `${SERVER_URL}/api/car?Search=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
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

export async function fetchCarByCarId(carId?: number, token?: string) {
  let url = `${SERVER_URL}/api/car/${carId}`;
  if (token != "" && carId != 0) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("oke ?");
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch car data");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching car data: " + error);
    }
  }
}

export async function fetchCheckCarExistsFromOrders(carId: number) {
  try {
    const url = `${SERVER_URL}/api/car/orderExists?carId=${carId}`;
    console.log("url = ", url);
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch check car from order");
    }
  } catch (error) {
    throw new Error("An error occurred while check car from order: " + error);
  }
}

export async function fetchDeleteCar(id: number, token: string) {
  try {
    const url = `${SERVER_URL}/api/car/${id}`;
    console.log("url = ", url);
    const response = await fetch(url, {
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

export async function fetchCarCount(searchValue: string, token: string) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/car/GetCount?Search=${searchValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
    const response = await fetch(`${SERVER_URL}/api/photo`, {
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
        const response = await fetch(`${SERVER_URL}/api/photo`, {
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
      let url = `${SERVER_URL}/api/photo/${photoId}`;
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
  let url = `${SERVER_URL}/api/account/checkUsername?username=${username}`;
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
  let url = `${SERVER_URL}/api/account/checkEmail?email=${email}`;

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
  token: string,
  currentPage?: number,
  itemsPerPage?: number,
  searchValue?: string
) {
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue) {
    url = `${SERVER_URL}/api/user?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `${SERVER_URL}/api/user?Search=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  }

  console.log("url = ", url);
  if (currentPage != 0 && token != "") {
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
        throw new Error("Failed to fetch order data");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching order data: " + error);
    }
  }
}

export async function fetchUserByToken(token: string) {
  if (token != "") {
    try {
      const response = await fetch(`${SERVER_URL}/api/user/currentUser`, {
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

export async function fetchUserById(userId: string, token: string) {
  if (token != "") {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/user/userId?userId=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

export async function fetchUserCount(searchValue: string, token: string) {
  try {
    console.log("token Count = ", token);
    const response = await fetch(
      `${SERVER_URL}/api/user/GetCount?Search=${searchValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

export async function fetchOrders(
  token?: string,
  currentPage?: number,
  itemsPerPage?: number,
  searchValue?: string
) {
  searchValue = searchValue?.replace(/\s/g, "");
  let url;
  if (!searchValue) {
    url = `${SERVER_URL}/api/order?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
  } else {
    url = `${SERVER_URL}/api/order?Search=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
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
        throw new Error("Failed to fetch order data");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching order data: " + error);
    }
  }
}

export async function fetchOrderByOrderId(orderId?: number, token?: string) {
  let url = `${SERVER_URL}/api/order/${orderId}`;
  if (token != "" && orderId != 0) {
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
        throw new Error("Failed to fetch order data");
      }
    } catch (error) {
      throw new Error("An error occurred while fetching order data: " + error);
    }
  }
}

export async function fetchOrderCount(searchValue: string, token: string) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/order/GetCount?Search=${searchValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch count order data");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching count order data: " + error
    );
  }
}

export async function fetchOrderCountByUser(
  userId: string,
  searchValue: string,
  token: string
) {
  try {
    let url;
    if (searchValue != "") {
      url = `${SERVER_URL}/api/order/GetCountByUser?Search=${searchValue}&userId=${userId}`;
    } else {
      url = `${SERVER_URL}/api/order/GetCountByUser?userId=${userId}`;
    }
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
      throw new Error("Failed to fetch count order by user data");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching count order data: " + error
    );
  }
}

export async function fetchDeleteOrder(id: number, token: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/order/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error deleting order");
    }
  } catch (error) {
    throw new Error("Error deleting order ");
  }
}

export async function createUploadPhotoPromises(
  photos: PhotoProps[],
  baseUrl: string | undefined
) {
  const filePromises: Promise<UploadPhoto>[] = [];

  photos.forEach((photo) => {
    filePromises.push(
      new Promise<UploadPhoto>(async (resolve, reject) => {
        try {
          const photoUrl = `${baseUrl}/${photo.photoUrl}`;
          const response = await fetch(photoUrl);
          const blob = await response.blob();

          const UploadPhoto: UploadPhoto = {
            file: new File([blob], `image${Date.now()}.jpg`, {
              type: blob.type,
            }),
            photoId: photo.photoId,
          };

          resolve(UploadPhoto);
        } catch (error) {
          reject(error);
        }
      })
    );
  });

  return Promise.all(filePromises);
}

export async function fetchCreateCarFavorite(
  userId: string,
  carId: number,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/carFavorites`, {
      method: "POST",
      body: JSON.stringify({ userId, carId }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error create carFavorite");
    }
  } catch (error) {
    throw new Error("Error create carFavorite ");
  }
}

export async function fetchDeleteCarFavorite(
  userId: string,
  carId: number,
  token: string
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/carFavorites/${userId}/${carId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error deleting carFavorite");
    }
  } catch (error) {
    throw new Error("Error deleting carFavorite ");
  }
}

export async function fetchCreateNotificaton(
  userCreateId: string,
  carId: number,
  userId: string,
  message: string,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/UserNotification`, {
      method: "POST",
      body: JSON.stringify({ userCreateId, carId, userId, message }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error create Notification");
    }
  } catch (error) {
    throw new Error("Error create Notification ");
  }
}

export async function fetchCreateOrderRecipient(
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/OrderRecipient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        email,
        phoneNumber: phone,
      }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Error create OrderRecipient ");
  }
}

export async function fetchUpdateOrderRecipient(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  token: string
) {
  try {
    const response = await fetch(
      `${SERVER_URL}/api/OrderRecipient?id=${id}&firstName=${firstName}&lastName=${lastName}&email=${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error) {
    throw new Error("Error update OrderRecipient ");
  }
}

export async function fetchCreatePayment(
  paymentReference: string,
  userId: string,
  method: number,
  price: number,
  quantity: number,
  paymentDate: string,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        paymentReference,
        userId,
        method,
        price,
        quantity,
        paymentDate,
      }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Error create Payment ");
  }
}

export async function fetchCreateOrder(
  userId: string,
  carId: number,
  paymentId: number,
  orderRecipientId: number,
  locationFrom: string,
  dateFrom: string,
  timeFrom: string,
  locationTo: string,
  dateTo: string,
  timeTo: string,
  statusOrder: number,
  statusPayment: number,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        carId,
        paymentId,
        orderRecipientId,
        locationFrom,
        dateFrom,
        timeFrom,
        locationTo,
        dateTo,
        timeTo,
        statusOrder,
        statusPayment,
      }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Error create Order ");
  }
}

export async function fetchApiBank() {
  let url = `https://api.vietqr.io/v2/banks`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch order data");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching order data: " + error);
  }
}

export async function fetchOrderIdLatest(token: string) {
  try {
    const response = await fetch(`${SERVER_URL}/api/order/latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Failed to fetch orderIdLatest ");
    }
  } catch (error) {
    throw new Error("An error occurred while fetching orderIdLatest: " + error);
  }
}

export async function fetchOrderByUserId(
  userId: string,
  searchValue: string,
  currentPage: number,
  itemsPerPage: number,
  token: string
) {
  try {
    let url;
    if (searchValue != "") {
      url = `${SERVER_URL}/api/order/${userId}?Search=${searchValue}&PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
    } else {
      url = `${SERVER_URL}/api/order/${userId}?PageNumber=${currentPage}&PageSize=${itemsPerPage}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Failed to fetch order by userId ");
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching order by userId: " + error
    );
  }
}

export async function fetchCreateCardUser(
  userId: string,
  logo: string,
  name: string,
  shortName: string,
  bin: string,
  cardNumber: string,
  release: string,
  cardholderName: string,
  token: string
) {
  try {
    const response = await fetch(`${SERVER_URL}/api/CardUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        logo,
        name,
        shortName,
        bin,
        cardNumber,
        release,
        cardHolderName: cardholderName,
      }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Error create Card User ");
  }
}

export const getPhotoUrl = (photo: UploadPhoto) => {
  if (photo && photo.file) {
    return URL.createObjectURL(photo.file);
  }
  return null;
};

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

export const listProvince = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Dương",
  "Bình Định",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Cần Thơ",
  "Đà Nẵng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Nội",
  "Hà Tĩnh",
  "Hải Dương",
  "Hải Phòng",
  "Hậu Giang",
  "Hòa Bình",
  "Hồ Chí Minh",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
];

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
