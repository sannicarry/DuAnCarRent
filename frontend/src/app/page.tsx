"use client";
import { useStore } from "@/components/Store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { claims } = useStore();
  let loadingPage = true;

  useEffect(() => {
    loadingPage = false;
    if (claims?.find((x) => x.value === "ManageDashboard")) {
      router.push("/pages/dashboard");
    } else {
      router.push("/pages/home");
    }
  }, [claims]);

  return (
    <>
      {loadingPage && (
        <div className="z-50 fixed flex justify-center items-center bg-slate-600 top-0 right-0 h-full w-full opacity-60">
          <Image
            src="/loader.svg"
            alt="loading"
            width={500}
            height={500}
            className="animate-spin mt-10"
          ></Image>
        </div>
      )}
    </>
  );
}
