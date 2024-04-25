"use client";

import { useEffect, useState } from "react";
import {
  fetchBrandCount,
  fetchBrands,
  fetchCarCount,
  fetchCars,
  fetchDeleteBrand,
  fetchDeleteCar,
  fetchDeleteOrder,
  fetchOrderCount,
  fetchOrders,
} from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/Store";
import { OrderProps } from "@/types";

const page = () => {
  const [allOrders, setAllOrders] = useState([]);

  const [orderId, setOrderId] = useState(0);

  const {
    user,
    car,
    locationFrom,
    dateFrom,
    timeFrom,
    locationTo,
    dateTo,
    timeTo,
    totalPrice,
    status,
    searchValue,
    setSearchValue,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    loading,
    setLoading,
    success,
    setSuccess,
    showViewOrder,
    setShowViewOrder,
    setCurrentPageAdmin,
  } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("Order");
  }, []);

  const getOrders = async (searchValue?: string, currentPage?: number) => {
    setLoading(true);
    try {
      const result = await fetchOrders(
        {
          orderId,
          user,
          car,
          locationFrom,
          dateFrom,
          timeFrom,
          locationTo,
          dateTo,
          timeTo,
          totalPrice,
          status,
        },
        token,
        currentPage,
        itemsPerPage,
        searchValue
      );
      setAllOrders(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders(searchValue, currentPage);
  }, [success, searchValue, currentPage]);

  const getCountOrder = async () => {
    try {
      const count = await fetchOrderCount(token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountOrder();
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
            Order
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
              placeholder="Search Order"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[50px] grid grid-cols-11 border-b py-2 items-center text-sm font-medium text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <div className="col-span-2 px-6">Customer Name</div>
        <div className="col-span-2 px-6">Phone</div>
        <div className="col-span-2 px-6">Email</div>
        <div className="col-span-2 px-6">Car Rented</div>
        <div className="col-span-2 px-6 text-center">Status</div>
        <div className="col-span-1 px-6">VIEW MORE</div>
      </div>
      <div className="flex flex-col justify-between h-[434px]">
        <div className="h-[400px]">
          {allOrders && allOrders.length > 0 ? (
            allOrders.map((order: OrderProps, index) => (
              <div
                key={index}
                className="h-[50px] grid grid-cols-11 items-center text-sm font-medium text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.user.username}
                </div>
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.user.phone}
                </div>
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {order.user.email}
                </div>
                <div className="h-full flex items-center border-b px-6 col-span-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {`${order.car.make} ${order.car.model}`}
                </div>

                <div className="h-full text-center flex justify-center items-center border-b px-6 col-span-2 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                  {order.status == 0 && <>Pending approval</>}
                  {order.status == 1 && <>Approved</>}
                  {order.status == 2 && <>Rejected</>}
                </div>
                <div className="h-full flex justify-center items-center border-b  px-6 col-span-1">
                  <Link
                    href={{
                      pathname: `/Order/View`,
                      query: { order: JSON.stringify(order) },
                    }}
                  >
                    <button className="w-full flex justify-center items-center rounded-md hover:bg-slate-300">
                      <Image
                        src="/ArrowRight.svg"
                        alt="view more"
                        width={20}
                        height={20}
                        className=""
                      />
                    </button>
                  </Link>
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

export default page;
