"use client";
import { useStore } from "@/components/Store";
import { OrderProps } from "@/types";
import { fetchOrderByUserId, fetchOrderCountByUser } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdReviews } from "react-icons/md";
const OrderHistory = () => {
  const {
    user,
    setUser,
    success,
    token,
    searchValue,
    setSearchValue,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
  } = useStore();
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const fetchOrder = async () => {
    if (user.userId != "" && token != "") {
      try {
        const res = await fetchOrderByUserId(
          user.userId,
          searchValue,
          currentPage,
          itemsPerPage,
          token
        );
        if (res) {
          setOrders(res);
        } else {
          console.error("Fetch order failed");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [user, success, searchValue, currentPage]);

  const getCountOrder = async () => {
    if (Object.keys(user).length > 0) {
      try {
        const count = await fetchOrderCountByUser(
          user.userId,
          searchValue,
          token
        );
        console.log("count = ", count);
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getCountOrder();
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [user, success, searchValue, totalPages]);

  console.log("totalPages = ", totalPages);

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
    <>
      <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center justify-between w-[60%]">
          <h1 className="text-left text-lg font-bold text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            Order
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
              placeholder="Search Order"
              value={searchTerm}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
      {orders.length > 0 ? (
        <>
          <div className="p-6 grid grid-cols-6 gap-4 pb-4 border-b border-b-gray-300">
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">Car Rented</h1>
            </div>
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">Location From</h1>
            </div>
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">Location To</h1>
            </div>
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">Status</h1>
            </div>
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">Total Price</h1>
            </div>
            <div className="col-span-1 flex items-center">
              <h1 className="text-gray-600 font-bold">View More</h1>
            </div>
          </div>
          <div className="min-h-[450px] flex flex-col justify-between gap-4 border rounded-md bg-slate-100 p-6 pb-0">
            <div className="flex flex-col gap-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 pb-4 border-b border-b-gray-300"
                >
                  <div className="col-span-1 flex items-center">
                    <h1 className="text-gray-600 font-bold">
                      {order.car.make} {order.car.model}
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <h1 className="text-gray-600 font-bold">
                      {order.locationFrom}
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <h1 className="text-gray-600 font-bold">
                      {order.locationTo}
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <h1 className="text-gray-600 font-bold">
                      {order.statusOrder == 1 && <>Pending</>}
                      {order.statusOrder == 2 && <>Approved</>}
                      {order.statusOrder == 3 && <>Rejected</>}
                      {order.statusOrder == 4 && <>Finish</>}
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <h1 className="text-gray-600 font-bold">
                      {order.payment.totalPrice}
                    </h1>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <Link
                      href={{
                        pathname: `/pages/orderHistory/view`,
                        query: { orderId: order.orderId },
                      }}
                      className="hover:cursor-pointer hover:opacity-75 bg-slate-200"
                    >
                      <MdReviews className="h-8 w-8" />
                    </Link>
                  </div>
                </div>
              ))}
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
          </div>
        </>
      ) : (
        <div className="flex items-center p-4 text-gray-700 font-bold">
          No Oop Result !
        </div>
      )}
    </>
  );
};

export default OrderHistory;
