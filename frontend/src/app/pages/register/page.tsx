"use client";
import Image from "next/image";
import { fetchCheckEmail, fetchCheckUsername, useClickOutside } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useStore } from "@/components/Store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SERVER_URL } from "@/constants";

const page = () => {
  const router = useRouter();

  const {
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    address,
    setAddress,
    gender,
    setGender,
    password,
    setPassword,
    error,
    setError,
    token,
    errorUsername,
    setErrorUsername,
    errorEmail,
    setErrorEmail,
    errorRegexEmail,
    setErrorRegexEmail,
    blurred,
    setBlurred,
    loading,
    setLoading,
    login,
  } = useStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (errorUsername || errorEmail) {
      return;
    }

    try {
      const matchResult = birthDate.match(
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/
      );
      if (!matchResult) {
        throw new Error(
          "Invalid birthDate format. Please enter DD/MM/YYYY or DD-MM-YYYY."
        );
      }

      const [, day, month, year] = matchResult;
      const isobirthDate = `${day}-${month}-${year}`;

      const response = await fetch(`${SERVER_URL}/api/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
          address,
          phone,
          birthDate: isobirthDate,
          gender,
        }),
      });
      if (response.ok) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          router.push("/pages/login");
        }, 2000);
      } else {
        setError("error register");
      }
    } catch (error) {
      alert(error);
    }
  };

  //Check username
  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const errUser = await fetchCheckUsername(username, token);
          setErrorUsername(errUser);
        } catch (error) {
          console.error("Error checking username:", error);
        }
      }
    };

    fetchData();
  }, [username]);
  //Check email
  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          setErrorRegexEmail(false);
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const isValidEmail = emailRegex.test(email);

          if (!isValidEmail) {
            setErrorRegexEmail(true);
            return;
          }

          const errEmail = await fetchCheckEmail(email, token);
          setErrorEmail(errEmail);
        } catch (error) {
          console.error("Error checking Email:", error);
        }
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="content relative flex justify-center items-center">
      <div className="fixed top-0 z-10 h-full w-full flex justify-center items-center">
        <div className="relative flex gap-5 flex-col justify-center lg:px-8 h-[95%] w-[80%] sm:w-[50%] bg-white rounded-md border-2 border-gray-300">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign up to account!
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    {errorUsername && (
                      <>
                        <span className="text-red-700 font-normal text-sm">
                          Username already exists!
                        </span>
                      </>
                    )}
                  </div>
                  <div className="">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="off"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      FirstName
                    </label>
                    <div className="">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="off"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        LastName
                      </label>
                    </div>
                    <div className="">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="off"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="off"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      {errorEmail && (
                        <>
                          <span className="text-red-700 font-normal text-sm">
                            Email already exists!
                          </span>
                        </>
                      )}
                      {errorRegexEmail && blurred && (
                        <>
                          <span className="text-red-700 font-normal text-sm">
                            Incorrect Email Format!
                          </span>
                        </>
                      )}
                    </div>
                    <div className="">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setBlurred(true)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="off"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="birthDate"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      BirthDate
                    </label>
                    <div className="">
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="text"
                        autoComplete="off"
                        required
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Address
                    </label>
                    <div className="">
                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="off"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span>Gender</span>
                  <div className="flex gap-2">
                    <div className="flex w-[30%] rounded-md justify-between border border-slate-300 px-2 py-1">
                      <label htmlFor="femaleGender">Female</label>
                      <input
                        id="femaleGender"
                        name="gender"
                        type="radio"
                        autoComplete="off"
                        required
                        checked={!gender}
                        onChange={() => setGender(false)}
                        className=""
                      />
                    </div>
                    <div className="flex w-[30%] rounded-md justify-between border border-slate-300 px-2 py-1">
                      <label htmlFor="maleGender">Male</label>
                      <input
                        id="maleGender"
                        name="gender"
                        type="radio"
                        autoComplete="off"
                        required
                        checked={gender}
                        onChange={() => setGender(true)}
                        className=""
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>

          <Link href="/Home">
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

          {loading && !login && (
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
