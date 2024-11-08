import React from "react";
import SideBar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashBoardLayout({ children }: Props) {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
        {children}
      </div>
    </div>
  );
}
