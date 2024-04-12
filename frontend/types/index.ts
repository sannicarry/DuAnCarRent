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
  carImages: CarImageProps[];
}

export interface CarImageProps {
  carId: number;
  carImageId: number;
  imageUrl: string;
}

export interface BrandProps {
  brandId: number;
  brandName: string;
  address: string;
  phone: string;
}

export interface UploadedImage {
  file: File;
  carImageId: number;
}
