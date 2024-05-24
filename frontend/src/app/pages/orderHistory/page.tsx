"use client";
import { useStore } from "@/components/Store";
import OrderHistory from "@/views/orders/OrderHistory";
import Profile from "@/views/profile/Profile";

const page = () => {
  const { currentPageSideUser, setCurrentPageSideUser } = useStore();

  console.log("currentPageSideUser = ", currentPageSideUser);

  return (
    <>
      {currentPageSideUser == "OrderHistory" ? <OrderHistory /> : <Profile />}
    </>
  );
};

export default page;
