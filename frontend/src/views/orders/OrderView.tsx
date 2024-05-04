"use client";

import "../../../app/globals.css";
import { useStore } from "@/src/components/Store";
import { OrderProps, UploadPhoto } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { createUploadPhotoPromises, getPhotoUrl } from "@/src/utils";

const OrderView = ({ order }: { order: OrderProps }) => {
  const router = useRouter();

  const {
    setError,
    token,
    showOptions,
    setShowOptions,
    approve,
    reject,
    setSuccess,
    confirmDelete,
    setConfirmDelete,
  } = useStore();

  const [photoCar, setPhotoCar] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (order.car && order.car?.carId !== undefined) {
        try {
          const baseURL = process.env.SERVER_URL || "http://localhost:5290";

          const uploadPromises = createUploadPhotoPromises(
            order.car?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotoCar(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };
    fetchPhotos();
  }, [order.car]);

  const handleOrderHandling = async (status: number) => {
    try {
      const url = `http://localhost:5290/api/order/UpdateStatus/${order.orderId}?status=${status}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setShowOptions(false);
        alert("success");
        router.push("/pages/order", { scroll: false });
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const url = `http://localhost:5290/api/order/${order.orderId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Error deleting photo");
      }
      setSuccess(true);
      setConfirmDelete(false);
      alert("success");
      router.push("/pages/order", { scroll: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-lg font-bold text-slate-700">Order Management</h1>
      <div className="flex flex-col p-6 gap-2 bg-slate-300 rounded-lg">
        <div className="relative flex gap-1 justify-end">
          <div
            className="flex gap-2 items-center justify-between px-2 hover:bg-blue-400 hover:cursor-pointer bg-blue-600 border-slate-800 border rounded-md"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            <span className="text-base text-white font-medium">
              Order Handling
            </span>
            <Image
              src="/CaretDown.svg"
              alt="more"
              width={10}
              height={10}
            ></Image>
          </div>

          {showOptions && (
            <div className="absolute w-[148px] flex flex-col top-[26px] right-[218px]">
              <button
                className="font-semibold border border-black rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => {
                  handleOrderHandling(approve);
                }}
              >
                Approve
              </button>
              <button
                className="font-semibold border border-black rounded-sm bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-slate-100"
                onClick={() => {
                  handleOrderHandling(reject);
                }}
              >
                Reject
              </button>
            </div>
          )}
          <div
            className="flex gap-2 items-center justify-between px-2 hover:bg-red-400 hover:cursor-pointer bg-red-600 border-slate-800 border rounded-md"
            onClick={() => {
              setConfirmDelete(!confirmDelete);
            }}
          >
            <span className="text-base text-white font-medium">
              Order Delete
            </span>
            <Image src="/remove.svg" alt="more" width={10} height={10}></Image>
          </div>

          {confirmDelete && (
            <div className="absolute rounded-md h-[120px] w-[214px] p-3 bg-slate-100 flex flex-col gap-4 top-[30px] right-0">
              <h1 className="text-sm text-center font-semibold text-red-600 uppercase">
                Do you want to delete this order ?
              </h1>
              <div className="flex justify-between items-center">
                <button
                  className="font-semibold border border-black rounded-md p-2 text-slate-100 bg-yellow-400 hover:bg-yellow-600"
                  onClick={() => {
                    setConfirmDelete(false);
                  }}
                >
                  NO
                </button>
                <button
                  className="font-semibold border border-black rounded-md p-2 text-slate-100 bg-blue-400 hover:bg-blue-600"
                  onClick={() => {
                    handleDeleteOrder();
                  }}
                >
                  YES
                </button>
              </div>
            </div>
          )}
          <Link href="/pages/order" className="flex items-center ">
            <button className="w-[80px] h-full px-2 text-base text-white font-medium border border-slate-800 rounded-md bg-blue-500 hover:bg-white hover:text-blue-500">
              Back
            </button>
          </Link>
        </div>

        <div className="grid gap-8 text-slate-700 text-base">
          <div className="grid grid-cols-3 items-center">
            <span className="col-span-1 font-medium">Customer Name:</span>
            <h3 className="col-span-1 font-semibold">{order.user?.username}</h3>
          </div>
          <div className="grid grid-cols-3  items-center ">
            <span className="col-span-1 font-medium ">Phone:</span>
            <h3 className="col-span-1 font-semibold">{order.user?.phone}</h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Email:</span>
            <h3 className="col-span-1 font-semibold">{order.user?.email}</h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Car Rented:</span>
            <h3 className="col-span-1 font-semibold">
              {order.car?.make} {order.car?.model}
            </h3>
            <Image
              src={getPhotoUrl(photoCar[0]) ?? "/loader.svg"}
              alt={`Photo Car`}
              width={160}
              height={160}
              className="col-span-1 object-cover border-gray-400"
            ></Image>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Location From:</span>
            <h3 className="col-span-1 font-semibold">{order.locationFrom}</h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Date From:</span>
            <h3 className="col-span-1 font-semibold">
              {order.dateFrom
                ? format(new Date(order.dateFrom), "yyyy-MM-dd")
                : ""}
            </h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Time From:</span>
            <h3 className="col-span-1 font-semibold">{order.timeFrom}</h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Location To:</span>
            <h3 className="col-span-1 font-semibold">{order.locationTo}</h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Date To:</span>
            <h3 className="col-span-1 font-semibold">
              {order.dateTo ? format(new Date(order.dateTo), "yyyy-MM-dd") : ""}
            </h3>
          </div>
          <div className="grid grid-cols-3  items-center">
            <span className="col-span-1 font-medium ">Time To:</span>
            <h3 className="col-span-1 font-semibold">{order.timeTo}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
