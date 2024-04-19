"use client";

import { useEffect, useState } from "react";
import { fetchUserCount, fetchUsers } from "@/utils";
import { UserProps } from "@/types";
import { CustomButton } from ".";
import { useStore } from "./Store";
import Image from "next/image";

const User = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userId, setUserId] = useState("");

  const {
    success,
    searchValue,
    setSearchValue,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    username,
    email,
    birthDate,
    gender,
    isLocked,
    address,
    phone,
  } = useStore();

  const getUsers = async (
    searchValue?: string,
    currentPage?: number,
    itemsPerPage?: number
  ) => {
    setLoading(true);
    try {
      const result = await fetchUsers(
        {
          userId,
          username,
          email,
          phone,
          address,
          birthDate,
          gender,
          isLocked,
        },
        token,
        searchValue,
        currentPage,
        itemsPerPage
      );
      setAllUsers(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(searchValue, currentPage, itemsPerPage);
  }, [success, searchValue, currentPage, itemsPerPage]);

  const getCountUsers = async () => {
    try {
      const count = await fetchUserCount(token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountUsers();
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, totalPages]);

  const isActivePage = (pageIndex: number) => {
    return pageIndex === currentPage;
  };
  return (
    <div className="relative flex flex-col h-full">
      <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between w-[60%]">
          <h1 className="text-left text-lg font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            User
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
              placeholder="Search User"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[50px] grid grid-cols-12 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">Username</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2">Address</div>
        <div className="col-span-2">BirthDate</div>
        <div className="col-span-1">Gender</div>
        <div className="col-span-1">Account Locked?</div>
      </div>
      <div className="flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allUsers.length > 0 ? (
            allUsers.map((User: UserProps, index) => (
              <div
                key={index}
                className="h-[50px] grid grid-cols-12 items-center text-sm font-medium text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.username}
                </div>
                <div className="h-full flex items-center border-b  col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.email}
                </div>
                <div className="h-full flex items-center border-b  col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.phone}
                </div>
                <div className="h-full flex items-center border-b  col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.address}
                </div>
                <div className="h-full flex items-center border-b  col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.birthDate}
                </div>
                <div className="h-full flex items-center border-b  col-span-1 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.gender ? "Male" : "Female"}
                </div>
                <div className="h-full flex items-center border-b  col-span-1 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.isLocked && "&checkmark"}
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
    </div>
  );
};

export default User;
