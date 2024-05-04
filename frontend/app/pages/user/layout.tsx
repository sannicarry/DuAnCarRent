import { Sidebar } from "@/src/components";
import "../../globals.css";

export const metadata = {
  title: "User",
  description: "Generated by Duc Vy",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="content grid grid-cols-5 bg-[#F6F7F9]">
      <Sidebar />
      <div className="col-span-4 bg-white ml-16 border-2 rounded-md">
        {children}
      </div>
    </div>
  );
}
