"use client";
import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CustomButton, Login, Register } from ".";
import { useStore } from "./Store";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, useClickOutside } from "@/utils";

const Navbar = () => {
  const router = useRouter();

  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    login,
    setLogin,
    showLoginForm,
    setShowLoginForm,
    showSignUpForm,
    setShowSignUpForm,
    token,
    setToken,
    userRole,
    setUserRole,
    showSettings,
    setShowSettings,
    userId,
    setUserId,
    user,
    setUser,
    username,
    setUsername,
    email,
    setEmail,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    isLocked,
    setIsLocked,
    address,
    setAddress,
    phone,
    setPhone,
    photos,
    setLoading,
    success,
  } = useStore();

  const [showLogoutOption, setShowLogoutOption] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    setToken("");
    setLogin(false);
    setUserRole(null);
    setShowLogoutOption(false);
    router.push("/", { scroll: true });
  };

  useEffect(() => {
    const isLogged = localStorage.getItem("token");
    if (isLogged) {
      setToken(isLogged);
    }
  }, [showLoginForm == false]);

  useEffect(() => {
    if (token) {
      setLogin(true);
      fetchUserRole();
    }
  }, [token]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch(
        "http://localhost:5290/api/account/getUserRole",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserRole(data.userRole);
      } else {
        console.error("Failed to fetch user role");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const result = await fetchUser(
        {
          userId,
          username,
          email,
          phone,
          address,
          birthDate,
          gender,
          isLocked,
          photos,
        },
        token
      );
      setUser(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token != "") {
      getUser();
    }
  }, [token, success]);

  useClickOutside(formRef, () => setShowSettings(false));

  return (
    <header className=" w-full fixed z-10 bg-white sm:px-16 p-6 border-b">
      <nav className="relative flex max-sm:flex-col sm:grid sm:grid-cols-5 max-sm:gap-5 h-full">
        <div className="sm:col-span-4 grid grid-cols-4 max-sm:gap-4 items-center w-full">
          <div className="col-span-1 flex items-center max-sm:w-full">
            <Link href="/" className="flex items-center">
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
          {login && (
            <div className="flex max-sm:justify-between h-full w-full">
              <div className="hidden sm:visible sm:flex sm:justify-end w-full">
                {userRole === "User" && (
                  <>
                    <Link href="/">
                      <Image
                        src="/Like.svg"
                        alt="Like"
                        className="mx-2"
                        height={40}
                        width={40}
                      ></Image>
                    </Link>
                    <Link href="/">
                      <Image
                        src="/Notification.svg"
                        alt="Notification"
                        className="mx-2"
                        height={40}
                        width={40}
                      ></Image>
                    </Link>
                    <button onClick={() => setShowSettings(!showSettings)}>
                      <Image
                        src="/Settings.svg"
                        alt="Settings"
                        className="mx-2 hover:bg-slate-400 rounded-full"
                        height={40}
                        width={40}
                      ></Image>
                    </button>
                    {showSettings && (
                      <>
                        <div
                          className="absolute top-[66px] right-0 flex flex-col bg-slate-200 rounded-md"
                          ref={formRef}
                        >
                          <Link
                            href="/ChangePassword"
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
                            href="/EditProfile"
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
                  </>
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
                  <Image
                    src="/Profil.svg"
                    alt="LogoUser"
                    className="sm:mx-2 object-contain"
                    height={40}
                    width={40}
                  />
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
            <div className="">
              <CustomButton
                title="Sign in"
                btnType="button"
                containerStyles="max-xl:text-white text-white rounded-full max-xl:bg-primary-blue bg-primary-blue min-w-[200px] sm:min-w-[130px]"
                handleClick={() => {
                  setShowLoginForm(true);
                }}
              />
            </div>
          )}
          {showLoginForm && <Login />}
          {showSignUpForm && <Register />}
        </div>
      </nav>
    </header>
  );
};

export default memo(Navbar);
