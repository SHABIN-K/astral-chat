"use client";
import { useTheme } from "next-themes";
import { PuffLoader } from "react-spinners";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center h-[100vh] bg-color">
      <PuffLoader
        size={65}
        color={`${theme == "dark" ? "#ffffff" : "#000000"}`}
      />
    </div>
  );
}
