import {
  BankProps,
  BrandProps,
  CarFavoriteProps,
  CarProps,
  ClaimProps,
  LocationProps,
  OrderProps,
  OrderRecipientProps,
  PaymentProps,
  PhotoProps,
  UserNotificationsProps,
  UserProps,
} from "@/types";
import { create } from "zustand";

type BooleanStore = {
  userId: string;
  setUserId: (userId: string) => void;
  carId: number;
  setCarId: (carId: number) => void;
  brandId: number;
  setBrandId: (brandId: number) => void;
  orderId: number;
  setOrderId: (orderId: number) => void;
  user: UserProps;
  setUser: (user: UserProps) => void;
  car: CarProps;
  setCar: (car: CarProps) => void;
  brand: BrandProps;
  setBrand: (brand: BrandProps) => void;
  order: OrderProps;
  setOrder: (order: OrderProps) => void;
  username: string;
  setUsername: (username: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  email: string;
  setEmail: (username: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  birthDate: string;
  setBirthDate: (birthDate: string) => void;
  address: string;
  setAddress: (address: string) => void;
  gender: boolean;
  setGender: (gender: boolean) => void;
  photos: PhotoProps[];
  setPhotos: (photos: PhotoProps[]) => void;
  password: string;
  setPassword: (username: string) => void;
  error: string;
  setError: (username: string) => void;
  login: boolean;
  setLogin: (login: boolean) => void;
  logout: boolean;
  setLogout: (logout: boolean) => void;
  showLoginForm: boolean;
  setShowLoginForm: (show: boolean) => void;
  showSignUpForm: boolean;
  setShowSignUpForm: (show: boolean) => void;
  token: string;
  setToken: (token: string) => void;
  claims: ClaimProps[];
  setClaims: (claims: ClaimProps[]) => void;
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  showAddNewBrand: boolean;
  setShowAddNewBrand: (show: boolean) => void;
  brandName: string;
  setBrandName: (brandName: string) => void;
  success: boolean;
  setSuccess: (success: boolean) => void;
  showAddNewCar: boolean;
  setShowAddNewCar: (show: boolean) => void;
  showViewCar: CarProps;
  setShowViewCar: (show: CarProps) => void;
  make: string;
  setMake: (make: string) => void;
  model: string;
  setModel: (model: string) => void;
  type: string;
  setType: (type: string) => void;
  gasoline: number;
  setGasoline: (gasoline: number) => void;
  capacity: number;
  setCapacity: (capacity: number) => void;
  year: string;
  setYear: (year: string) => void;
  cityMpg: number;
  setCityMpg: (cityMpg: number) => void;
  fuel: string;
  setFuel: (make: string) => void;
  transmission: string;
  setTransmission: (transmission: string) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
  errorUsername: boolean;
  setErrorUsername: (errorUsername: boolean) => void;
  errorEmail: boolean;
  setErrorEmail: (errorUsername: boolean) => void;
  errorRegexEmail: boolean;
  setErrorRegexEmail: (errorUsername: boolean) => void;
  blurred: boolean;
  setBlurred: (blurred: boolean) => void;
  showRentNow: boolean;
  setShowRentNow: (showRentNow: boolean) => void;
  allLocations: LocationProps;
  setAllLocations: (allLocations: LocationProps) => void;
  locationFrom: string;
  setLocationFrom: (locations: string) => void;
  locationTo: string;
  setLocationTo: (locations: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  timeFrom: string;
  setTimeFrom: (time: string) => void;
  timeTo: string;
  setTimeTo: (time: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  status: number;
  setStatus: (status: number) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  showViewOrder: boolean;
  setShowViewOrder: (showViewOrder: boolean) => void;
  currentPageAdmin: string;
  setCurrentPageAdmin: (currentPageAdmin: string) => void;
  approve: number;
  setApprove: (approve: number) => void;
  reject: number;
  setReject: (reject: number) => void;
  finish: number;
  setFinish: (finish: number) => void;
  confirmDelete: boolean;
  setConfirmDelete: (confirmDelete: boolean) => void;
  exists: boolean;
  setExists: (exists: boolean) => void;
  checkSelectedLocation: boolean;
  setCheckSelectedLocation: (checkSelectedLocation: boolean) => void;
  allCars: CarProps[];
  setAllCars: (allCars: CarProps[]) => void;
  hrefAfterLogin: string;
  setHrefAfterLogin: (hrefAfterLogin: string) => void;
  showPanel: string;
  setShowPanel: (showPanel: string) => void;
  carFavorites: CarFavoriteProps[];
  setCarFavorites: (carFavorites: CarFavoriteProps[]) => void;
  userNotifications: UserNotificationsProps[];
  setUserNotifications: (userNotifications: UserNotificationsProps[]) => void;
  orderRecipients: OrderRecipientProps[];
  setOrderRecipients: (orderRecipients: OrderRecipientProps[]) => void;
  methodPayment: string;
  setMethodPayment: (methodPayment: string) => void;
  payment: PaymentProps;
  setPayment: (payment: PaymentProps) => void;
  bankData: BankProps[];
  setBankData: (bankData: BankProps[]) => void;
};

export const useStore = create<BooleanStore>((set) => ({
  login: false,
  setLogin: (login: boolean) => {
    set(() => ({ login: login }));
  },
  logout: false,
  setLogout: (logout: boolean) => {
    set(() => ({ logout: logout }));
  },
  showLoginForm: false,
  setShowLoginForm: (show: boolean) => {
    set(() => ({ showLoginForm: show }));
  },
  showSignUpForm: false,
  setShowSignUpForm: (show: boolean) => {
    set(() => ({ showSignUpForm: show }));
  },
  token: "",
  setToken: (token: string) => {
    set(() => ({ token: token }));
  },
  claims: [],
  setClaims: (claims: ClaimProps[]) => {
    set(() => ({ claims }));
  },
  userId: "",
  setUserId: (userId: string) => {
    set(() => ({ userId }));
  },
  carId: 0,
  setCarId: (carId: number) => {
    set(() => ({ carId }));
  },
  brandId: 0,
  setBrandId: (brandId: number) => {
    set(() => ({ brandId }));
  },
  orderId: 0,
  setOrderId: (orderId: number) => {
    set(() => ({ orderId }));
  },
  user: {} as UserProps,
  setUser: (user: UserProps) => {
    set(() => ({ user }));
  },
  car: {} as CarProps,
  setCar: (car: CarProps) => {
    set(() => ({ car }));
  },
  brand: {} as BrandProps,
  setBrand: (brand: BrandProps) => {
    set(() => ({ brand }));
  },
  order: {} as OrderProps,
  setOrder: (order: OrderProps) => {
    set(() => ({ order }));
  },
  username: "",
  setUsername: (username: string) => {
    set(() => ({ username: username }));
  },
  firstName: "",
  setFirstName: (firstName: string) => {
    set(() => ({ firstName }));
  },
  lastName: "",
  setLastName: (lastName: string) => {
    set(() => ({ lastName }));
  },
  birthDate: "",
  setBirthDate: (birthDate: string) => {
    set(() => ({ birthDate: birthDate }));
  },
  phone: "",
  setPhone: (phone: string) => {
    set(() => ({ phone: phone }));
  },
  address: "",
  setAddress: (address: string) => {
    set(() => ({ address: address }));
  },
  email: "",
  setEmail: (email: string) => {
    set(() => ({ email: email }));
  },
  gender: false,
  setGender: (gender: boolean) => {
    set(() => ({ gender: gender }));
  },
  photos: [] as PhotoProps[],
  setPhotos: (photos: PhotoProps[]) => {
    set(() => ({ photos: photos }));
  },
  password: "",
  setPassword: (password: string) => {
    set(() => ({ password: password }));
  },
  error: "",
  setError: (error: string) => {
    set(() => ({ error: error }));
  },
  showOptions: false,
  setShowOptions: (show: boolean) => {
    set(() => ({ showOptions: show }));
  },

  showAddNewBrand: false,
  setShowAddNewBrand: (show: boolean) => {
    set(() => ({ showAddNewBrand: show }));
  },
  brandName: "",
  setBrandName: (brandName: string) => {
    set(() => ({ brandName: brandName }));
  },
  success: false,
  setSuccess: (success: boolean) => {
    set(() => ({ success: success }));
  },
  showAddNewCar: false,
  setShowAddNewCar: (show: boolean) => {
    set(() => ({ showAddNewCar: show }));
  },
  showViewCar: {} as CarProps,
  setShowViewCar: (show: CarProps) => {
    set(() => ({ showViewCar: show }));
  },
  make: "",
  setMake: (make: string) => {
    set(() => ({ make: make }));
  },
  model: "",
  setModel: (model: string) => {
    set(() => ({ model: model }));
  },
  type: "",
  setType: (type: string) => {
    set(() => ({ type: type }));
  },
  gasoline: 0,
  setGasoline: (gasoline: number) => {
    set(() => ({ gasoline: gasoline }));
  },
  capacity: 0,
  setCapacity: (capacity: number) => {
    set(() => ({ capacity: capacity }));
  },
  year: "",
  setYear: (year: string) => {
    set(() => ({ year: year }));
  },
  cityMpg: 0,
  setCityMpg: (cityMpg: number) => {
    set(() => ({ cityMpg: cityMpg }));
  },
  fuel: "",
  setFuel: (fuel: string) => {
    set(() => ({ fuel: fuel }));
  },
  transmission: "",
  setTransmission: (transmission: string) => {
    set(() => ({ transmission: transmission }));
  },
  searchValue: "",
  setSearchValue: (searchValue: string) => {
    set(() => ({ searchValue: searchValue }));
  },
  itemsPerPage: 8,
  setItemsPerPage: (itemsPerPage: number) => {
    set(() => ({ itemsPerPage: itemsPerPage }));
  },
  currentPage: 1,
  setCurrentPage: (currentPage: number) => {
    set(() => ({ currentPage: currentPage }));
  },
  totalPages: 1,
  setTotalPages: (totalPages: number) => {
    set(() => ({ totalPages: totalPages }));
  },
  isLocked: false,
  setIsLocked: (isLocked: boolean) => {
    set(() => ({ isLocked: isLocked }));
  },
  errorUsername: false,
  setErrorUsername: (errorUsername: boolean) => {
    set(() => ({ errorUsername: errorUsername }));
  },
  errorEmail: false,
  setErrorEmail: (errorEmail: boolean) => {
    set(() => ({ errorEmail: errorEmail }));
  },
  errorRegexEmail: false,
  setErrorRegexEmail: (errorRegexEmail: boolean) => {
    set(() => ({ errorRegexEmail: errorRegexEmail }));
  },
  blurred: false,
  setBlurred: (blurred: boolean) => {
    set(() => ({ blurred: blurred }));
  },
  showRentNow: false,
  setShowRentNow: (showRentNow: boolean) => {
    () => ({ showRentNow: showRentNow });
  },
  allLocations: {} as LocationProps,
  setAllLocations: (allLocations: LocationProps) => {
    set(() => ({ allLocations }));
  },
  locationFrom: "",
  setLocationFrom: (location: string) => {
    set(() => ({ locationFrom: location }));
  },
  locationTo: "",
  setLocationTo: (location: string) => {
    set(() => ({ locationTo: location }));
  },
  dateFrom: "",
  setDateFrom: (date: string) => {
    set(() => ({ dateFrom: date }));
  },
  dateTo: "",
  setDateTo: (date: string) => {
    set(() => ({ dateTo: date }));
  },
  timeFrom: "",
  setTimeFrom: (time: string) => {
    set(() => ({ timeFrom: time }));
  },
  timeTo: "",
  setTimeTo: (time: string) => {
    set(() => ({ timeTo: time }));
  },
  loading: false,
  setLoading: (loading: boolean) => {
    set(() => ({ loading: loading }));
  },
  status: 0,
  setStatus: (status: number) => {
    set(() => ({ status: status }));
  },
  totalPrice: 0,
  setTotalPrice: (totalPrice: number) => {
    set(() => ({ totalPrice: totalPrice }));
  },
  showViewOrder: false,
  setShowViewOrder: (showViewOrder: boolean) => {
    set(() => ({ showViewOrder: showViewOrder }));
  },
  currentPageAdmin: "Dashboard",
  setCurrentPageAdmin: (currentPageAdmin: string) => {
    set(() => ({ currentPageAdmin: currentPageAdmin }));
  },
  approve: 1,
  setApprove: (approve: number) => {
    set(() => ({ approve }));
  },
  reject: 2,
  setReject: (reject: number) => {
    set(() => ({ reject }));
  },
  finish: 3,
  setFinish: (finish: number) => {
    set(() => ({ finish }));
  },
  confirmDelete: false,
  setConfirmDelete: (confirmDelete: boolean) => {
    set(() => ({ confirmDelete }));
  },
  exists: false,
  setExists: (exists: boolean) => {
    set(() => ({ exists }));
  },
  checkSelectedLocation: true,
  setCheckSelectedLocation: (checkSelectedLocation: boolean) => {
    set(() => ({ checkSelectedLocation }));
  },
  allCars: [],
  setAllCars: (allCars: CarProps[]) => {
    set(() => ({ allCars }));
  },
  hrefAfterLogin: "/",
  setHrefAfterLogin: (hrefAfterLogin: string) => {
    set(() => ({ hrefAfterLogin }));
  },
  showPanel: "",
  setShowPanel: (showPanel: string) => {
    set(() => ({ showPanel }));
  },
  carFavorites: [],
  setCarFavorites: (carFavorites: CarFavoriteProps[]) => {
    set(() => ({ carFavorites }));
  },
  userNotifications: [],
  setUserNotifications: (userNotifications: UserNotificationsProps[]) => {
    set(() => ({ userNotifications }));
  },
  orderRecipients: [],
  setOrderRecipients: (orderRecipients: OrderRecipientProps[]) => {
    set(() => ({ orderRecipients }));
  },
  methodPayment: "",
  setMethodPayment: (methodPayment: string) => {
    set(() => ({ methodPayment }));
  },
  payment: {} as PaymentProps,
  setPayment: (payment: PaymentProps) => {
    set(() => ({ payment }));
  },
  bankData: [],
  setBankData: (bankData: BankProps[]) => {
    set(() => ({ bankData }));
  },
}));
