"use client";

import { useStore } from "@/components/Store";
import { OrderProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants";
import { toast } from "react-toastify";
import { FaBan } from "react-icons/fa";
import OrderDetail from "./OrderDetail";

const OrderView = ({ order }: { order: OrderProps }) => {
  const router = useRouter();

  const {
    setError,
    token,
    showOptions,
    setShowOptions,
    approve,
    reject,
    finish,
    setSuccess,
    confirmDelete,
    setConfirmDelete,
    user,
  } = useStore();

  const handleOrderHandling = async (
    statusOrder: number,
    statusPayment: number
  ) => {
    try {
      const url = `${SERVER_URL}/api/order/UpdateStatus/${order.orderId}?statusOrder=${statusOrder}&statusPayment=${statusPayment}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setShowOptions(false);
        setSuccess(true);
        toast.success("Order status updated Successfully!", {
          onClose: () => {
            router.push("/pages/order", { scroll: false });
          },
        });
      } else {
        setError("error update order");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const url = `${SERVER_URL}/api/order/${order.orderId}`;
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
      toast.success("Deleted Order Successfully!", {
        onClose: () => {
          router.push("/pages/order", { scroll: false });
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-700">Order Management</h1>
        <div className="relative flex gap-1 justify-end">
          <div
            className="relative flex gap-2 items-center justify-between p-3 bg-gray-100 hover:bg-gray-300 hover:cursor-pointer border-slate-700 border rounded-md"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            <span className="text-base text-gray-700 font-medium">
              Order Handling
            </span>
            <Image
              src="/CaretDown.svg"
              alt="more"
              width={10}
              height={10}
            ></Image>
            {showOptions && (
              <div className="absolute w-full flex flex-col top-[50px] right-0 bg-slate-200">
                <button
                  className={`${
                    order.statusOrder !== 1
                      ? "relative opacity-70"
                      : "cursor-pointer hover:text-[#0000FF] hover:bg-slate-400"
                  } font-semibold rounded-sm ${
                    order.statusOrder == 2
                      ? "text-[#0000FF] bg-slate-400"
                      : "text-[082431] bg-slate-200"
                  } p-4`}
                  onClick={() => {
                    handleOrderHandling(approve, order.statusPayment);
                  }}
                  disabled={order.statusOrder !== 1}
                >
                  Approve
                  {order.statusOrder !== 1 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <FaBan className="text-red-600 h-8 w-8" />
                    </div>
                  )}
                </button>
                <button
                  className={`${
                    order.statusOrder === 4 || order.statusOrder === 3
                      ? "relative opacity-70"
                      : "cursor-pointer hover:text-[#0000FF] hover:bg-slate-400"
                  } font-semibold rounded-sm ${
                    order.statusOrder == 3
                      ? "text-[#0000FF] bg-slate-400"
                      : "text-[082431] bg-slate-200"
                  } p-4`}
                  onClick={() => {
                    handleOrderHandling(reject, order.statusPayment);
                  }}
                  disabled={order.statusOrder === 4 || order.statusOrder === 3}
                >
                  Reject
                  {(order.statusOrder === 4 || order.statusOrder === 3) && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <FaBan className="text-red-600 h-8 w-8" />
                    </div>
                  )}
                </button>
                <button
                  className={`${
                    order.statusOrder !== 2
                      ? "relative opacity-70"
                      : "cursor-pointer hover:text-[#0000FF] hover:bg-slate-400"
                  } font-semibold rounded-sm ${
                    order.statusOrder == 4
                      ? "text-[#0000FF] bg-slate-400"
                      : "text-[082431] bg-slate-200"
                  } p-4`}
                  onClick={() => {
                    handleOrderHandling(finish, 1);
                  }}
                  disabled={order.statusOrder !== 2}
                >
                  Finish
                  {order.statusOrder !== 2 && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <FaBan className="text-red-600 h-8 w-8" />
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>

          {order.statusOrder === 3 && (
            <div
              className="relative flex gap-2 items-center justify-between px-2 hover:bg-red-600 hover:cursor-pointer bg-red-500 border-slate-800 border rounded-md"
              onClick={() => {
                setConfirmDelete(!confirmDelete);
              }}
            >
              <span className="text-base text-white font-medium">
                Order Delete
              </span>
              <Image
                src="/remove.svg"
                alt="more"
                width={10}
                height={10}
              ></Image>
              {confirmDelete && (
                <div className="absolute rounded-md h-[120px] w-[214px] p-3 bg-slate-100 flex flex-col gap-4 top-[50px] right-0">
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
            </div>
          )}

          <Link href="/pages/order" className="flex items-center ">
            <button className="w-[80px] h-full px-2 text-base text-white font-medium border border-slate-800 rounded-md bg-blue-500 hover:bg-white hover:text-blue-500">
              Back
            </button>
          </Link>
        </div>
      </div>
      <OrderDetail order={order} />
    </div>
  );
};

export default OrderView;
