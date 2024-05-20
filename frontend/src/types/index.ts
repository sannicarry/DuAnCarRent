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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  gender: boolean;
  isLocked: boolean;
  photos: PhotoProps[];
  claims: ClaimProps[];
  carFavorites: CarFavoriteProps[];
  userNotifications: UserNotificationsProps[];
  orderRecipient: OrderRecipientProps[];
}

export interface OrderProps {
  orderId: number;
  user: UserProps;
  car: CarProps;
  locationFrom: string;
  dateFrom: string;
  timeFrom: string;
  locationTo: string;
  dateTo: string;
  timeTo: string;
  totalPrice: number;
  status: number;
}

export interface ClaimProps {
  type: string;
  value: string;
}

export interface CarFavoriteProps {
  carFavoritesId: number;
  car: CarProps;
}

export interface UserNotificationsProps {
  userNotificationsId: number;
  userIdCreate: string;
  carId: number;
  message: string;
}

export interface LocationProps {
  locationFrom: string;
  locationTo: string;
  dateFrom: string;
  dateTo: string;
  timeFrom: string;
  timeTo: string;
}

export interface OrderRecipientProps {
  orderRecipientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface PaymentProps {
  paymentId: number;
  paymentReference: string;
  userId: string;
  method: number;
  price: number;
  quantity: number;
  totalPrice: number;
  paymentDate: string;
}

export interface BankProps {
  id: number;
  logo: string;
  name: string;
  shortName: string;
}
