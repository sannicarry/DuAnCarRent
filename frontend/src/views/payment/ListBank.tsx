import { useStore } from "@/components/Store";
import Image from "next/image";

const ListBank = () => {
  const { bankData, setBankData, bank, setBank } = useStore();
  console.log("bank111 = ", bank);
  return (
    <>
      {bankData.map((bankItem, index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            id={`bank-${index}`}
            name="bank"
            type="radio"
            autoComplete="off"
            required
            checked={bank.shortName === bankItem.shortName}
            onChange={() => setBank(bankItem)}
          />
          <div className="border rounded-sm p-2">
            <Image
              src={`${bankItem.logo}`}
              alt="logo"
              height={80}
              width={80}
            ></Image>
          </div>
          <h1 className="text-gray-700 font-bold">{bankItem.name}</h1>
        </div>
      ))}
    </>
  );
};

export default ListBank;
