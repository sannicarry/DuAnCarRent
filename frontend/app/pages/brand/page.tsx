"use client";
import "../../globals.css";

import { useEffect, useState } from "react";
import { fetchBrandCount, fetchBrands } from "@/src/utils";
import { useStore } from "@/src/components/Store";
import BrandManagement from "@/src/views/brands/BrandManagement";

const Brand = () => {
  const [allBrands, setAllBrands] = useState([]);

  const [brandId, setBrandId] = useState(0);

  const {
    success,
    setSuccess,
    searchValue,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    brandName,
    address,
    phone,
    setCurrentPageAdmin,
    setLoading,
  } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("Brand");
  }, []);

  const getBrands = async (searchValue?: string, currentPage?: number) => {
    if (token != "") {
      try {
        setLoading(true);
        const result = await fetchBrands(
          {
            brandId,
            brandName,
            address,
            phone,
          },
          token,
          currentPage,
          itemsPerPage,
          searchValue
        );
        if (result.length > 0) {
          setAllBrands(result);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setSuccess(false);
      }
    }
  };

  useEffect(() => {
    getBrands(searchValue, currentPage);
  }, [token, success, searchValue, currentPage]);

  const getCountBrands = async () => {
    try {
      const count = await fetchBrandCount(token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountBrands();
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, totalPages]);

  return (
    <>
      <BrandManagement allBrands={allBrands} currentPage={currentPage} />
    </>
  );
};

export default Brand;
