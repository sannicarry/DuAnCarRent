import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";
import { BankProps, CardUserProps } from "@/types";
import { fetchApiBank, fetchOrderIdLatest } from "@/utils";
import { CaaRecord } from "dns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaLetterboxd } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { toast } from "react-toastify";
const CardPayment = () => {
  const {
    bank,
    setBank,
    cardUser,
    setCardUser,
    cardNumber,
    setCardNumber,
    release,
    setRelease,
    cardholderName,
    setCardholderName,
    orderIdLatest,
    setOrderIdLatest,
    token,
    totalPrice,
  } = useStore();

  const [blurredCardNumber, setBlurredCardNumber] = useState(false);
  const [blurredRelease, setBlurredRelease] = useState(false);

  const handleChangeCardNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCardNumber = event.target.value.replace(/\s/g, "");
    const isNumeric = /^\d+$/.test(newCardNumber);
    if (newCardNumber.length <= 16) {
      if (!isNumeric && newCardNumber != "") {
      } else {
        const formattedCardNumber = formatCardNumber(newCardNumber);
        setCardNumber(formattedCardNumber);
        setBlurredCardNumber(false);
      }
    }
  };

  const formatCardNumber = (cardNumber: string): string => {
    let formattedCardNumber = "";
    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 4 === 0 && i > 0) {
        formattedCardNumber += " ";
      }
      formattedCardNumber += cardNumber[i];
    }
    return formattedCardNumber;
  };

  const handleChangeRelease = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRelease = event.target.value.replace(/[\/\s]/g, "");
    const isNumeric = /^\d+$/.test(newRelease);

    if (newRelease.length <= 4) {
      if (!isNumeric && newRelease != "") {
      } else {
        const formattedRelease = formatRelease(newRelease);
        setRelease(formattedRelease);

        setBlurredRelease(false);
      }
    }
  };

  const formatRelease = (release: string): string => {
    let formattedRelease = "";
    for (let i = 0; i < release.length; i++) {
      if (i === 2 && i > 0) {
        formattedRelease += "/";
      }
      formattedRelease += release[i];
    }
    return formattedRelease;
  };

  const handleChangeCardholderName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;

    value = value.replace(/[^a-zA-Z\s]/g, "");

    setCardholderName(value.toUpperCase());
  };

  const formatDate = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleBlurredCardNumber = () => {
    setBlurredCardNumber(true);
  };

  const handleBlurredRelease = () => {
    setBlurredRelease(true);
  };

  const checkValueRelease = (release: string) => {
    const temp = release.slice(0, 2);
    if (Number(temp) < 1 || Number(temp) > 12) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (blurredRelease && release != "") {
      if (release.replace(/[\/\s]/g, "").length < 4) {
        toast.error("Invalid Release !", {
          position: "bottom-center",
        });
      }
      if (!checkValueRelease(release)) {
        toast.error("Invalid Month !", {
          position: "bottom-center",
        });
      }
    }

    if (blurredCardNumber && cardNumber != "") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Invalid CardNumber !", {
          position: "bottom-center",
        });
      }
    }
  }, [blurredRelease, blurredCardNumber]);

  const handleRemove = (event: React.FormEvent) => {
    event.preventDefault();
    setBank({} as BankProps);
    setCardUser({} as CardUserProps);
  };

  console.log("cardNumber = ", cardNumber);
  console.log("release = ", release);
  console.log("cardholderName = ", cardholderName);

  return (
    <div className="absolute inset-0 p-8 border border-blue-500 bg-white w-full">
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex items-center bg-slate-300 py-2 px-6 gap-8 rounded-sm">
            <h1 className="text-gray-500 font-medium">ATM Card / Napas </h1>
            <div className="border border-blue-500 p-1 text-blue-500 font-medium">
              ATM
            </div>
          </div>
          <div className="flex flex-col border border-blue-500 gap-4">
            <div className="border-b border-gray-500">
              <div className="flex items-center justify-between p-6 border">
                <div className="flex gap-2 items-center">
                  <FaChevronLeft className="text-blue-500 h-8" />
                  <h1 className="text-blue-500 font-medium">
                    Payment on {cardUser.shortName ?? bank.shortName}
                  </h1>
                </div>
                <Image
                  src={`${cardUser.logo ?? bank.logo}`}
                  alt="logo"
                  width={80}
                  height={80}
                ></Image>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-6 py-4">
              <div className=" flex flex-col gap-2">
                <span className="text-gray-500 font-medium">Card Number*</span>
                <input
                  type="text"
                  className="p-2 border border-gray-500 rounded-md"
                  placeholder={`${
                    cardUser.cardNumber
                      ? ""
                      : `${bank.bin.slice(0, 4)} ${bank.bin.slice(
                          4,
                          6
                        )}12 3456 7890`
                  }`}
                  value={cardUser.cardNumber ?? cardNumber}
                  onBlur={() => {
                    handleBlurredCardNumber();
                  }}
                  onChange={handleChangeCardNumber}
                />
              </div>
              <div className="flex gap-8">
                <div className=" flex flex-col gap-2 w-[50%]">
                  <span className="text-gray-500 font-medium">
                    Month / Year of Release*
                  </span>
                  <input
                    type="text"
                    className="p-2 border border-gray-500 rounded-md"
                    placeholder="12/18"
                    value={cardUser.release ?? release}
                    onBlur={() => {
                      handleBlurredRelease();
                    }}
                    onChange={handleChangeRelease}
                  />
                </div>
                <div className=" flex flex-col gap-2 w-[50%]">
                  <span className="text-gray-500 font-medium">
                    Cardholder Name*
                  </span>
                  <input
                    type="text"
                    className="p-2 border border-gray-500 rounded-md"
                    placeholder="NGUYEN VAN A"
                    value={cardUser.cardHolderName ?? cardholderName}
                    onChange={handleChangeCardholderName}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end p-6 pt-2">
              <CustomButton
                title={`PAY`}
                textStyles={`font-bold text-lg`}
                containerStyles="w-[15%] text-white bg-blue-500 rounded-md hover:opacity-80"
                btnType="submit"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="flex gap-2 p-2 pr-0 hover:cursor-pointer hover:opacity-80"
              onClick={(e) => {
                handleRemove(e);
              }}
            >
              <Image
                src="/close.svg"
                alt="close"
                width={20}
                height={20}
              ></Image>
              <span className="text-gray-500 font-normal">
                Cancel the transaction
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex items-center justify-between bg-slate-300 py-2 px-6 gap-8 rounded-sm">
            <h1 className="text-gray-500 font-medium">Order Information</h1>
            <div className="flex items-center gap-2 p-1">
              <IoTime className="" />
              <span>{formatDate(new Date())}</span>
            </div>
          </div>
          <div className="flex flex-col border border-blue-500 rounded-sm">
            <div className="flex flex-col gap-2 py-4 px-6 ">
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 font-normal">
                  Payment Acceptor
                </span>
                <h1 className="text-gray-700 font-medium"> VNPAY </h1>
              </div>
              <div className="flex flex-col gap-2 border-b pb-4 border-b-gray-500">
                <span className="text-gray-500 font-normal">Order ID</span>
                <h1 className="text-gray-700 font-medium">
                  {" "}
                  #{orderIdLatest + 1}{" "}
                </h1>
              </div>
            </div>
            <div className="flex justify-between py-4 px-6">
              <span className="text-gray-500 font-normal">Payment Amount</span>
              <span className="text-blue-500 font-bold">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
