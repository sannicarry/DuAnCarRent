"use client";

import "../../globals.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/src/components/Store";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    login,
    setLogin,
    loading,
    setLoading,
    hrefAfterLogin,
  } = useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5290/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("token", data.token);
        setLogin(true);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          router.push(hrefAfterLogin, { scroll: false });
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="content relative flex justify-center items-center">
      <div className="fixed top-0 z-10 h-full w-full flex justify-center items-center">
        <div className="relative flex gap-5 flex-col justify-center lg:px-8 h-[95%] w-[80%] sm:w-[50%] bg-white rounded-md border-2 border-gray-300">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[100px] mb-[38px]">
            <Image
              src="/Hero1.svg"
              alt="Car rent"
              className="mx-auto h-10 w-auto"
              width={40}
              height={40}
            ></Image>
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div
                  className={`text-red-700 font-normal text-sm h-[20px] mt-2 ${
                    error ? "block opacity-100" : "opacity-0"
                  }`}
                >
                  {error}
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="mb-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Don’t have an account yet?
              <Link
                href="/pages/register"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
              >
                Sign up
              </Link>
            </p>
          </div>

          <Link href="/pages/home">
            <button className="absolute top-4 right-4 rounded-full bg-gray-300 hover:bg-gray-400 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>

          {loading && login && (
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
        </div>
      </div>
    </div>
  );
};

export default page;
