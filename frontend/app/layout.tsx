import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { useStore } from "@/components/Store";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Car Rent",
  description: "Discover the best car in the world!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
