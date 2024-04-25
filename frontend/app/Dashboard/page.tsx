"use client";

import { useStore } from "@/components/Store";
import { useEffect } from "react";

const page = () => {
  const { setCurrentPageAdmin } = useStore();
  useEffect(() => {
    setCurrentPageAdmin("Dashboard");
  }, []);
  return (
    <div className="col-span-4 bg-white ml-16 border-2 rounded-md">page</div>
  );
};

export default page;
