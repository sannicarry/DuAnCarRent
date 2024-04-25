"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useStore } from "./Store";
import Link from "next/link";

const Sidebar = () => {
  const { currentPageAdmin, setCurrentPageAdmin } = useStore();
  const [pageActive, setPageActive] = useState("");

  useEffect(() => {
    if (currentPageAdmin) {
      setPageActive(currentPageAdmin);
    }
  }, [currentPageAdmin]);

  return (
    <div className="col-span-1 bg-[#F6F7F9] py-4 flex flex-col gap-5">
      <div className="flex flex-col">
        <span className="text-[082431] font-medium text-base opacity-50 px-6">
          MENU
        </span>
        <Link href="/Dashboard">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Dashboard` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Dashboard.svg"
              alt="Dashboard"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Dashboard
            </span>
          </div>
        </Link>
        <Link href="/Brand">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Brand` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Brand.svg"
              alt="Brand"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Brand
            </span>
          </div>
        </Link>

        <Link href="/Car">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Car` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Car.svg"
              alt="Car"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Car
            </span>
          </div>
        </Link>

        <Link href="/User">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `User` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/User.svg"
              alt="User"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              User
            </span>
          </div>
        </Link>

        <Link href="/Order">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Order` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Cart.svg"
              alt="Cart"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Order
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col">
        <span className="text-[082431] font-medium text-base opacity-50 px-6">
          OTHERS
        </span>

        <Link href="/Settings">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Settings` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Setting.svg"
              alt="Setting"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Settings
            </span>
          </div>
        </Link>

        <Link href="/Payment">
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Payment` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Payment.svg"
              alt="Payment"
              width={20}
              height={20}
              className=""
            />
            <span className="text-[082431] font-semibold text-base opacity-60">
              Payment
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
