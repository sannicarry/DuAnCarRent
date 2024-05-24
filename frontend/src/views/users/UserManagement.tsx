"use client";

import { useEffect, useState } from "react";
import { fetchUserCount, fetchUsers } from "@/utils";
import { PhotoProps, UserProps } from "@/types";
import Image from "next/image";
import { useStore } from "@/components/Store";

interface UserManagementProps {
  allUsers: UserProps[];
  currentPage: number;
}

const UserManagement = ({ allUsers, currentPage }: UserManagementProps) => {
  const { searchValue, setSearchValue, setCurrentPage, totalPages, loading } =
    useStore();

  const [searchTerm, setSearchTerm] = useState("");

  const isActivePage = (pageIndex: number) => {
    return pageIndex === currentPage;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchValue(searchTerm);
    }
  };

  const handleSearchClick = () => {
    setSearchValue(searchTerm);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between w-[60%]">
          <h1 className="text-left text-lg font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            User
          </h1>
          <div className="flex w-[80%] h-[40px] bg-white border-2 focus-within:border-blue-500 rounded-lg sm:rounded-3xl px-3">
            <Image
              src="/search.svg"
              alt="search"
              height={20}
              width={20}
              className="mx-3 object-contain hover:cursor-pointer"
              onClick={handleSearchClick}
            ></Image>
            <input
              type="text"
              className="border-none w-[100%] focus:outline-none truncate"
              placeholder="Search User"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      <div className="h-[50px] grid grid-cols-12 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">FullName</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-2">Phone</div>
        <div className="col-span-2">Address</div>
        <div className="col-span-2">BirthDate</div>
        <div className="col-span-1">Gender</div>
        <div className="col-span-1">Account Locked?</div>
      </div>
      <div className="relative flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allUsers.length > 0 ? (
            allUsers.map((User: UserProps, index) => (
              <div
                key={index}
                className="h-[50px] grid grid-cols-12 items-center text-sm font-medium text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.firstName} {User.lastName}
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
                <div className="h-full flex items-center justify-center border-b  col-span-1 font-medium text-gray-900 whitespace-normal dark:text-white">
                  {User.isLocked && "✓"}
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
                src="/AngleLeft.svg"
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
                src="/AngleRight.svg"
                alt="next"
                width={20}
                height={20}
              ></Image>
            </button>
          </div>
        </div>
        {loading && (
          <div className="absolute flex justify-center items-center top-[50%] right-[50%] h-10 w-10 opacity-60">
            <Image
              src="/loader.svg"
              alt="loading"
              width={500}
              height={500}
              className="animate-spin mt-10"
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
