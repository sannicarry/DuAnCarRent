"use client";

import { useEffect, useState } from "react";
import { fetchOrderCount, fetchOrders } from "@/utils";
import { useStore } from "@/components/Store";
import OrderManagement from "@/views/orders/OrderManagement";

const page = () => {
  const {
    user,
    car,
    locationFrom,
    dateFrom,
    timeFrom,
    locationTo,
    dateTo,
    timeTo,
    totalPrice,
    status,
    searchValue,
    setSearchValue,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    loading,
    setLoading,
    success,
    setSuccess,
    setCurrentPageAdmin,
    allOrders,
    setAllOrders,
  } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("Order");
  }, []);

  const getOrders = async (searchValue?: string, currentPage?: number) => {
    try {
      setLoading(true);
      const result = await fetchOrders(
        token,
        currentPage,
        itemsPerPage,
        searchValue
      );
      setAllOrders(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setSuccess(false);
    }
  };

  useEffect(() => {
    getOrders(searchValue, currentPage);
  }, [success, searchValue, currentPage]);

  const getCountOrder = async () => {
    try {
      const count = await fetchOrderCount(searchValue, token);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCountOrder();
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [success, searchValue, totalPages]);
  return (
    <>
      <OrderManagement allOrders={allOrders} currentPage={currentPage} />
    </>
  );
};

export default page;
