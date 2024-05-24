"use client";

import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SERVER_URL } from "@/constants";

const page = () => {
  const router = useRouter();

  const { success, setSuccess, token, error, setError } = useStore();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let url = `${SERVER_URL}/api/account/changePassword`;

      console.log("url = ", url);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);
      if (response.ok) {
        setSuccess(true);
        router.push("/", { scroll: true });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content flex justify-center items-center ">
      <div className="border border-#2563EB rounded-md h-[80vh] w-[40%] py-6 px-6 bg-#2563EB flex flex-col gap-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-lg uppercase  text-gray-600">
            Change Password
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          method="PUT"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-8">
            <div className="relative flex flex-col gap-4 w-full">
              <label
                htmlFor="oldPassword"
                className="font-bold text-lg uppercase text-gray-600"
              >
                Old Password
              </label>
              {error && (
                <>
                  <span className="absolute top-1 right-0 text-red-700 font-semibold text-sm">
                    {error}
                  </span>
                </>
              )}
              <div className="">
                <input
                  className="rounded-md border border-blue-300 px-2 h-10 w-full"
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Please type a new oldPassword ..."
                  required
                  value={oldPassword}
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="relative flex flex-col gap-4 w-full">
              <label
                htmlFor="newPassword"
                className="font-bold text-lg uppercase  text-gray-600"
              >
                New Password
              </label>
              <div className="">
                <input
                  className="rounded-md border border-blue-300 px-2 h-10 w-full"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Please type a new newPassword ..."
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="relative flex flex-col gap-4 w-full">
              <label
                htmlFor="confirmNewPassword"
                className="font-bold text-lg uppercase  text-gray-600"
              >
                Confirm New Password
              </label>
              {error && (
                <>
                  <span className="absolute top-1 right-0 text-red-700 font-semibold text-sm">
                    {error}
                  </span>
                </>
              )}
              <div className="">
                <input
                  className="rounded-md border border-blue-300 px-2 h-10 w-full"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  autoComplete="off"
                  placeholder="Please type a new confirmNewPassword ..."
                  required
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex gap-5 justify-end items-end w-full">
              <Link href="/" className="w-[40%] ">
                <CustomButton
                  title={`Back Home`}
                  textStyles={`font-bold text-lg`}
                  containerStyles="w-full text-blue-500 border border-black rounded-md bg-white hover:bg-blue-500 hover:text-white"
                />
              </Link>

              <CustomButton
                title={`Save`}
                btnType="submit"
                textStyles={`font-bold text-lg`}
                containerStyles="w-[40%] text-white rounded-md border border-black bg-primary-blue hover:bg-white hover:text-blue-500"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
