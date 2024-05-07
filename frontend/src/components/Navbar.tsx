"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomButton } from ".";
import { useStore } from "./Store";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadPhoto, UserProps } from "@/types";
import { createUploadPhotoPromises, getPhotoUrl } from "@/utils";
import { SERVER_URL } from "@/constants";

const Navbar = () => {
  const router = useRouter();

  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    login,
    setLogin,
    logout,
    setLogout,
    token,
    setToken,
    userRole,
    setUserRole,
    showSettings,
    setShowSettings,
    user,
    setUser,
    loading,
    success,
    setSuccess,
  } = useStore();

  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [photoUser, setPhotoUser] = useState<UploadPhoto[]>([]);
  const [loadingFetchPhoto, setLoadingFetchPhoto] = useState(false);

  const handleLogout = () => {
    //Reset
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    setToken("");
    setLogin(false);
    setLogout(true);
    setSuccess(false);
    setUser({} as UserProps);
    setUserRole(null);
    setShowLogoutOption(false);
    setTimeout(() => {
      setLogout(false);
      router.push("/pages/home", { scroll: true });
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Lấy token từ localStorage
      const isLogged = localStorage.getItem("token");
      console.log("isLogged", isLogged);
      if (isLogged) {
        setToken(isLogged);
        setLogin(true);

        // Lấy thông tin user
        try {
          const response = await fetch(`${SERVER_URL}/api/user/currentUser`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${isLogged}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error("Failed to fetch user");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchData();
  }, [success]);

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user, login]);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (user && user?.userId !== undefined) {
        try {
          const baseURL = process.env.SERVER_URL;

          const uploadPromises = createUploadPhotoPromises(
            user?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotoUser(uploadedPhotos);
          setLoadingFetchPhoto(true);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };

    fetchPhoto();
  }, [user]);

  console.log("token = ", token);
  console.log("user = ", user);
  console.log("success = ", success);
  console.log("url = ", process.env.SERVER_URL);
  //localhost:5290

  http: return (
    <header className=" w-full z-10 fixed bg-white sm:px-16 p-6 border-b">
      <nav className="relative flex max-sm:flex-col sm:grid sm:grid-cols-5 max-sm:gap-5 h-full">
        <div className="sm:col-span-4 grid grid-cols-4 max-sm:gap-4 items-center w-full">
          <div className="col-span-1 flex items-center max-sm:w-full">
            <Link href="/pages/home" className="flex items-center">
              <Image
                src="/Logo.svg"
                alt="Logo"
                height={40}
                width={118}
                className="object-contain"
              />
            </Link>
          </div>
          <div className="col-span-3 flex border-2 focus-within:border-blue-500 rounded-lg sm:rounded-3xl w-full sm:w-[80%] h-[40px] px-3 sm:ml-16">
            <Image
              src="/search.svg"
              alt="search"
              height={20}
              width={20}
              className="mx-3 object-contain"
            ></Image>
            <input
              type="text"
              className="border-none w-[100%] focus:outline-none truncate"
              placeholder="Search something here"
            />
          </div>
        </div>
        <div className="sm:col-span-1 flex justify-center sm:justify-end items-end sm:items-center w-full">
          {login &&
            !loading &&
            Object.keys(user).length > 0 &&
            loadingFetchPhoto && (
              <div className="flex max-sm:justify-between h-full w-full">
                <div className="hidden sm:visible sm:flex sm:justify-end w-full">
                  {userRole === "User" && (
                    <div className="flex gap-2">
                      <Link href="/">
                        <div className="w-10 h-10 relative overflow-hidden">
                          <Image
                            src="/Like.svg"
                            alt="Like"
                            className="object-contain"
                            width={40}
                            height={40}
                          />
                        </div>
                      </Link>
                      <Link href="/">
                        <div className="w-10 h-10 relative overflow-hidden">
                          <Image
                            src="/Notification.svg"
                            alt="Notification"
                            className="object-contain"
                            width={40}
                            height={40}
                          />
                        </div>
                      </Link>
                      <button onClick={() => setShowSettings(!showSettings)}>
                        <div className="w-10 h-10 relative hover:bg-slate-400 rounded-full overflow-hidden">
                          <Image
                            src="/Settings.svg"
                            alt="Settings"
                            className="object-contain"
                            width={40}
                            height={40}
                          />
                        </div>
                      </button>
                      {showSettings && (
                        <>
                          <div
                            className="absolute top-[66px] right-0 flex flex-col bg-slate-200 rounded-md"
                            ref={formRef}
                          >
                            <Link
                              href="/pages/changePassword"
                              className="flex gap-4 items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-400 py-4 px-6"
                              onClick={() => setShowSettings(false)}
                            >
                              <Image
                                src="/key.svg"
                                alt="changePassword"
                                width={20}
                                height={20}
                                className=""
                              />
                              <span className="text-[082431] font-semibold text-base opacity-60">
                                Change Password
                              </span>
                            </Link>
                            <Link
                              href="/pages/editProfile"
                              className="flex gap-4 items-center cursor-pointer hover:text-[#0000FF] hover:bg-slate-400 py-4 px-6"
                              onClick={() => setShowSettings(false)}
                            >
                              <Image
                                src="/User.svg"
                                alt="Profile"
                                width={20}
                                height={20}
                                className=""
                              />
                              <span className="text-[082431] font-semibold text-base opacity-60">
                                Profile
                              </span>
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex sm:invisible">
                  <Image
                    src="/menu.svg"
                    alt="menu"
                    width={20}
                    height={20}
                    className="mb-2"
                  ></Image>
                </div>

                <div className="flex">
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowLogoutOption(!showLogoutOption)}
                  >
                    <div className="flex items-center w-10 h-10 relative hover:bg-slate-400 rounded-full overflow-hidden">
                      <Image
                        src={getPhotoUrl(photoUser[0]) ?? "/Profil.svg"}
                        alt="LogoUser"
                        className="object-contain"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>
                  {showLogoutOption && (
                    <div className="absolute top-full right-0 bg-white border border-gray-200 shadow-lg mt-2 rounded-md">
                      <button
                        className="block w-full py-2 px-4 text-left text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          {!login && (
            <>
              <Link href="/pages/login">
                <CustomButton
                  title="Sign in"
                  btnType="button"
                  containerStyles="max-xl:text-white text-white rounded-full max-xl:bg-primary-blue bg-primary-blue min-w-[200px] sm:min-w-[130px]"
                ></CustomButton>
              </Link>
            </>
          )}
        </div>
        {logout && (
          <div className="fixed flex justify-center items-center bg-slate-600 top-0 right-0 h-full w-full opacity-60">
            <Image
              src="/loader.svg"
              alt="loading"
              width={500}
              height={500}
              className="animate-spin mt-10"
            ></Image>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navbar);
