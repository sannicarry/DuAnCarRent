"use client";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "./Store";
import { useClickOutside } from "@/utils";
import { useRef } from "react";

const Login = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    login,
    setLogin,
    showLoginForm,
    setShowLoginForm,
    showSignUpForm,
    setShowSignUpForm,
  } = useStore();

  const formRef = useRef<HTMLDivElement | null>(null);

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
        setShowLoginForm(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  useClickOutside(formRef, () => setShowLoginForm(false));

  const handleSignUpClick = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  };

  return (
    <>
      {showLoginForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
            className="flex gap-5 flex-col justify-center px-6 py-12 lg:px-8 absolute h-[95%] w-[80%] sm:w-[50%] bg-white rounded-md border-2 border-gray-300"
            ref={formRef}
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[100px] mb-[38px]">
              <Image
                src="Hero1.svg"
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
                  href=""
                  onClick={handleSignUpClick}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <button
              className="absolute top-4 right-4 rounded-full bg-gray-300 hover:bg-gray-400 p-2"
              onClick={() => {
                setShowLoginForm(false);
              }}
            >
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
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
