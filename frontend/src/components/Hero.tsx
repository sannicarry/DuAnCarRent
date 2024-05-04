import Image from "next/image";
import { CustomButton } from ".";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 min-h-[360px]">
      <div className="flex-1">
        <div className="rounded-t-lg rounded-b-lg bg-gradient-to-br from-blue-500 to-blue-200 flex flex-col justify-start p-5">
          <h1 className="font-semibold text-2xl text-white">
            The Best Platform <br className="hidden sm:inline" /> for Car Rental
          </h1>
          <div className="font-medium text-sm text-white flex flex-col py-5">
            <span>Ease of doing a car rental safely and</span>
            <span>reliably. Of course at a low price.</span>
          </div>
          <CustomButton
            title="Rental Car"
            btnType="button"
            containerStyles="max-xl:text-white text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
          />
          <div className="flex justify-center items-center my-2 h-[100px]">
            <Image
              src="/Hero1.svg"
              alt="Hero"
              width={300}
              height={150}
              className="object-contain"
            ></Image>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="rounded-t-lg rounded-b-lg bg-gradient-to-br from-blue-500 to-blue-200 flex flex-col justify-start p-5">
          <h1 className="font-semibold text-2xl text-white">
            Easy way to rent a <br className="hidden sm:inline" /> car at a low
            price
          </h1>
          <div className="font-medium text-sm text-white flex flex-col py-5">
            <span>Providing cheap car rental services</span>
            <span>and safe and comfortable facilities.</span>
          </div>
          <CustomButton
            title="Rental Car"
            btnType="button"
            containerStyles="max-xl:text-white text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
          />
          <div className="flex justify-center items-center my-2 h-[100px]">
            <Image
              src="/Hero2.svg"
              alt="Hero"
              width={300}
              height={150}
              className="object-contain"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
