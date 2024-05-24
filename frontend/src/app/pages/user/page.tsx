"use client";

import { useEffect, useState } from "react";
import { fetchUserCount, fetchUsers } from "@/utils";
import { PhotoProps, UserProps } from "@/types";
import { useStore } from "@/components/Store";
import UserManagement from "@/views/users/UserManagement";

const page = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [userId, setUserId] = useState("");
  const [photos, setPhotos] = useState<PhotoProps[]>([]);

  const {
    searchValue,
    setSearchValue,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    token,
    username,
    email,
    birthDate,
    gender,
    isLocked,
    address,
    phone,
    claims,
    carFavorites,
    userNotifications,
    setCurrentPageAdmin,
    loading,
    setLoading,
  } = useStore();

  useEffect(() => {
    setCurrentPageAdmin("User");
  }, []);

  const getUsers = async (searchValue?: string, currentPage?: number) => {
    if (!token) {
      return;
    }

    try {
      setLoading(true);
      const result = await fetchUsers(
        token,
        currentPage,
        itemsPerPage,
        searchValue
      );
      if (result) {
        setAllUsers(result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers(searchValue, currentPage);
  }, [token, searchValue, currentPage]);

  const getCountUsers = async () => {
    if (token != "") {
      try {
        const count = await fetchUserCount(searchValue, token);
        setTotalPages(Math.ceil(count / itemsPerPage));
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    getCountUsers();
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [searchValue, totalPages]);

  return (
    <>
      <UserManagement allUsers={allUsers} currentPage={currentPage} />
    </>
  );
};

export default page;
