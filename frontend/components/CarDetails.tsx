import { CarProps } from "@/types";
import { generateCarImageUrl } from "@/utils";
import Image from "next/image";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <div className="bg-[#F6F7F9]">
      <button
        type="button"
        className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
        onClick={closeModal}
      >
        <Image
          src="/close.svg"
          alt="cose"
          width={20}
          height={20}
          className="object-contain"
        />
      </button>

      <div className="flex-1 flex flex-col gap-3">
        <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
          <Image
            src={generateCarImageUrl(car)}
            alt="car model"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={generateCarImageUrl(car, "29")}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={generateCarImageUrl(car, "33")}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
            <Image
              src={generateCarImageUrl(car, "13")}
              alt="car model"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
