"use client";

import { useStore } from "@/components/Store";
import MethodCash from "./MethodCash";
import MethodCard from "./MethodCard";
import { FaCheck } from "react-icons/fa6";
import { CustomButton } from "@/components";

const Payment = () => {
  const { methodPayment, setMethodPayment } = useStore();

  const tsxTick = () => {
    return (
      <div
        className="absolute top-[20px] right-0 
      border-l-[20px] border-l-transparent
      border-b-[20px] border-b-blue-500
      border-r-[0] border-r-transparent"
      >
        <FaCheck className="absolute w-3 h-3 top-[8px] right-0 text-white" />
      </div>
    );
  };

  const handleClickMethodPayment = (method: string) => {
    setMethodPayment(method);
  };
  return (
    <>
      <div className="flex items-center gap-4 p-8 border-b border-b-gray-300">
        <h1 className="text-gray-700 font-bold">Payment Method</h1>
        <div
          className={`relative border ${
            methodPayment == "card"
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-500"
          } hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 rounded-sm font-medium p-2`}
          onClick={() => {
            handleClickMethodPayment("card");
          }}
        >
          <span>Napas Domestic Card</span>
          {methodPayment == "card" && tsxTick()}
        </div>
        <div
          className={`relative border ${
            methodPayment == "pickup"
              ? "border-blue-500 text-blue-500"
              : "border-gray-300 text-gray-500"
          } hover:cursor-pointer hover:border-blue-500 hover:text-blue-500 rounded-sm font-medium p-2`}
          onClick={() => {
            handleClickMethodPayment("pickup");
          }}
        >
          <span>Payment on Car Pickup</span>
          {methodPayment == "pickup" && tsxTick()}
        </div>
      </div>
      {methodPayment == "pickup" && <MethodCash />}
      {methodPayment == "card" && <MethodCard />}
    </>
  );
};

export default Payment;
