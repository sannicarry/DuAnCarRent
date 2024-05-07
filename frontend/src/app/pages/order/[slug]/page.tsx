"use client";

import { useStore } from "@/components/Store";
import OrderView from "@/views/orders/OrderView";
import { fetchOrderByOrderId } from "@/utils";
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
      const result = await fetchOrderByOrderId(orderId, token);
      if (result) {
        setOrder(result);
      }
    };
    order();
  }, [orderId, token]);

  return <OrderView order={order} />;
};

export default page;
