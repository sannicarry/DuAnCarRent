"use client";

import { CustomButton } from "@/components";
import { useStore } from "@/components/Store";
import { BankProps } from "@/types";
import { fetchApiBank, fetchOrderIdLatest } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { FaLetterboxd } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { toast } from "react-toastify";
import CardPayment from "./CardPayment";
import ListCard from "./ListCard";
import ListBank from "./ListBank";

const MethodCard = () => {
  const {
    methodPayment,
    setMethodPayment,
    bankData,
    setBankData,
    bank,
    setBank,
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
    cardsUser,
    setCardsUser,
    cardUser,
    setCardUser,
  } = useStore();

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const res = await fetchApiBank();
        setBankData(res.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchBankData();
  }, [methodPayment]);

  useEffect(() => {
    if (bank) {
      const fetchData = async () => {
        if (token != "") {
          try {
            const res = await fetchOrderIdLatest(token);
            if (res) {
              setOrderIdLatest(res);
            } else {
              setOrderIdLatest(0);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            return null;
          }
        }
      };

      fetchData();
    }
  }, [bank, token]);

  console.log("cardsUser = ", cardsUser);

  return (
    <div className="relative flex flex-col gap-4 p-8 border-b border-b-gray-300 min-h-[700px]">
      <>
        {cardsUser.length > 0 ? <ListCard /> : <ListBank />}

        {((cardUser && Object.keys(cardUser).length > 0) ||
          (bank && Object.keys(bank).length > 0)) && <CardPayment />}
      </>
    </div>
  );
};

export default MethodCard;
