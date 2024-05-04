"use client";

import Image from "next/image";
import { useStore } from "./Store";
import { listProvince, useClickOutside } from "@/src/utils";
import { useEffect, useRef, useState } from "react";

const Location = () => {
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
  } = useStore();

  const [showSelectedCityFrom, setShowSelectedCityFrom] = useState(false);
  const [showSelectedDateFrom, setShowSelectedDateFrom] = useState(false);
  const [showSelectedTimeFrom, setShowSelectedTimeFrom] = useState(false);
  const [showSelectedCityTo, setShowSelectedCityTo] = useState(false);
  const [showSelectedDateTo, setShowSelectedDateTo] = useState(false);
  const [showSelectedTimeTo, setShowSelectedTimeTo] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const [searchLocations, setSearchLocations] = useState("");

  //Check thời gian hiện tại so với thời gian đi
  useEffect(() => {
    const checkDateFrom = () => {
      const currentDate = new Date();
      const selectedDate = new Date(dateFrom);
      const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

      if (
        selectedDate.getFullYear() == currentDate.getFullYear() &&
        selectedDate.getMonth() == currentDate.getMonth() &&
        selectedDate.getDate() == currentDate.getDate()
      ) {
        if (timeFrom < currentTime) {
          setError("Time from cannot be less than current time");
        } else {
          setError("");
        }
      }

      if (
        selectedDate.getFullYear() > currentDate.getFullYear() &&
        selectedDate.getMonth() > currentDate.getMonth() &&
        selectedDate.getDate() > currentDate.getDate()
      ) {
        setError("");
      }
      if (
        selectedDate.getFullYear() < currentDate.getFullYear() ||
        selectedDate.getMonth() < currentDate.getMonth() ||
        selectedDate.getDate() < currentDate.getDate()
      ) {
        setError("Date from cannot be less than current date");
      }
    };

    const checkDateTo = () => {
      if (dateFrom != "" && dateTo != "" && dateFrom === dateTo) {
        if (timeFrom != "" && timeTo != "" && timeFrom > timeTo) {
          setError("Time to can not be less than time from");
        } else {
          setError("");
        }
      } else if (dateFrom != "" && dateTo != "" && dateFrom > dateTo) {
        setError("Date to can not be less than date from");
      } else {
        setError("");
      }
    };

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
      setCheckSelectedLocation(true);
    }

    checkDateFrom();
    checkDateTo();
  }, [locationFrom, locationTo, dateFrom, dateTo, timeFrom, timeTo]);

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
                  className="absolute flex flex-col gap-2 z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px] h-[200px] w-[180px] overflow-y-scroll"
                  // ref={formRef}
                >
                  <input
                    type="text"
                    placeholder="Search Your City..."
                    className="max-w-[150px] rounded-md px-2"
                    value={searchLocations}
                    onChange={(e) => {
                      setSearchLocations(e.target.value);
                    }}
                  />
                  <div>
                    {listProvince.map((province, index) => (
                      <div key={index}>
                        {searchLocations ? (
                          province
                            .toLowerCase()
                            .includes(searchLocations.toLowerCase()) && (
                            <option
                              value={province}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLocationFrom(province);
                                setShowSelectedCityFrom(false);
                              }}
                              className={`${
                                locationFrom && locationFrom == province
                                  ? `bg-slate-500`
                                  : ""
                              } hover:bg-slate-500 hover:cursor-pointer`}
                            >
                              {province}
                            </option>
                          )
                        ) : (
                          <option
                            value={province}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setLocationFrom(province);
                              setShowSelectedCityFrom(false);
                            }}
                            className={`${
                              locationFrom && locationFrom == province
                                ? `bg-slate-500`
                                : ""
                            } hover:bg-slate-500 hover:cursor-pointer`}
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
                      setDateFrom(e.target.value);
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
                      setTimeFrom(e.target.value);
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
      <div className="flex justify-center items-center">
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
                  className="absolute flex flex-col gap-2 z-10 p-2 bg-slate-300 border rounded-xl top-[30px] left-[-30px] h-[200px] w-[180px] overflow-y-scroll"
                  // ref={formRef}
                >
                  <input
                    type="text"
                    placeholder="Search Your City..."
                    className="max-w-[150px] rounded-md px-2"
                    value={searchLocations}
                    onChange={(e) => {
                      setSearchLocations(e.target.value);
                    }}
                  />
                  <div>
                    {listProvince.map((province, index) => (
                      <div key={index}>
                        {searchLocations ? (
                          province
                            .toLowerCase()
                            .includes(searchLocations.toLowerCase()) && (
                            <option
                              value={province}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setLocationTo(province);
                                setShowSelectedCityTo(false);
                              }}
                              className={`${
                                locationTo && locationTo == province
                                  ? `bg-slate-500`
                                  : ""
                              } hover:bg-slate-500 hover:cursor-pointer`}
                            >
                              {province}
                            </option>
                          )
                        ) : (
                          <option
                            value={province}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setLocationTo(province);
                              setShowSelectedCityTo(false);
                            }}
                            className={`${
                              locationTo && locationTo == province
                                ? `bg-slate-500`
                                : ""
                            } hover:bg-slate-500 hover:cursor-pointer`}
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
                      setDateTo(e.target.value);
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
                      setTimeTo(e.target.value);
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

export default Location;
