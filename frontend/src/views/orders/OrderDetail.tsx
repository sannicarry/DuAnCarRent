import { useStore } from "@/components/Store";
import { SERVER_URL } from "@/constants";
import { OrderProps, UploadPhoto } from "@/types";
import { createUploadPhotoPromises, getPhotoUrl } from "@/utils";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderDetail = ({ order }: { order: OrderProps }) => {
  const [photoCar, setPhotoCar] = useState<UploadPhoto[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (order.car && order.car?.carId !== undefined) {
        try {
          const baseURL = SERVER_URL;

          const uploadPromises = createUploadPhotoPromises(
            order.car?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotoCar(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };
    fetchPhotos();
  }, [order.car]);

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Customer Name :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.orderRecipient.firstName} {order.orderRecipient.lastName}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Phone Number :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.orderRecipient.phoneNumber}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Email :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.orderRecipient.email}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Price :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.payment.price}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Quantity Of Day :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.payment.quantity}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Total Price :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.payment.totalPrice}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Method Payment :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.payment.method == 1
                  ? "ATM Card"
                  : "Payment On Car PickUp"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Payment completed? : </h2>
            </div>
            <div className="col-span-1">
              <Image
                src={order.statusPayment == 1 ? `/Check.svg` : `/close.svg`}
                alt="payment"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Car :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.car.make} {order.car.model}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Location From :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.locationFrom}{" "}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Date From :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {format(new Date(order.dateFrom), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Time From :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.timeFrom}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Location To :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {order.locationTo}{" "}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Date To :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {format(new Date(order.dateTo), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">Time To :</h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">{order.timeTo}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-b-gray-200">
            <div className="col-span-1">
              <h2 className="text-gray-700 font-bold">
                The Time Of Order Create :
              </h2>
            </div>
            <div className="col-span-1">
              <span className="text-gray-700 font-medium">
                {format(
                  new Date(order.payment.paymentDate),
                  "yyyy-MM-dd HH:mm"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={getPhotoUrl(photoCar[0]) ?? "/NoCarPhoto.webp"}
          alt="car"
          width={200}
          height={200}
        ></Image>
      </div>
    </>
  );
};

export default OrderDetail;
