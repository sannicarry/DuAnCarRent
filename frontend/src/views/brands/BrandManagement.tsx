"use client";

import { useEffect, useState } from "react";
import { fetchCheckBrandExistsFromCars, fetchDeleteBrand } from "@/src/utils";
import { BrandProps } from "@/src/types";
import Image from "next/image";
import { useStore } from "@/src/components/Store";
import { CustomButton } from "@/src/components";
import Link from "next/link";

interface BrandManagementProps {
  allBrands: BrandProps[];
  currentPage: number;
}

const BrandManagement = ({ allBrands, currentPage }: BrandManagementProps) => {
  const [checkingExists, setCheckingExists] = useState(false);

  const [idOptions, setIdOptions] = useState(0);

  const {
    setSuccess,
    showOptions,
    setShowOptions,
    searchValue,
    setSearchValue,
    setCurrentPage,
    totalPages,
    token,
    confirmDelete,
    setConfirmDelete,
    exists,
    setExists,
    loading,
  } = useStore();

  const [brandModel, setBrandModel] = useState<BrandProps>({
    brandId: 0,
    brandName: "",
    address: "",
    phone: "",
  });

  const handleCheckBrandFromCars = async (id: number) => {
    const result = await fetchCheckBrandExistsFromCars(id);
    setExists(result);
    setCheckingExists(true);
  };

  const handleDelete = async (id: number) => {
    fetchDeleteBrand(id, token);
    setSuccess(true);
    setConfirmDelete(false);
  };

  const isActivePage = (pageIndex: number) => {
    return pageIndex === currentPage;
  };

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between w-[60%]">
          <h1 className="text-left text-lg font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            BRAND
          </h1>
          <div className="flex w-[80%] h-[40px] bg-white border-2 focus-within:border-blue-500 rounded-lg sm:rounded-3xl px-3">
            <Image
              src="/search.svg"
              alt="search"
              height={20}
              width={20}
              className="mx-3 object-contain"
            ></Image>
            <input
              type="text"
              className="border-none w-[100%] focus:outline-none truncate"
              placeholder="Search BrandName"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <Link
          href={{
            pathname: `/pages/brand/CreateUpdateBrand/view`,
            query: { brandId: brandModel.brandId },
          }}
        >
          <CustomButton
            title="Add New Brand"
            btnType="button"
            containerStyles="text-white text-white rounded-full bg-primary-blue bg-primary-blue min-w-[130px]"
          />
        </Link>
      </div>
      <div className="h-[50px] grid grid-cols-7 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">Brand Name</div>
        <div className="col-span-2 px-6">Address</div>
        <div className="col-span-2 px-6 text-center">Phone</div>
        <div className="col-span-1 px-6 text-center">Options</div>
      </div>
      <div className="relative flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allBrands.length > 0 ? (
            allBrands.map((brand: BrandProps, index) => (
              <div
                key={index}
                className="h-[50px] grid grid-cols-7 items-center text-sm font-medium text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                  {brand.brandName}
                </div>
                <div className="h-full flex items-center border-b  px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {brand.address}
                </div>
                <div className="h-full flex justify-center items-center border-b  px-6 col-span-2">
                  {brand.phone}
                </div>
                <div className="h-full relative flex justify-center items-center border-b  px-6 col-span-1">
                  <button
                    className="w-[50%] h-full flex justify-center items-center rounded-md hover:bg-slate-300"
                    onClick={() => {
                      if (idOptions === brand.brandId) {
                        setShowOptions(false);
                        setIdOptions(0);
                        setConfirmDelete(false);
                        setCheckingExists(false);
                      } else {
                        setShowOptions(true);
                        setIdOptions(brand.brandId);
                      }
                    }}
                  >
                    <Image
                      src="/Options.svg"
                      alt="Options"
                      width={8}
                      height={8}
                      className=""
                    />
                  </button>
                  {showOptions && idOptions === brand.brandId && (
                    <>
                      <div className="flex h-full gap-[2px] flex-col absolute top-0 left-[-14px]">
                        <Link
                          href={{
                            pathname: `/pages/brand/CreateUpdateBrand/view`,
                            query: { brandId: brand.brandId },
                          }}
                        >
                          <button className="w-full h-full border border-slate-600 bg-yellow-600 hover:bg-yellow-400 rounded-md px-2 text-start text-white">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="w-full h-full border border-slate-600 bg-red-600 hover:bg-red-400 rounded-md px-2 text-start text-white"
                          onClick={() => {
                            setShowOptions(false);
                            handleCheckBrandFromCars(brand.brandId);
                            setConfirmDelete(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                  {idOptions === brand.brandId &&
                    checkingExists &&
                    confirmDelete && (
                      <>
                        {exists == false ? (
                          <div className="z-10 absolute rounded-md h-[120px] w-[214px] p-3 bg-slate-400 flex flex-col gap-4 top-[50px] right-0">
                            <h1 className="text-sm text-center font-semibold text-red-600 uppercase">
                              Do you want to delete this brand ?
                            </h1>
                            <div className="flex justify-between items-center">
                              <button
                                className="font-semibold border border-black rounded-md p-2 text-slate-100 bg-yellow-400 hover:bg-yellow-600"
                                onClick={() => {
                                  setConfirmDelete(false);
                                  setCheckingExists(false);
                                  setIdOptions(0);
                                }}
                              >
                                NO
                              </button>
                              <button
                                className="font-semibold border border-black rounded-md p-2 text-slate-100 bg-blue-400 hover:bg-blue-600"
                                onClick={() => {
                                  handleDelete(brand.brandId);
                                }}
                              >
                                YES
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="z-10 absolute rounded-md h-[140px] w-[214px] p-3 bg-slate-400 flex flex-col gap-4 top-[50px] right-0">
                            <h1 className="text-sm text-center font-semibold text-red-600 uppercase">
                              This brand is associated with some cars and cannot
                              be deleted !
                            </h1>
                            <div className="flex items-center">
                              <button
                                className="font-semibold w-full border border-black rounded-md p-2 text-slate-100 bg-yellow-400 hover:bg-yellow-600"
                                onClick={() => {
                                  setConfirmDelete(false);
                                  setCheckingExists(false);
                                  setExists(false);
                                  setIdOptions(0);
                                }}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
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
          <div className="absolute flex justify-center items-center top-[20%] right-[20%] h-1/2 w-1/2 opacity-60">
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

export default BrandManagement;
