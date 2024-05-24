"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { listProvince } from "@/utils";
import { toast } from "react-toastify";
import { useStore } from "@/components/Store";

const LocationOrder = () => {
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
    loading,
    setLoading,
  } = useStore();

  const [searchLocationsFrom, setSearchLocationsFrom] = useState("");
  const [searchLocationsTo, setSearchLocationsTo] = useState("");
  const [showSelectedCityFrom, setShowSelectedCityFrom] = useState(false);
  const [showSelectedDateFrom, setShowSelectedDateFrom] = useState(false);
  const [showSelectedTimeFrom, setShowSelectedTimeFrom] = useState(false);
  const [showSelectedCityTo, setShowSelectedCityTo] = useState(false);
  const [showSelectedDateTo, setShowSelectedDateTo] = useState(false);
  const [showSelectedTimeTo, setShowSelectedTimeTo] = useState(false);

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
        locationFrom == "" ||
        locationTo == "" ||
        dateFrom == "" ||
        dateTo == "" ||
        timeFrom == "" ||
        timeTo == ""
      ) {
        setCheckSelectedLocation(false);
      } else {
        localStorage.setItem("locationFrom", locationFrom);
        localStorage.setItem("locationTo", locationTo);
        localStorage.setItem("dateFrom", dateFrom);
        localStorage.setItem("dateTo", dateTo);
        localStorage.setItem("timeFrom", timeFrom);
        localStorage.setItem("timeTo", timeTo);
        setCheckSelectedLocation(true);
      }
    };

    checkDateFrom();
    checkDateTo();
    checkLocation();
  }, [locationFrom, locationTo, dateFrom, dateTo, timeFrom, timeTo]);

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

  const handleSwap = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      locationFrom != "" &&
      locationTo != "" &&
      dateFrom != "" &&
      dateTo != "" &&
      timeFrom != "" &&
      timeTo != ""
    ) {
      const tempLocationFrom = locationFrom;
      const tempDateFrom = dateFrom;
      const tempTimeFrom = timeFrom;

      setLocationFrom(locationTo);
      setDateFrom(dateTo);
      setTimeFrom(timeTo);
      setLocationTo(tempLocationFrom);
      setDateTo(tempDateFrom);
      setTimeTo(tempTimeFrom);
      toast.success("Swap Location Successfully!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between">
      <div className="flex flex-col bg-white rounded-md py-4 px-4 sm:px-8 w-full sm:w-[45%] shadow-sm">
        <div className="flex justify-start items-center mb-2">
          <Image src="/pick.svg" alt="pick" width={20} height={20}></Image>
          <span className="font-semibold text-base ml-2">Pick - Up</span>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Locations</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {locationFrom ? `${locationFrom}` : `Select your city`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedCityFrom(!showSelectedCityFrom);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
                ></Image>
              </div>
              {showSelectedCityFrom && (
                <div
                  className="absolute flex flex-col gap-2 z-10 p-2 bg-yellow-50 border rounded-xl top-[30px] left-[-30px] h-[200px] w-[180px] overflow-y-scroll"
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
          </div>
          <Image
            src="/Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Date</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {dateFrom ? `${dateFrom}` : `Select your date`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedDateFrom(!showSelectedDateFrom);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
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
          </div>
          <Image
            src="/Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Time</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {timeFrom ? `${timeFrom}` : `Select your time`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedTimeFrom(!showSelectedTimeFrom);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
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
      </div>
      <div
        className="flex justify-center items-center hover:cursor-pointer hover:opacity-90"
        onClick={(e) => {
          handleSwap(e);
        }}
      >
        <Image src="/Swap.svg" alt="swap" width={100} height={100}></Image>
      </div>
      <div className="flex flex-col bg-white rounded-md py-4 px-4 sm:px-8 w-full sm:w-[45%] shadow-sm">
        <div className="flex justify-start items-center mb-2">
          <Image src="/pick.svg" alt="pick" width={20} height={20}></Image>
          <span className="font-semibold text-base ml-2">Pick - Down</span>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Locations</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {locationTo ? `${locationTo}` : `Select your city`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedCityTo(!showSelectedCityTo);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
                ></Image>
              </div>
              {showSelectedCityTo && (
                <div
                  className="absolute flex flex-col gap-2 z-10 p-2 bg-yellow-50 border rounded-xl top-[30px] left-[-30px] h-[200px] w-[180px] overflow-y-scroll"
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
          </div>
          <Image
            src="/Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Date</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {dateTo ? `${dateTo}` : `Select your date`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedDateTo(!showSelectedDateTo);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
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
          </div>
          <Image
            src="/Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Time</span>
            <div className="relative flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                {timeTo ? `${timeTo}` : `Select your time`}
              </span>
              <div
                className="h-full w-[20px] flex justify-center items-center cursor-pointer rounded-md hover:bg-slate-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSelectedTimeTo(!showSelectedTimeTo);
                }}
              >
                <Image
                  src="/down.svg"
                  alt="down"
                  width={10}
                  height={10}
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
    </div>
  );
};

export default LocationOrder;
