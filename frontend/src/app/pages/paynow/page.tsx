"use client";
import { useStore } from "@/components/Store";
import { SERVER_URL } from "@/constants";
import {
  BankProps,
  CarProps,
  CardUserProps,
  LocationProps,
  OrderRecipientProps,
  UploadPhoto,
} from "@/types";
import {
  calculateCarRent,
  createUploadPhotoPromises,
  fetchApiBank,
  fetchCreateCardUser,
  fetchCreateOrder,
  fetchCreateOrderRecipient,
  fetchCreatePayment,
  fetchUpdateOrderRecipient,
  getPhotoUrl,
  listProvince,
} from "@/utils";
import { format, getDate, getTime } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import MethodCard from "@/views/payment/MethodCard";
import MethodCash from "@/views/payment/MethodCash";
import ReciientInformation from "@/views/recipient/RecipientInformation";
import RecipientInformation from "@/views/recipient/RecipientInformation";
import CarOrder from "@/views/cars/CarOrder";
import Payment from "@/views/payment/Payment";
import { toast } from "react-toastify";
import LocationOrder from "@/views/locations/LocationPayNow";

const page = () => {
  const router = useRouter();
  let orderRecipientId: number = 0;
  let paymentId: number = 0;
  let statusOrder: number = 1;

  const {
    success,
    setSuccess,
    token,
    user,
    status,
    orderRecipients,
    setOrderRecipients,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    locationFrom,
    setLocationFrom,
    locationTo,
    setLocationTo,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    timeFrom,
    setTimeFrom,
    timeTo,
    setTimeTo,
    methodPayment,
    setMethodPayment,
    price,
    setPrice,
    quantityOfDay,
    setQuantityOfDay,
    car,
    setCar,
    cardNumber,
    setCardNumber,
    release,
    setRelease,
    cardholderName,
    setCardholderName,
    setOrderIdLatest,
    setTotalPrice,
    cardsUser,
    setCardsUser,
    bank,
    setBank,
    cardUser,
    setCardUser,
    checkStateAddCard,
    setCheckStateAddCard,
  } = useStore();

  useEffect(() => {
    setCardsUser(user.cardUser);
  }, [user, success]);

  console.log("successPaynow = ", success);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //fetchPayment
    if (
      methodPayment == "card" &&
      !cardUser &&
      (cardNumber == "" || release == "" || cardholderName == "")
    ) {
      toast.error("Please enter complete ATM card information!", {
        position: "top-center",
      });

      return;
    }

    const payment = await fetchCreatePayment(
      "Car Rent",
      user.userId,
      methodPayment == "card" ? 1 : 2,
      price,
      quantityOfDay,
      formatDate(new Date()),
      token
    );

    //fetchCardUser
    if (methodPayment == "card" && Object.keys(bank).length > 0) {
      const cardUser = await fetchCreateCardUser(
        user.userId,
        bank.logo,
        bank.name,
        bank.shortName,
        bank.bin,
        cardNumber,
        release,
        cardholderName,
        token
      );
    }

    //fetch OrderRecipient
    const orderRecipient = orderRecipients.find((x) => x.phoneNumber === phone);

    if (orderRecipient) {
      const infoChanged =
        orderRecipient.firstName !== firstName ||
        orderRecipient.lastName !== lastName ||
        orderRecipient.email !== email;

      if (infoChanged) {
        const updatedOrderRecipient = await fetchUpdateOrderRecipient(
          orderRecipient.orderRecipientId,
          firstName,
          lastName,
          email,
          token
        );
        orderRecipientId = updatedOrderRecipient.orderRecipientId;
      } else {
        orderRecipientId = orderRecipient.orderRecipientId;
      }
    } else {
      const newOrderRecipient = await fetchCreateOrderRecipient(
        user.userId,
        firstName,
        lastName,
        email,
        phone,
        token
      );
      orderRecipientId = newOrderRecipient.orderRecipientId;
    }

    paymentId = payment.paymentId;

    //fetchOrder
    await fetchCreateOrder(
      user.userId,
      car.carId,
      paymentId,
      orderRecipientId,
      locationFrom,
      dateFrom,
      timeFrom,
      locationTo,
      dateTo,
      timeTo,
      statusOrder,
      methodPayment == "card" ? 1 : 2,
      token
    );
    toast.success("Order created successfully!", {
      onClose: () => {
        router.push("/pages/home", { scroll: true });
        setSuccess(true);
        cleanup();
      },
    });
  };

  const cleanLocation = () => {
    localStorage.removeItem("locationFrom");
    localStorage.removeItem("locationTo");
    localStorage.removeItem("dateFrom");
    localStorage.removeItem("dateTo");
    localStorage.removeItem("timeFrom");
    localStorage.removeItem("timeTo");
    localStorage.removeItem("car");
    setLocationFrom("");
    setLocationTo("");
    setDateFrom("");
    setDateTo("");
    setTimeFrom("");
    setTimeTo("");
    setCar({} as CarProps);
    setCardUser({} as CardUserProps);
    setCheckStateAddCard(false);
  };

  const cleanup = () => {
    cleanLocation();
    setMethodPayment("card");
    setBank({} as BankProps);
    setCardNumber("");
    setRelease("");
    setCardholderName("");
    setOrderIdLatest(0);
    setPrice(0);
    setTotalPrice(0);
    setQuantityOfDay(0);
  };

  return (
    <div className="content bg-[#0EA5E9] flex flex-col gap-5">
      <div className="flex flex-col bg-white p-8 gap-5 border-teal-300 rounded-md">
        <LocationOrder />
        <RecipientInformation />
      </div>

      <CarOrder />
      <form onSubmit={handleSubmit} className="" method="POST">
        <div className="bg-white flex flex-col rounded-md">
          <Payment />
        </div>
      </form>
    </div>
  );
};

export default page;
