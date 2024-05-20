import { UploadPhoto, UserNotificationsProps, UserProps } from "@/types";
import { useStore } from "./Store";
import { useEffect, useState } from "react";
import { createUploadPhotoPromises, fetchUserById, getPhotoUrl } from "@/utils";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { HiDotsHorizontal } from "react-icons/hi";

interface HistoryNotificationsProps {
  notification: UserNotificationsProps;
}

const Notification = ({ notification }: HistoryNotificationsProps) => {
  const [isHoveredItem, setIsHoveredItem] = useState(false);
  const [isHoveredOptions, setIsHoveredOptions] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { setShowPanel, token } = useStore();
  const { userNotificationsId, userIdCreate, carId, message } = notification;

  const [photos, setPhotos] = useState<UploadPhoto[]>([]);

  const [userCreateNotification, setUserCreateNotification] =
    useState<UserProps>();
  const fetchUserCreate = async () => {
    const data = await fetchUserById(userIdCreate, token);
    if (data) {
      setUserCreateNotification(data);
    }
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      if (userCreateNotification) {
        try {
          const baseURL = process.env.SERVER_URL;

          const uploadPromises = createUploadPhotoPromises(
            userCreateNotification?.photos,
            baseURL
          );
          const uploadedPhotos = await uploadPromises;
          setPhotos(uploadedPhotos);
        } catch (error) {
          console.error("Error loading car images:", error);
        }
      }
    };

    fetchPhoto();
  }, [userCreateNotification]);

  const handleMouseEnterItem = () => {
    setIsHoveredItem(true);
  };

  const handleMouseLeaveItem = () => {
    setIsHoveredItem(false);
  };

  const handleMouseEnterOptions = () => {
    setIsHoveredOptions(true);
  };

  const handleMouseLeaveOptions = () => {
    setIsHoveredOptions(false);
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div
      className={`relative grid grid-cols-5 rounded-lg ${
        isHoveredOptions ? `` : "hover:bg-gray-600 hover:cursor-pointer"
      }`}
      onMouseEnter={handleMouseEnterItem}
      onMouseLeave={handleMouseLeaveItem}
    >
      <div className="col-span-1 flex items-center">
        <Image
          src={getPhotoUrl(photos[0]) ?? "/Profil.svg"}
          alt="car model"
          width={100}
          height={100}
          className="object-contain"
        ></Image>
      </div>
      <div className="col-span-3 flex flex-col gap-2">
        <div className="flex text-white">
          <h2 className="font-bold truncate">
            {userCreateNotification?.username}
          </h2>
          <span className="font-medium">{message}</span>
        </div>
        <span className="text-blue-600 font-normal">1 hour ago</span>
      </div>
      <div className="col-span-1 flex justify-end items-center px-2">
        <GoDotFill className="text-blue-500 h-6 w-6" />
      </div>

      {isHoveredItem && (
        <HiDotsHorizontal
          className="hover:cursor-pointer absolute z-10 top-[30%] right-[8%] h-10 w-10 text-xl font-bold border border-gray-700 rounded-full p-2 bg-gray-600"
          onMouseEnter={handleMouseEnterOptions}
          onMouseLeave={handleMouseLeaveOptions}
          onClick={handleShowOptions}
        />
      )}

      {showOptions && (
        <div className="z-50 absolute top-[100%] right-0 p-4 w-[100px] h-[100px] bg-gray-500 text-white rounded-md">
          Options...
        </div>
      )}
    </div>
  );
};

export default Notification;
