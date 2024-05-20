"use client";
import { FaCheck } from "react-icons/fa6";
import { useStore } from "@/components/Store";
import { SERVER_URL } from "@/constants";
import {
  BankProps,
  CarProps,
  LocationProps,
  OrderRecipientProps,
  UploadPhoto,
} from "@/types";
import {
  calculateCarRent,
  createUploadPhotoPromises,
  fetchApiBank,
  fetchCreateOrder,
  fetchCreateOrderRecipient,
  fetchCreatePayment,
  fetchUpdateOrderRecipient,
  getPhotoUrl,
  listProvince,
} from "@/utils";
import { format, getDate, getTime } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomButton } from "@/components";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);
  const [searchLocationsFrom, setSearchLocationsFrom] = useState("");
  const [searchLocationsTo, setSearchLocationsTo] = useState("");
  const [showSelectedCityFrom, setShowSelectedCityFrom] = useState(false);
  const [showSelectedDateFrom, setShowSelectedDateFrom] = useState(false);
  const [showSelectedTimeFrom, setShowSelectedTimeFrom] = useState(false);
  const [showSelectedCityTo, setShowSelectedCityTo] = useState(false);
  const [showSelectedDateTo, setShowSelectedDateTo] = useState(false);
  const [showSelectedTimeTo, setShowSelectedTimeTo] = useState(false);
  let orderRecipientId: number = 0;
  let paymentId: number = 0;
  let statusOrder: number = 1;

  const {
    error,
    setError,
    success,
    setSuccess,
    token,
    user,
    status,
    orderRecipients,
    setOrderRecipients,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    blurred,
    setBlurred,
    locationFrom,
    setLocationFrom,
    locationTo,
    setLocationTo,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    methodPayment,
    setMethodPayment,
    payment,
    setPayment,
    bankData,
    setBankData,
  } = useStore();

  const searchParams = useSearchParams();
  const [car, setCar] = useState<CarProps>();

  useEffect(() => {
    if (orderRecipients && orderRecipients.length > 0) {
      const latestRecipient = orderRecipients[orderRecipients.length - 1];
      setFirstName(latestRecipient.firstName);
      setLastName(latestRecipient.lastName);
      setEmail(latestRecipient.email);
      setPhone(latestRecipient.phoneNumber);
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [orderRecipients, user]);

  useEffect(() => {
    const carParam = searchParams.get("car");
    if (carParam) {
      const parsedCar = JSON.parse(carParam) as CarProps;
      setCar(parsedCar);
    }
    const allLocationsParam = searchParams.get("allLocations");
    if (allLocationsParam) {
      const parsedAllLocations = JSON.parse(allLocationsParam) as LocationProps;
      setLocationFrom(parsedAllLocations.locationFrom);
      setLocationTo(parsedAllLocations.locationTo);
      setDateFrom(parsedAllLocations.dateFrom);
      setDateTo(parsedAllLocations.dateTo);
      setTimeFrom(parsedAllLocations.timeFrom);
      setTimeTo(parsedAllLocations.timeTo);
    }
    if (car) {
      const fetchPhoto = async () => {
        if (car && car?.carId !== undefined) {
          try {
            const baseURL = process.env.SERVER_URL;

            const uploadPromises = createUploadPhotoPromises(
              car?.photos,
              baseURL
            );
            const uploadedPhotos = await uploadPromises;
            setPhotos(uploadedPhotos);
          } catch (error) {
            console.error("Error loading car images:", error);
          }
        }
      };

      fetchPhoto();
    }
  }, [searchParams]);

  if (!car) {
    return null;
  }

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const price = calculateCarRent(car.cityMpg, Number(car.year));
  let quantityOfDay: number;
  const handleQuantityOfDay = () => {
    const startDate = new Date(dateFrom);
    const endDate = new Date(dateTo);
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const hoursRemaining = (diffTime / (1000 * 60 * 60)) % 24;

    if (hoursRemaining > 6) {
      return diffDays + 1;
    } else {
      return diffDays;
    }
  };

  quantityOfDay = handleQuantityOfDay();

  const totalPrice = (Number(price) * quantityOfDay).toFixed(2);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //fetch OrderRecipient
    const orderRecipient = orderRecipients.find((x) => x.phoneNumber === phone);

    if (orderRecipient) {
      const infoChanged =
        orderRecipient.firstName !== firstName ||
        orderRecipient.lastName !== lastName ||
        orderRecipient.email !== email;

      if (infoChanged) {
        const updatedOrderRecipient = await fetchUpdateOrderRecipient(
          orderRecipient.orderRecipientId,
          firstName,
          lastName,
          email,
          token
        );
        orderRecipientId = updatedOrderRecipient.orderRecipientId;
      }
    } else {
      const newOrderRecipient = await fetchCreateOrderRecipient(
        user.userId,
        firstName,
        lastName,
        email,
        phone,
        token
      );
      orderRecipientId = newOrderRecipient.orderRecipientId;
    }

    //fetchPayment

    const payment = await fetchCreatePayment(
      "Car Rent",
      user.userId,
      methodPayment == "card" ? 1 : 2,
      parseFloat(price),
      quantityOfDay,
      formatDate(new Date()),
      token
    );

    paymentId = payment.paymentId;

    //fetchOrder
    await fetchCreateOrder(
      user.userId,
      car.carId,
      paymentId,
      orderRecipientId,
      locationFrom,
      dateFrom,
      timeFrom,
      locationTo,
      dateTo,
      timeTo,
      statusOrder,
      methodPayment == "card" ? 1 : 2,
      token
    );

    setSuccess(true);
    cleanLocation();
    alert("success");
    router.push("/pages/home", { scroll: false });
  };

  const handleEditRecipient = () => {
    setIsEditingRecipient(true);
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleChangeLocationFrom = (e: React.MouseEvent<HTMLOptionElement>) => {
    setLocationFrom(e.currentTarget.value);
    setShowSelectedCityFrom(!showSelectedCityFrom);
  };

  const handleChangeDateFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value);
    setShowSelectedDateFrom(!showSelectedDateFrom);
  };

  const handleChangeTimeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrom(e.target.value);
    setShowSelectedTimeFrom(!showSelectedTimeFrom);
  };

  const handleChangeLocationTo = (e: React.MouseEvent<HTMLOptionElement>) => {
    setLocationTo(e.currentTarget.value);
    setShowSelectedCityTo(!showSelectedCityTo);
  };

  const handleChangeDateTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value);
    setShowSelectedDateTo(!showSelectedDateTo);
  };

  const handleChangeTimeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeTo(e.target.value);
    setShowSelectedTimeTo(!showSelectedTimeTo);
  };

  const cleanLocation = () => {
    setLocationFrom("");
    setLocationTo("");
    setDateFrom("");
    setDateTo("");
    setTimeFrom("");
    setTimeTo("");
  };

  const tsxTick = () => {
    return (
      <div
        className="absolute top-[20px] right-0 
      border-l-[20px] border-l-transparent
      border-b-[20px] border-b-blue-500
      border-r-[0] border-r-transparent"
      >
        <FaCheck className="absolute w-3 h-3 top-[8px] right-0 text-white" />
      </div>
    );
  };

  const handleClickMethodPayment = (method: string) => {
    setMethodPayment(method);
  };

  const fetchBankData = async () => {
    try {
      const res = await fetchApiBank();
      setBankData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  fetchBankData();

  console.log("methodPayment = ", methodPayment);
  console.log("bankData = ", bankData);

  return (
    <div className="content bg-[#0EA5E9] flex flex-col gap-5">
      <div className="flex flex-col bg-white p-8 gap-5 border-teal-300 rounded-md">
        <div className="grid grid-cols-2 gap-5 ">
          <div className="col-span-1 flex flex-col gap-5 border-r-4 border-r-slate-500">
            <div className="flex gap-2">
              <Image
                src="/location-dot.svg"
                alt="location pick"
                width={16}
                height={16}
              ></Image>
              <span className="text-[gray-500] font-bold">Pickup Location</span>
            </div>
            <div className="flex gap-4 font-extrabold text-gray-500">
              <div className="relative flex items-center gap-2">
                <span className=""> Location: {locationFrom}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedCityFrom(!showSelectedCityFrom);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedCityFrom && (
                  <div
                    className="absolute flex flex-col bg-yellow-50 gap-2 z-20 p-2 top-[30px] left-[-10px] h-[200px] w-full overflow-y-scroll"
                    // ref={formRef}
                  >
                    <input
                      type="text"
                      placeholder="Search Your City..."
                      className="max-w-[150px] text-sm font-medium p-2 rounded-md"
                      value={searchLocationsFrom}
                      onChange={(e) => {
                        setSearchLocationsFrom(e.target.value);
                      }}
                    />
                    <div>
                      {listProvince.map((province, index) => (
                        <div key={index}>
                          {searchLocationsFrom ? (
                            province
                              .toLowerCase()
                              .includes(searchLocationsFrom.toLowerCase()) && (
                              <option
                                value={province}
                                onClick={(e) => {
                                  handleChangeLocationFrom(e);
                                }}
                                className={`${
                                  locationFrom && locationFrom == province
                                    ? `bg-slate-100`
                                    : ""
                                } hover:bg-slate-300 hover:cursor-pointer`}
                              >
                                {province}
                              </option>
                            )
                          ) : (
                            <option
                              value={province}
                              onClick={(e) => {
                                handleChangeLocationFrom(e);
                              }}
                              className={`${
                                locationFrom && locationFrom == province
                                  ? `bg-slate-100`
                                  : ""
                              } hover:bg-slate-300 hover:cursor-pointer`}
                            >
                              {province}
                            </option>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <span className=""> Date: {dateFrom}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedDateFrom(!showSelectedDateFrom);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedDateFrom && (
                  <div
                    className="absolute z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px]"
                    // ref={formRef}
                  >
                    <input
                      type="date"
                      className="max-w-[150px] rounded-md px-2"
                      value={dateFrom}
                      onChange={(e) => {
                        handleChangeDateFrom(e);
                      }}
                    />
                  </div>
                )}
                {error && error.includes("Date") && (
                  <div className="absolute top-[10px] left-[-52px] w-[234px]">
                    <span className="font-semibold text-red-600 text-sm">
                      {error}
                    </span>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <span className=""> Time: {timeFrom}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedTimeFrom(!showSelectedTimeFrom);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedTimeFrom && (
                  <div
                    className="absolute z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px]"
                    // ref={formRef}
                  >
                    <input
                      type="time"
                      className="max-w-[150px] rounded-md px-2"
                      value={timeFrom}
                      onChange={(e) => {
                        handleChangeTimeFrom(e);
                      }}
                    />
                  </div>
                )}

                {error && error.includes("Time") && (
                  <div className="absolute top-[10px] left-[-80px] w-[234px]">
                    <span className="font-semibold text-red-600 text-sm">
                      {error}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-5">
            <div className="flex gap-2">
              <Image
                src="/location-dot.svg"
                alt="location pick"
                width={16}
                height={16}
              ></Image>
              <span className="text-[gray-500] font-bold">
                Drop-Off Location
              </span>
            </div>
            <div className="flex gap-4 font-extrabold text-gray-500">
              <div className="relative flex items-center gap-2">
                <span className=""> Location: {locationTo}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedCityTo(!showSelectedCityTo);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedCityTo && (
                  <div
                    className="absolute flex flex-col bg-yellow-50 gap-2 z-20 p-2 top-[30px] left-[-10px] h-[200px] w-full overflow-y-scroll"
                    // ref={formRef}
                  >
                    <input
                      type="text"
                      placeholder="Search Your City..."
                      className="max-w-[150px] text-sm font-medium p-2 rounded-md"
                      value={searchLocationsTo}
                      onChange={(e) => {
                        setSearchLocationsTo(e.target.value);
                      }}
                    />
                    <div>
                      {listProvince.map((province, index) => (
                        <div key={index}>
                          {searchLocationsTo ? (
                            province
                              .toLowerCase()
                              .includes(searchLocationsTo.toLowerCase()) && (
                              <option
                                value={province}
                                onClick={(e) => {
                                  handleChangeLocationTo(e);
                                }}
                                className={`${
                                  locationTo && locationTo == province
                                    ? `bg-slate-100`
                                    : ""
                                } hover:bg-slate-300 hover:cursor-pointer`}
                              >
                                {province}
                              </option>
                            )
                          ) : (
                            <option
                              value={province}
                              onClick={(e) => {
                                handleChangeLocationTo(e);
                              }}
                              className={`${
                                locationTo && locationTo == province
                                  ? `bg-slate-100`
                                  : ""
                              } hover:bg-slate-300 hover:cursor-pointer`}
                            >
                              {province}
                            </option>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <span className=""> Date: {dateTo}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedDateTo(!showSelectedDateTo);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedDateTo && (
                  <div
                    className="absolute z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px]"
                    // ref={formRef}
                  >
                    <input
                      type="date"
                      className="max-w-[150px] rounded-md px-2"
                      value={dateTo}
                      onChange={(e) => {
                        handleChangeDateTo(e);
                      }}
                    />
                  </div>
                )}
                {error && error.includes("Date") && (
                  <div className="absolute top-[10px] left-[-52px] w-[234px]">
                    <span className="font-semibold text-red-600 text-sm">
                      {error}
                    </span>
                  </div>
                )}
              </div>
              <div className="relative flex items-center gap-2">
                <span className=""> Time: {timeTo}</span>
                <div
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSelectedTimeTo(!showSelectedTimeTo);
                  }}
                >
                  <Image
                    src="/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                  ></Image>
                </div>
                {showSelectedTimeTo && (
                  <div
                    className="absolute z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px]"
                    // ref={formRef}
                  >
                    <input
                      type="time"
                      className="max-w-[150px] rounded-md px-2"
                      value={timeTo}
                      onChange={(e) => {
                        handleChangeTimeTo(e);
                      }}
                    />
                  </div>
                )}

                {error && error.includes("Time") && (
                  <div className="absolute top-[10px] left-[-80px] w-[234px]">
                    <span className="font-semibold text-red-600 text-sm">
                      {error}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Image src="/User.svg" alt="user" width={20} height={20}></Image>
            <h1 className="font-bold text-gray-900">Recipient Information</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 h-10">
              <div className="relative flex gap-4 w-[40%]">
                <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
                  FirstName{" "}
                </span>
                <input
                  type="text"
                  className={`px-2 rounded-md w-[60%] ${
                    isEditingRecipient ? "border border-black" : ""
                  } `}
                  value={firstName}
                  onChange={(e) => {
                    handleChangeFirstName(e);
                  }}
                  onBlur={() => setBlurred(true)}
                  readOnly={!isEditingRecipient}
                />
                <div className="absolute top-[20%] right-[18%]">
                  {firstName == "" && blurred && (
                    <>
                      <span className="text-red-500 font-bold text-sm">
                        FirstName Cannot Empty !
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="relative flex gap-4 w-[40%]">
                <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
                  LastName{" "}
                </span>
                <input
                  type="text"
                  className={`px-2 rounded-md w-[60%] ${
                    isEditingRecipient ? "border border-black" : ""
                  } `}
                  value={lastName}
                  onChange={(e) => {
                    handleChangeLastName(e);
                  }}
                  onBlur={() => setBlurred(true)}
                  readOnly={!isEditingRecipient}
                />
                <div className="absolute top-[20%] right-[18%]">
                  {lastName == "" && blurred && (
                    <>
                      <span className="text-red-500 font-bold text-sm">
                        LastName Cannot Empty !
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-8 h-10">
              <div className="relative flex gap-4 w-[40%]">
                <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
                  Email{" "}
                </span>
                <input
                  type="text"
                  className={`px-2 rounded-md w-[60%] ${
                    isEditingRecipient ? "border border-black" : ""
                  } `}
                  value={email}
                  onChange={(e) => {
                    handleChangeEmail(e);
                  }}
                  onBlur={() => setBlurred(true)}
                  readOnly={!isEditingRecipient}
                />
                <div className="absolute top-[20%] right-[25%]">
                  {email == "" && blurred && (
                    <>
                      <span className="text-red-500 font-bold text-sm">
                        Email Cannot Empty !
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="relative flex gap-4 w-[40%]">
                <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
                  PhoneNumber{" "}
                </span>
                <input
                  type="text"
                  className={`px-2 rounded-md w-[60%] ${
                    isEditingRecipient ? "border border-black" : ""
                  } `}
                  value={phone}
                  onChange={(e) => {
                    handleChangePhoneNumber(e);
                  }}
                  onBlur={() => setBlurred(true)}
                  readOnly={!isEditingRecipient}
                />
                <div className="absolute top-[20%] right-[12%]">
                  {phone == "" && blurred && (
                    <>
                      <span className="text-red-500 font-bold text-sm">
                        PhoneNumber Cannot Empty !
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-2 hover:cursor-pointer border border-black p-2 rounded-md h-10 w-[35%]"
              onClick={handleEditRecipient}
            >
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
              <span className=" text-lg text-gray-700 font-bold">
                Click here to Edit Recipient Information
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 border-teal-300 rounded-md gap-5">
        <div className="grid grid-cols-8 items-center">
          <div className="col-span-4">
            <h1 className="text-slate-900 font-bold">Car</h1>
          </div>
          <div className="col-span-1">
            <h1 className="font-medium text-slate-700">Price / Day</h1>
          </div>
          <div className="col-span-1">
            <h1 className="font-medium text-slate-700">Quantity Of Day</h1>
          </div>
          <div className="col-span-2 flex justify-end items-end">
            <h1 className="font-medium text-slate-700">Total Price</h1>
          </div>
        </div>
        <div className="grid grid-cols-8 items-center">
          <div className="col-span-4">
            <div className="flex items-center gap-8">
              <Image
                src={getPhotoUrl(photos[0]) ?? "/NoCarPhoto.webp"}
                alt="Car image"
                width={100}
                height={100}
              ></Image>
              <div className="flex gap-4">
                <span className="text-slate-900 font-semibold">
                  {car.make} {car.model}
                </span>
                <span className="text-slate-700 font-semibold">
                  Capacity:
                  {car.capacity}
                </span>
                <span className="text-slate-700 font-semibold">
                  Fuel: {car.fuel}
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <span className="font-semibold text-slate-900">{price}</span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold text-slate-900">
              {quantityOfDay}
            </span>
          </div>
          <div className="col-span-2 flex justify-end items-end">
            <span className="font-semibold text-slate-900">${totalPrice}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="" method="POST">
        <div className="bg-white flex flex-col rounded-md">
          <div className="flex items-center gap-4 p-8 border-b border-b-gray-300">
            <h1 className="text-gray-700 font-bold">Payment Method</h1>
            <div
              className={`relative border ${
                methodPayment == "card"
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-500"
              } hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 rounded-sm font-medium p-2`}
              onClick={() => {
                handleClickMethodPayment("card");
              }}
            >
              <span>Napas Domestic Card</span>
              {methodPayment == "card" && tsxTick()}
            </div>
            <div
              className={`relative border ${
                methodPayment == "pickup"
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-500"
              } hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 rounded-sm font-medium p-2`}
              onClick={() => {
                handleClickMethodPayment("pickup");
              }}
            >
              <span>Payment on Car Pickup</span>
              {methodPayment == "pickup" && tsxTick()}
            </div>
          </div>
          {methodPayment == "pickup" && (
            <div className="flex items-center justify-end gap-4 p-8 border-b border-b-gray-300">
              <div className="flex flex-col gap-4 w-[20%]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-500">Total Price</h3>
                  <span className="font-medium text-gray-600">
                    ${totalPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-500">Total Payment</h3>
                  <span className="font-medium text-gray-600">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>
          )}
          {methodPayment == "card" && (
            <div className="flex flex-col items-center justify-end gap-4 p-8 border-b border-b-gray-300">
              {bankData.slice(0, 10).map((bank, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex w-[50%] rounded-md justify-between border border-slate-300 px-2 py-1">
                    <label htmlFor="femaleGender">Female</label>
                    <input
                      id="femaleGender"
                      name="gender"
                      type="radio"
                      autoComplete="off"
                      required
                      checked={!gender}
                      onChange={() => setGender(false)}
                      className=""
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end p-8 border-b border-b-gray-300">
            <CustomButton
              title={`Rent Now`}
              textStyles={`font-bold text-lg`}
              containerStyles=" w-[15%] text-white bg-blue-500 rounded-md  hover:opacity-80"
              btnType="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default page;
