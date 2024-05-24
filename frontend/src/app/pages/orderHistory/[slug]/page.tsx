"use client";
import { useStore } from "@/components/Store";
import { fetchOrderByOrderId } from "@/utils";
import OrderDetail from "@/views/orders/OrderDetail";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [orderId, setOrderId] = useState(0);
  const { order, setOrder, token } = useStore();

  const searchParams = useSearchParams();

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      setOrderId(parseInt(orderId));
    }
  }, [searchParams]);

  useEffect(() => {
    const order = async () => {
      if (orderId != 0 && token != "") {
        const result = await fetchOrderByOrderId(orderId, token);
        if (result) {
          setOrder(result);
        }
      }
    };
    order();
  }, [orderId, token]);
  const { currentPageSideUser, setCurrentPageSideUser } = useStore();

  return (
    <div className="p-6 flex flex-col gap-8">
      <div className="flex items-center justify-center">
        <h1 className="text-gray-700 font-bold">Order Detail</h1>
      </div>
      {Object.keys(order).length > 0 && <OrderDetail order={order} />}
    </div>
  );
};

export default page;
