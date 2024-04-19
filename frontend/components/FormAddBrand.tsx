"use client";
import { useEffect, useRef } from "react";
import { useStore } from "./Store";
import { CustomButton } from ".";
import { useClickOutside } from "@/utils";
import { BrandProps } from "@/types";

interface FormAddBrandProps {
  brand?: BrandProps;
}

const FormAddBrand = ({ brand }: FormAddBrandProps) => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const {
    brandName,
    setBrandName,
    address,
    setAddress,
    phone,
    setPhone,
    showAddNewBrand,
    setShowAddNewBrand,
    setError,
    setSuccess,
    token,
  } = useStore();

  let url = "http://localhost:5290/api/brand";
  let method = "POST";
  if (brand?.brandId != 0) {
    url += `/${brand?.brandId}`;
    method = "PUT";
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ brandName, address, phone }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess();
        setShowAddNewBrand(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (brand) {
      setBrandName(brand.brandName || "");
      setAddress(brand.address || "");
      setPhone(brand.phone || "");
    } else {
      clearBrand();
    }
  }, [brand]);

  const clearBrand = () => {
    setBrandName("");
    setAddress("");
    setPhone("");
  };

  useClickOutside(formRef, () => setShowAddNewBrand(false));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        className="flex flex-col justify-center px-6 py-12 lg:px-8 absolute h-[70%] w-[50%] top-[130px] bg-gray-200 rounded-md border-2 border-gray-300"
        ref={formRef}
      >
        <div className="flex flex-col h-full gap-8">
          <h1 className="text-[082431] font-bold text-2xl opacity-80 text-center">
            {brand?.brandId != 0 ? "Edit Brand" : "Add New Brand"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8"
            method="POST"
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="brandName"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Brand Name
                </label>
                <div className="w-[80%]">
                  <input
                    id="brandName"
                    name="brandName"
                    type="text"
                    autoComplete="brandName"
                    placeholder="Please type a new brand name ..."
                    required
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="addressBrand"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Address
                </label>
                <div className="w-[80%]">
                  <input
                    id="addressBrand"
                    name="addressBrand"
                    type="text"
                    autoComplete="addressBrand"
                    placeholder="Please type a new address ..."
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <label
                  htmlFor="phoneBrand"
                  className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
                >
                  Phone
                </label>
                <div className="w-[80%]">
                  <input
                    id="phoneBrand"
                    name="phoneBrand"
                    type="text"
                    autoComplete="phoneBrand"
                    placeholder="Please type a new phone ..."
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <CustomButton
                title={`${brand?.brandId != 0 ? "Save" : "Add"}`}
                btnType="submit"
                containerStyles="text-white text-white rounded-md bg-primary-blue bg-primary-blue w-full"
              />
            </div>
          </form>
        </div>
        <button
          className="absolute top-4 right-4 rounded-full bg-gray-300 hover:bg-gray-400 p-2"
          onClick={() => {
            setShowAddNewBrand(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FormAddBrand;
