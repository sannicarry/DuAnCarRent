"use client";

import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";
import Image from "next/image";

const MethodCash = () => {
  const { totalPrice, setTotalPrice, setMethodPayment } = useStore();
  const handleRemove = (event: React.FormEvent) => {
    event.preventDefault();
    setMethodPayment("card");
  };
  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      <div className="flex justify-end gap-8 border-b border-b-gray-300">
        <div className="flex flex-col gap-4 px-4 py-8 w-[20%]">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-500">Total Price</h3>
            <span className="font-medium text-gray-600">${totalPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-500">Total Payment</h3>
            <span className="font-medium text-gray-600">${totalPrice}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <div
          className="flex items-center gap-2 p-2 pr-0 hover:cursor-pointer hover:opacity-80"
          onClick={(e) => {
            handleRemove(e);
          }}
        >
          <Image src="/close.svg" alt="close" width={20} height={20}></Image>
          <span className="text-gray-500 font-normal">Cancel the Order</span>
        </div>
        <CustomButton
          title={`Rent Now`}
          textStyles={`font-bold text-lg`}
          containerStyles="text-white bg-blue-500 rounded-md  hover:opacity-80"
          btnType="submit"
        />
      </div>
    </div>
  );
};

export default MethodCash;
