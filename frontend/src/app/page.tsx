"use client";
import { useStore } from "@/components/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { claims } = useStore();

  useEffect(() => {
    if (claims?.find((x) => x.value === "ManageOrder")) {
      router.push("/pages/order");
    } else {
      router.push("/pages/home");
    }
  }, [claims]);

  return <></>;
}
