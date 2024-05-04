"use client";

import { CarCard, Hero, Location, Sidebar } from "@/src/components";
import { useStore } from "@/src/components/Store";
import { PhotoProps } from "@/src/types";
import { fetchBrands, fetchCars } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { userRole } = useStore();

  useEffect(() => {
    if (userRole === "Admin") {
      router.push("/pages/dashboard");
    } else {
      router.push("/pages/home");
    }
  }, [userRole]);

  return <div></div>;
}
