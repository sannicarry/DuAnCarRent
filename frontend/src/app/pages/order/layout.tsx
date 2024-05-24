import { Sidebar } from "@/components";

export const metadata = {
  title: "Order",
  description: "Generated by Duc Vy",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex content bg-[#F6F7F9]">
      <Sidebar />
      <div className="w-full ml-16 bg-white border-2 rounded-md">
        {children}
      </div>
    </div>
  );
}
