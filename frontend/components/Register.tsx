"use client";
import Image from "next/image";
import { useStore } from "./Store";
import { fetchCheckEmail, fetchCheckUsername, useClickOutside } from "@/utils";
import { Login } from ".";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

const Register = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    phone,
    setPhone,
    birthday,
    setBirthday,
    address,
    setAddress,
    gender,
    setGender,
    password,
    setPassword,
    error,
    setError,
    showLoginForm,
    showSignUpForm,
    setShowSignUpForm,
  } = useStore();

  const formRef = useRef<HTMLDivElement | null>(null);

  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorRegexEmail, setErrorRegexEmail] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (errorUsername || errorEmail) {
      return;
    }

    try {
      const matchResult = birthday.match(
        /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/
      );
      if (!matchResult) {
        throw new Error(
          "Invalid birthday format. Please enter DD/MM/YYYY or DD-MM-YYYY."
        );
      }

      const [, day, month, year] = matchResult;
      const isoBirthday = `${day}-${month}-${year}`;

      const response = await fetch(
        "http://localhost:5290/api/account/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            address,
            phone,
            birthday: isoBirthday,
            gender,
          }),
        }
      );

      // Kiểm tra nếu không thể phân tích cú pháp JSON hoặc có lỗi khác từ phía server
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      // Nếu mọi thứ thành công, ẩn form đăng ký
      setShowSignUpForm(false);
    } catch (error) {
      // Xử lý lỗi bằng cách hiển thị thông báo hoặc thực hiện các hành động khác
      alert(error);
    }
  };

  useClickOutside(formRef, () => setShowSignUpForm(false));

  //Check username
  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const errUser = await fetchCheckUsername(username);
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

          const errEmail = await fetchCheckEmail(email);
          setErrorEmail(errEmail);
        } catch (error) {
          console.error("Error checking Email:", error);
        }
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        className="flex gap-5 flex-col justify-center px-6 py-12 lg:px-8 absolute h-[95%] w-[80%] sm:w-[50%] bg-white rounded-md border-2 border-gray-300"
        ref={formRef}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[100px]">
          <Image
            src="Hero1.svg"
            alt="Car rent"
            className="mx-auto h-10 w-auto"
            width={40}
            height={40}
          ></Image>
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
                    {errorRegexEmail && (
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
                      className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
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
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Birthday
                </label>
                <div className="">
                  <input
                    id="birthday"
                    name="birthday"
                    type="text"
                    autoComplete="off"
                    required
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                      checked={!gender} // Đảo ngược giá trị checked cho Female
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
                  {!error && <Login />}
                </button>
              </div>
            </div>
          </form>
        </div>

        <button
          className="absolute top-4 right-4 rounded-full bg-gray-300 hover:bg-gray-400 p-2"
          onClick={() => {
            setShowSignUpForm(false);
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
  );
};

export default Register;