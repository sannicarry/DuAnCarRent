"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { listProvince } from "@/utils";
import { toast } from "react-toastify";
import { useStore } from "@/components/Store";

const LocationPayNow = () => {
  const {
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
    error,
    setError,
    checkSelectedLocation,
    setCheckSelectedLocation,
    price,
    setPrice,
    totalPrice,
    setTotalPrice,
    quantityOfDay,
    setQuantityOfDay,
  } = useStore();

  const [searchLocationsFrom, setSearchLocationsFrom] = useState("");
  const [searchLocationsTo, setSearchLocationsTo] = useState("");
  const [showSelectedCityFrom, setShowSelectedCityFrom] = useState(false);
  const [showSelectedDateFrom, setShowSelectedDateFrom] = useState(false);
  const [showSelectedTimeFrom, setShowSelectedTimeFrom] = useState(false);
  const [showSelectedCityTo, setShowSelectedCityTo] = useState(false);
  const [showSelectedDateTo, setShowSelectedDateTo] = useState(false);
  const [showSelectedTimeTo, setShowSelectedTimeTo] = useState(false);
  useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isLocationFrom = localStorage.getItem("locationFrom");
      const isLocationTo = localStorage.getItem("locationTo");
      const isDateFrom = localStorage.getItem("dateFrom");
      const isDateTo = localStorage.getItem("dateTo");
      const isTimeFrom = localStorage.getItem("timeFrom");
      const isTimeTo = localStorage.getItem("timeTo");
      if (
        isLocationFrom &&
        isLocationTo &&
        isDateFrom &&
        isDateTo &&
        isTimeFrom &&
        isTimeTo
      ) {
        setLocationFrom(isLocationFrom);
        setLocationTo(isLocationTo);
        setDateFrom(isDateFrom);
        setDateTo(isDateTo);
        setTimeFrom(isTimeFrom);
        setTimeTo(isTimeTo);
      }
    };

    fetchData();
  }, []);

  //Check thời gian
  useEffect(() => {
    const currentDate = new Date();
    const selectedDateFrom = new Date(dateFrom);
    const selectedDateTo = new Date(dateTo);

    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const [selectedHourFrom, selectedMinuteFrom] = timeFrom
      ? timeFrom.split(":").map(Number)
      : [0, 0];
    const [selectedHourTo, selectedMinuteTo] = timeTo
      ? timeTo.split(":").map(Number)
      : [0, 0];

    const checkDateFrom = () => {
      // Check thời gian người dùng chọn so với thời gian hiện tại
      if (
        selectedDateFrom.getFullYear() < currentDate.getFullYear() ||
        (selectedDateFrom.getFullYear() === currentDate.getFullYear() &&
          (selectedDateFrom.getMonth() < currentDate.getMonth() ||
            (selectedDateFrom.getMonth() === currentDate.getMonth() &&
              selectedDateFrom.getDate() < currentDate.getDate())))
      ) {
        toast.error("Date from cannot be less than current Date!", {
          position: "top-center",
        });
      } else if (
        selectedDateFrom.getFullYear() === currentDate.getFullYear() &&
        selectedDateFrom.getMonth() === currentDate.getMonth() &&
        selectedDateFrom.getDate() === currentDate.getDate() &&
        ((timeFrom && selectedHourFrom < currentHour) ||
          (selectedHourFrom === currentHour &&
            selectedMinuteFrom < currentMinute))
      ) {
        toast.error("Time from cannot be less than current time!", {
          position: "top-center",
        });
      }
    };

    const checkDateTo = () => {
      if (
        selectedDateTo.getFullYear() < selectedDateFrom.getFullYear() ||
        (selectedDateTo.getFullYear() === selectedDateFrom.getFullYear() &&
          (selectedDateTo.getMonth() < selectedDateFrom.getMonth() ||
            (selectedDateTo.getMonth() === selectedDateFrom.getMonth() &&
              selectedDateTo.getDate() < selectedDateFrom.getDate())))
      ) {
        toast.error("Date to can not be less than date From!", {
          position: "top-center",
        });
      } else if (
        selectedDateTo.getFullYear() === currentDate.getFullYear() &&
        selectedDateTo.getMonth() === currentDate.getMonth() &&
        selectedDateTo.getDate() === currentDate.getDate() &&
        ((timeFrom && timeTo && selectedHourTo < selectedHourFrom) ||
          (selectedHourTo === selectedHourFrom &&
            selectedMinuteTo < selectedMinuteFrom))
      ) {
        toast.error("Time to can not be less than time From!", {
          position: "top-center",
        });
      }
    };

    const checkLocation = () => {
      //Check đã select location hay chưa !
      if (
        locationFrom != "" &&
        locationTo != "" &&
        dateFrom != "" &&
        dateTo != "" &&
        timeFrom != "" &&
        timeTo != ""
      ) {
        localStorage.setItem("locationFrom", locationFrom);
        localStorage.setItem("locationTo", locationTo);
        localStorage.setItem("dateFrom", dateFrom);
        localStorage.setItem("dateTo", dateTo);
        localStorage.setItem("timeFrom", timeFrom);
        localStorage.setItem("timeTo", timeTo);
        setQuantityOfDay(handleQuantityOfDay());
      }
    };

    checkDateFrom();
    checkDateTo();
    checkLocation();
  }, [locationFrom, locationTo, dateFrom, dateTo, timeFrom, timeTo]);

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

  useEffect(() => {
    if (quantityOfDay != 0 && price != 0) {
      setTotalPrice(Number((Number(price) * quantityOfDay).toFixed(2)));
    }
  }, [quantityOfDay, price]);

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
  return (
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
          <span className="text-[gray-500] font-bold">Drop-Off Location</span>
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
              <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
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
  );
};

export default LocationPayNow;
