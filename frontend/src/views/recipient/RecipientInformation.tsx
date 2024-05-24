"use client";

import { useStore } from "@/components/Store";
import Image from "next/image";
import { useEffect, useState } from "react";

const RecipientInformation = () => {
  const [isEditingRecipient, setIsEditingRecipient] = useState(false);

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    blurred,
    setBlurred,
    orderRecipients,
    setOrderRecipients,
    user,
    setUser,
  } = useStore();

  useEffect(() => {
    if (orderRecipients && orderRecipients.length > 0) {
      const latestRecipient = orderRecipients[orderRecipients.length - 1];
      setFirstName(latestRecipient.firstName);
      setLastName(latestRecipient.lastName);
      setEmail(latestRecipient.email);
      setPhone(latestRecipient.phoneNumber);
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, [orderRecipients, user]);

  const handleEditRecipient = () => {
    setIsEditingRecipient(true);
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <Image src="/User.svg" alt="user" width={20} height={20}></Image>
        <h1 className="font-bold text-gray-900">Recipient Information</h1>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8 h-10">
          <div className="relative flex gap-4 w-[40%]">
            <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
              FirstName{" "}
            </span>
            <input
              type="text"
              className={`px-2 rounded-md w-[60%] ${
                isEditingRecipient ? "border border-black" : ""
              } `}
              value={firstName}
              onChange={(e) => {
                handleChangeFirstName(e);
              }}
              onBlur={() => setBlurred(true)}
              readOnly={!isEditingRecipient}
            />
            <div className="absolute top-[20%] right-[18%]">
              {firstName == "" && blurred && (
                <>
                  <span className="text-red-500 font-bold text-sm">
                    FirstName Cannot Empty !
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="relative flex gap-4 w-[40%]">
            <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
              LastName{" "}
            </span>
            <input
              type="text"
              className={`px-2 rounded-md w-[60%] ${
                isEditingRecipient ? "border border-black" : ""
              } `}
              value={lastName}
              onChange={(e) => {
                handleChangeLastName(e);
              }}
              onBlur={() => setBlurred(true)}
              readOnly={!isEditingRecipient}
            />
            <div className="absolute top-[20%] right-[18%]">
              {lastName == "" && blurred && (
                <>
                  <span className="text-red-500 font-bold text-sm">
                    LastName Cannot Empty !
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-8 h-10">
          <div className="relative flex gap-4 w-[40%]">
            <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
              Email{" "}
            </span>
            <input
              type="text"
              className={`px-2 rounded-md w-[60%] ${
                isEditingRecipient ? "border border-black" : ""
              } `}
              value={email}
              onChange={(e) => {
                handleChangeEmail(e);
              }}
              onBlur={() => setBlurred(true)}
              readOnly={!isEditingRecipient}
            />
            <div className="absolute top-[20%] right-[25%]">
              {email == "" && blurred && (
                <>
                  <span className="text-red-500 font-bold text-sm">
                    Email Cannot Empty !
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="relative flex gap-4 w-[40%]">
            <span className="font-extrabold text-gray-500 flex items-center w-[40%]">
              PhoneNumber{" "}
            </span>
            <input
              type="text"
              className={`px-2 rounded-md w-[60%] ${
                isEditingRecipient ? "border border-black" : ""
              } `}
              value={phone}
              onChange={(e) => {
                handleChangePhoneNumber(e);
              }}
              onBlur={() => setBlurred(true)}
              readOnly={!isEditingRecipient}
            />
            <div className="absolute top-[20%] right-[12%]">
              {phone == "" && blurred && (
                <>
                  <span className="text-red-500 font-bold text-sm">
                    PhoneNumber Cannot Empty !
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-2 hover:cursor-pointer border border-black p-2 rounded-md h-10 w-[35%]"
          onClick={handleEditRecipient}
        >
          <Image src="/edit.svg" alt="edit" width={20} height={20}></Image>
          <span className=" text-lg text-gray-700 font-bold">
            Click here to Edit Recipient Information
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipientInformation;
