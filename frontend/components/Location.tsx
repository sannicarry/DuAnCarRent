import Image from "next/image";

const Location = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between">
      <div className="flex flex-col bg-white rounded-md py-4 px-4 sm:px-8 w-full sm:w-[45%] shadow-sm">
        <div className="flex justify-start items-center mb-2">
          <Image src="pick.svg" alt="pick" width={20} height={20}></Image>
          <span className="font-semibold text-base ml-2">Pick - Up</span>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Locations</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your city
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
          <Image
            src="Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Date</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your date
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
          <Image
            src="Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Time</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your time
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Image src="Swap.svg" alt="swap" width={100} height={100}></Image>
      </div>
      <div className="flex flex-col bg-white rounded-md py-4 px-4 sm:px-8 w-full sm:w-[45%] shadow-sm">
        <div className="flex justify-start items-center mb-2">
          <Image src="pick.svg" alt="pick" width={20} height={20}></Image>
          <span className="font-semibold text-base ml-2">Pick - Down</span>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Locations</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your city
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
          <Image
            src="Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Date</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your date
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
          <Image
            src="Line.svg"
            alt="line"
            width={4}
            height={4}
            className="mr-5"
          ></Image>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-base">Time</span>
            <div className="flex justify-between items-end">
              <span className="font-medium text-[90A3BF] text-xs opacity-50">
                Select your time
              </span>
              <Image src="down.svg" alt="down" width={10} height={10}></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
