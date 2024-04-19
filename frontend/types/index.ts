import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface CarProps {
  carId: number;
  make: string;
  model: string;
  type: string;
  gasoline: number;
  capacity: number;
  year: string;
  cityMpg: number;
  fuel: string;
  transmission: string;
  photos: PhotoProps[];
  brandId: number;
}

export interface PhotoProps {
  photoId: number;
  photoUrl: string;
  photoType: number;
  entityId: string;
}

export interface UploadPhoto {
  file: File;
  photoId: number;
}

export interface CreatePhoto {
  file: File;
  photoId: number;
  photoType: number;
  entityId: string;
}

export interface UpdatePhoto {
  file: File;
  photoId: number;
  photoType: number;
  entityId: string;
}

export interface DeletePhoto {
  entityId: string;
  photoId: number;
}

export interface BrandProps {
  brandId: number;
  brandName: string;
  address: string;
  phone: string;
}

export interface UserProps {
  userId: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: boolean;
  isLocked: boolean;
  photos: PhotoProps[];
}
