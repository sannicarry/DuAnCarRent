"use client";

import Image from "next/image";
import {
  Brand,
  Car,
  Dashboard,
  Order,
  PaymentManager,
  Settings,
  User,
} from ".";
import { useState } from "react";

const Sidebar = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const isActive = (pageName: string) => {
    return currentPage === pageName ? "text-[#0000FF] bg-slate-200" : "";
  };

  return (
    <>
      <div className="grid grid-cols-5">
        <div className="col-span-1 bg-[#F6F7F9] py-4 flex flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-[082431] font-medium text-base opacity-50 px-6">
              MENU
            </span>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Dashboard"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Dashboard")}
            >
              <Image
                src="Dashboard.svg"
                alt="Dashboard"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Dashboard
              </span>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Brand"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Brand")}
            >
              <Image
                src="Brand.svg"
                alt="Brand"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Brand
              </span>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Car"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Car")}
            >
              <Image
                src="Car.svg"
                alt="Car"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Car
              </span>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "User"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("User")}
            >
              <Image
                src="User.svg"
                alt="User"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                User
              </span>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Order"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Order")}
            >
              <Image
                src="Cart.svg"
                alt="Cart"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Order
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[082431] font-medium text-base opacity-50 px-6">
              OTHERS
            </span>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Settings"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Settings")}
            >
              <Image
                src="Setting.svg"
                alt="Setting"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Settings
              </span>
            </div>
            <div
              className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${isActive(
                "Payment"
              )} gap-4 py-4 px-6`}
              onClick={() => setCurrentPage("Payment")}
            >
              <Image
                src="Payment.svg"
                alt="Payment"
                width={20}
                height={20}
                className=""
              />
              <span className="text-[082431] font-semibold text-base opacity-60">
                Payment
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-white ml-16 border-2 rounded-md">
          {currentPage === "Dashboard" && <Dashboard />}
          {currentPage === "Brand" && <Brand />}
          {currentPage === "Car" && <Car />}
          {currentPage === "User" && <User />}
          {currentPage === "Order" && <Order />}
          {currentPage === "Settings" && <Settings />}
          {currentPage === "Payment" && <PaymentManager />}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
