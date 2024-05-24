"use client";
import { useStore } from "@/components/Store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { currentPageSideUser, setCurrentPageSideUser } = useStore();
  const [pageActive, setPageActive] = useState("");
  const [checkClickMenu, setCheckClickMenu] = useState(false);

  useEffect(() => {
    if (currentPageSideUser) {
      setPageActive(currentPageSideUser);
    }
  }, [currentPageSideUser]);

  const handleClickHistoryOrder = () => {
    setCurrentPageSideUser("OrderHistory");
  };

  const handleClickProfile = () => {
    setCurrentPageSideUser("Profile");
  };

  return (
    <div
      className={`${
        checkClickMenu ? "w-[10%]" : "w-[20%]"
      } bg-[#F6F7F9] py-4 flex flex-col gap-5`}
    >
      <div className={`flex flex-col ${checkClickMenu ? "items-center" : ""}`}>
        <div
          className="flex py-4 px-6 items-center hover:cursor-pointer hover:opacity-90 hover:text-[#0000FF] hover:bg-slate-200"
          onClick={() => {
            setCheckClickMenu(!checkClickMenu);
          }}
        >
          <div className="flex  gap-4">
            <Image src="/barMenu.svg" alt="menu" width={20} height={20}></Image>
            {!checkClickMenu && (
              <span className="text-[082431] font-semibold text-base opacity-60">
                MENU
              </span>
            )}
          </div>
        </div>
        <div className="" onClick={() => handleClickHistoryOrder()}>
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `HistoryOrder` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/Dashboard.svg"
              alt="Dashboard"
              width={20}
              height={20}
              className=""
            />
            {!checkClickMenu && (
              <span className="text-[082431] font-semibold text-base opacity-60">
                Order History
              </span>
            )}
          </div>
        </div>
        <div className="" onClick={() => handleClickProfile()}>
          <div
            className={`flex items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-200 ${
              pageActive == `Profile` ? `text-[#0000FF] bg-slate-200` : ``
            } gap-4 py-4 px-6`}
          >
            <Image
              src="/user.svg"
              alt="profile"
              width={20}
              height={20}
              className=""
            />
            {!checkClickMenu && (
              <span className="text-[082431] font-semibold text-base opacity-60">
                Profile
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
