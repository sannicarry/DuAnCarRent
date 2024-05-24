"use client";
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/components/Store";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomButton } from "@/components";
import Link from "next/link";
import { BrandProps } from "@/types";

const CreateUpdateBrand = ({ brand }: { brand: BrandProps }) => {
  const brandNameInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [checkBrandName, setCheckBrandName] = useState(false);

  const {
    brandName,
    setBrandName,
    address,
    setAddress,
    phone,
    setPhone,
    setError,
    setSuccess,
    token,
    setBrand,
  } = useStore();

  const searchParams = useSearchParams();

  useEffect(() => {
    const brand = searchParams.get("brand");
    if (brand) {
      const parsedBrand = JSON.parse(brand);
      setBrand(parsedBrand);
    }
  }, [searchParams]);

  useEffect(() => {
    if (brand && brand?.brandId !== 0) {
      setBrandName(brand.brandName);
      setAddress(brand.address);
      setPhone(brand.phone);
    }
  }, [brand]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (checkBrandName && brandName != brand.brandName) {
      alert("Brand Name Existed. Cannot submit form.");

      if (brandNameInputRef.current) {
        brandNameInputRef.current.focus();
      }
      return;
    }
    try {
      let url = "http://localhost:5290/api/brand";
      let method = "POST";
      if (brand?.brandId != 0) {
        url += `/${brand?.brandId}`;
        method = "PUT";
      }

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
        setSuccess(true);
        router.push("/pages/brand", { scroll: false });
      } else {
        setError(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (brand?.brandId == 0) {
      clearBrand();
    }
  }, [brand]);

  const clearBrand = () => {
    setBrandName("");
    setAddress("");
    setPhone("");
  };

  useEffect(() => {
    const brandExists = async () => {
      if (brandName != "") {
        try {
          const url = `http://localhost:5290/api/brand/checkBrandName?brandName=${brandName}`;
          const response = await fetch(url, {
            method: "GET",
          });
          if (response.ok) {
            const data = await response.json();
            setCheckBrandName(data);
          } else {
            throw new Error("Failed to fetch check brandName");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    brandExists();
  }, [brandName]);

  return (
    <div className="flex flex-col px-6 py-4 gap-4">
      <h1 className="text-[082431] font-bold text-2xl opacity-80 text-center">
        {brand?.brandId != 0 ? "Edit Brand" : "Add New Brand"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-12 pt-6"
        method="POST"
      >
        <div className="flex items-center justify-between">
          <label
            htmlFor="brandName"
            className="block text-base font-medium leading-6 text-gray-900 w-[20%]"
          >
            Brand Name
          </label>
          <div className="relative w-[80%]">
            <input
              ref={brandNameInputRef}
              id="brandName"
              name="brandName"
              type="text"
              autoComplete="brandName"
              placeholder="Please type a new brand name ..."
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {checkBrandName && brandName != brand.brandName && (
              <div className="absolute top-[40px] text-lg font-bold text-red-600">
                Brand Name Existed !
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
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
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Link href="/pages/brand">
            <CustomButton
              title={`Back`}
              textStyles="font-bold text-base"
              containerStyles="text-white border border-black rounded-md hover:bg-blue-700 bg-blue-500  w-[80px]"
            />
          </Link>
          <CustomButton
            title={`${brand?.brandId != 0 ? "Save" : "Add"}`}
            textStyles="font-bold text-base"
            btnType="submit"
            containerStyles="text-slate-700 border border-black hover:bg-slate-300 rounded-md bg-slate-100 w-[100px]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUpdateBrand;
