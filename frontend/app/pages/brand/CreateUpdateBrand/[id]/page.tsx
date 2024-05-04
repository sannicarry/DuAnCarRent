"use client";

import { useStore } from "@/src/components/Store";
import CreateUpdateBrand from "@/src/views/brands/CreateUpdateBrand";
import { fetchBrandByBrandId } from "@/src/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const [brandId, setBrandId] = useState(0);

  const { brand, setBrand, token } = useStore();

  useEffect(() => {
    const brandId = searchParams.get("brandId");
    if (brandId) {
      setBrandId(parseInt(brandId));
    }
  }, [searchParams]);

  const brandModel = {
    brandId: 0,
    brandName: "",
    address: "",
    phone: "",
  };

  useEffect(() => {
    if (brandId != 0) {
      const brand = async () => {
        const result = await fetchBrandByBrandId(brandId, token);
        if (result) {
          setBrand(result);
        }
      };
      brand();
    } else {
      setBrand(brandModel);
    }
  }, [brandId, token]);
  return (
    <>
      <CreateUpdateBrand brand={brand} />
    </>
  );
};

export default page;
