import { CarProps } from "@/src/types";
import { CarDetails, CustomButton } from ".";
import { features } from "@/src/constants";
import { calculateCarRent } from "@/src/utils";

interface PaymentProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const Payment = ({ isOpen, closeModal, car }: PaymentProps) => {
  const {
    make,
    model,
    type,
    gasoline,
    capacity,
    year,
    cityMpg,
    fuel,
    transmission,
  } = car;

  const carRent = calculateCarRent(cityMpg, Number(year));

  const keyValueFeatures = [
    {
      key: features.typeCar,
      value: type,
    },
    {
      key: features.capacity,
      value: capacity,
    },
    {
      key: features.steering,
      value: transmission === "a" ? "Automatic" : "Manual",
    },
    {
      key: features.gasoline,
      value: gasoline,
    },
  ];

  const handlePayment = () => {};
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div
            className="relative w-full max-w-lg max-h-[100vh] overflow-y-auto transform rounded-2xl bg-white p-6 
        text-left shadow-xl transition-all flex flex-col gap-5"
          >
            <CarDetails isOpen={isOpen} closeModal={closeModal} car={car} />
            <div className="flex flex-col bg-white border rounded-lg p-2 sm:p-5">
              <h1 className="font-bold text-lg capitalize">
                {make} {model}
              </h1>
              {/* description */}
              <span className="text-[3D5278] font-normal opacity-[0.8] py-4">
                NISMO has become the embodiment of Nissan's outstanding
                performance, inspired by the most unforgiving proving ground,
                the "race track".
              </span>

              <div className="flex flex-col">
                <div className="flex sm:justify-between gap-5 sm:gap-20">
                  {keyValueFeatures.map((item, index) => (
                    <>
                      {index < 2 && (
                        <div className="flex w-full justify-between">
                          <span className="text-[90A3BF] font-medium opacity-50">
                            {item.key}
                          </span>
                          <h1 className="text-[3D5278] font-medium capitalize">
                            {item.value}
                          </h1>
                        </div>
                      )}
                    </>
                  ))}
                </div>
                <div className="flex sm:justify-between gap-5 sm:gap-20">
                  {keyValueFeatures.map((item, index) => (
                    <>
                      {index >= 2 && (
                        <div className="flex w-full justify-between">
                          <span className="text-[90A3BF] font-medium opacity-50">
                            {item.key}
                          </span>
                          <h1 className="text-[3D5278] font-medium capitalize">
                            {item.value}
                          </h1>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-5">
                <div className="flex items-end">
                  <div>
                    <div className="text-xl font-semibold">
                      <span>$</span>
                      <span>{carRent}</span>
                      <span>/</span>
                      <span className="text-[14px] opacity-40 font-medium ml-1">
                        day
                      </span>
                    </div>
                    {/* Có sale thì thêm */}
                    <div className="line-through">
                      <span>$</span>
                      <span>{carRent + 2}</span>
                    </div>
                  </div>
                </div>
                <CustomButton
                  title="Pay Now"
                  containerStyles="text-white rounded-md max-xl:bg-primary-blue bg-primary-blue w-[120px]"
                  handleClick={handlePayment}
                  btnType="button"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
