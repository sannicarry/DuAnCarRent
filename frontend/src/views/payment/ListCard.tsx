import { useStore } from "@/components/Store";
import Image from "next/image";
import { useState } from "react";
import ListBank from "./ListBank";

const ListCard = () => {
  const {
    cardUser,
    setCardUser,
    cardsUser,
    setCardsUser,
    checkStateAddCard,
    setCheckStateAddCard,
  } = useStore();

  const handleAddCard = (event: React.FormEvent) => {
    event.preventDefault();
    setCheckStateAddCard(true);
  };

  console.log("checkStateAddCard = ", checkStateAddCard);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-16 border-b border-b-gray-500 pb-6 w-[40%]">
        <h1 className="text-gray-700 font-bold"> Select Card </h1>
        <div
          className="flex gap-2 border border-gray-300 rounded-sm p-2 hover:cursor-pointer hover:opacity-90"
          onClick={(e) => {
            handleAddCard(e);
          }}
        >
          <Image src="/Plus.svg" alt="add" width={20} height={20}></Image>
          <span className="text-gray-600 font-normal">Other Card</span>
        </div>
      </div>
      {checkStateAddCard && (
        <>
          <ListBank />
        </>
      )}
      {!checkStateAddCard && (
        <div className="flex flex-col gap-4">
          {cardsUser.map((card, index) => (
            <div key={index} className="flex items-center gap-8 h-[60px]">
              <input
                id={`card`}
                name="card"
                type="radio"
                autoComplete="off"
                required
                checked={cardUser.shortName === card.shortName}
                onChange={() => setCardUser(card)}
              />
              <div className="border rounded-sm p-2 h-full flex items-center">
                <Image
                  src={`${card.logo}`}
                  alt="logo"
                  height={80}
                  width={80}
                ></Image>
              </div>
              <div className="flex flex-col gap-2 h-full">
                <h1 className="text-gray-700 font-bold">{card.shortName}</h1>
                <span className="text-gray-500 font-medium">
                  x{card.cardNumber.slice(-4)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListCard;
