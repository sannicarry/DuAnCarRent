"use client";

import { useEffect, useState } from "react";
import { fetchBrandCount, fetchBrands, fetchDeleteBrand } from "@/utils";
import { BrandProps } from "@/types";
import { CustomButton, FormAddBrand } from ".";
import { useStore } from "./Store";
import Image from "next/image";

const Brand = () => {
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [brandId, setBrandId] = useState(0);

  const [idOptions, setIdOptions] = useState(0);

  const {
    showAddNewBrand,
    setShowAddNewBrand,
    success,
    setSuccess,
    showOptions,
    setShowOptions,
    searchValue,
    setSearchValue,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    brandName,
    setBrandName,
    address,
    setAddress,
    phone,
    setPhone,
  } = useStore();

  const getBrands = async (searchValue?: string, currentPage?: number) => {
    setLoading(true);
    try {
      const result = await fetchBrands(
        {
          brandId,
          brandName,
          address,
          phone,
        },
        token,
        searchValue,
        currentPage,
        itemsPerPage
      );
      setAllBrands(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrands(searchValue, currentPage);
  }, [success, searchValue, currentPage]);

  const getCountBrands = async () => {
    try {
      const count = await fetchBrandCount(token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountBrands();
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, totalPages]);

  const [brandModel, setBrandModel] = useState<BrandProps>({
    brandId: 0,
    brandName: "",
    address: "",
    phone: "",
  });

  const handleAddNewBrand = () => {
    setShowAddNewBrand(true);
    setBrandModel({
      brandId: 0,
      brandName: "",
      address: "",
      phone: "",
    });
  };

  const handleEdit = (brand: BrandProps) => {
    setShowAddNewBrand(true);
    setBrandModel({ ...brand });
    setShowOptions(false);
  };
  const handleDelete = (id: number) => {
    fetchDeleteBrand(id, token);
    setSuccess();
    setShowOptions(false);
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
              src="search.svg"
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
        <CustomButton
          title="Add New Brand"
          btnType="button"
          containerStyles="text-white text-white rounded-full bg-primary-blue bg-primary-blue min-w-[130px]"
          handleClick={() => {
            handleAddNewBrand();
          }}
        />
      </div>
      <div className="h-[50px] grid grid-cols-7 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">Brand Name</div>
        <div className="col-span-2 px-6">Address</div>
        <div className="col-span-2 px-6 text-center">Phone</div>
        <div className="col-span-1 px-6 text-center">Options</div>
      </div>
      <div className="flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allBrands.length > 0 ? (
            allBrands.map((brand: BrandProps, index) => (
              <div
                key={index}
                className="h-[50px] grid grid-cols-7 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
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
                      } else {
                        setShowOptions(true);
                        setIdOptions(brand.brandId);
                      }
                    }}
                  >
                    <Image
                      src="Options.svg"
                      alt="Options"
                      width={8}
                      height={8}
                      className=""
                    />
                  </button>
                  {showOptions && idOptions === brand.brandId && (
                    <>
                      <div className="flex h-full gap-[2px] flex-col absolute top-0 left-[-14px]">
                        <button
                          className="w-full h-full border border-slate-600 bg-yellow-600 hover:bg-yellow-400 rounded-md px-2 text-start text-white"
                          onClick={() => handleEdit(brand)}
                        >
                          Edit
                        </button>
                        <button
                          className="w-full h-full border border-slate-600 bg-red-600 hover:bg-red-400 rounded-md px-2 text-start text-white"
                          onClick={() => handleDelete(brand.brandId)}
                        >
                          Delete
                        </button>
                      </div>
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
      {showAddNewBrand && <FormAddBrand brand={brandModel} />}
    </div>
  );
};

export default Brand;
