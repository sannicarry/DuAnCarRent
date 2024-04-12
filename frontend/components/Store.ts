import { MutableRefObject, useState } from "react";
import { create } from "zustand";

type BooleanStore = {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (username: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  birthday: string;
  setBirthday: (birthday: string) => void;
  address: string;
  setAddress: (address: string) => void;
  gender: boolean;
  setGender: (gender: boolean) => void;
  password: string;
  setPassword: (username: string) => void;
  error: string;
  setError: (username: string) => void;
  login: boolean;
  setLogin: (login: boolean) => void;
  showLoginForm: boolean;
  setShowLoginForm: (show: boolean) => void;
  showSignUpForm: boolean;
  setShowSignUpForm: (show: boolean) => void;
  token: string;
  setToken: (token: string) => void;
  userRole: string | null;
  setUserRole: (role: string | null) => void;
  showOptions: boolean;
  setShowOptions: (show: boolean) => void;
  showAddNewBrand: boolean;
  setShowAddNewBrand: (show: boolean) => void;
  brandName: string;
  setBrandName: (brandName: string) => void;
  addressBrand: string;
  setAddressBrand: (address: string) => void;
  phoneBrand: string;
  setPhoneBrand: (phone: string) => void;
  success: boolean;
  setSuccess: () => void;
  showAddNewCar: boolean;
  setShowAddNewCar: (show: boolean) => void;
  showViewCar: boolean;
  setShowViewCar: (show: boolean) => void;
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
};

export const useStore = create<BooleanStore>((set) => ({
  login: false,
  setLogin: (login: boolean) => {
    set(() => ({ login: login }));
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
  userRole: null,
  setUserRole: (role: string | null) => {
    set(() => ({ userRole: role }));
  },
  username: "",
  setUsername: (username: string) => {
    set(() => ({ username: username }));
  },
  birthday: "",
  setBirthday: (birthday: string) => {
    set(() => ({ birthday: birthday }));
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
  addressBrand: "",
  setAddressBrand: (addressBrand: string) => {
    set(() => ({ addressBrand: addressBrand }));
  },
  phoneBrand: "",
  setPhoneBrand: (phoneBrand: string) => {
    set(() => ({ phoneBrand: phoneBrand }));
  },
  success: false,
  setSuccess: () => {
    set((state) => ({ success: !state.success }));
  },
  showAddNewCar: false,
  setShowAddNewCar: (show: boolean) => {
    set(() => ({ showAddNewCar: show }));
  },
  showViewCar: false,
  setShowViewCar: (show: boolean) => {
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
}));
