"use client";

import { shops } from "@/utils/constants";
import { ShopModal } from "@/components/modal";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styleDashboard = {
    card: "rounded-xl border-2 border-color p-4 w-full h-full animation-div overflow-hidden",
    h2: "font-semibold text-base sm:text-lg text-color",
    p: "sm:mt-1 block text-color text-sm",
  };

  const handleCreate = () => {
    setIsLoading(true);
    try {
      toast.success("You are successfully signed out");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:mx-4 flex flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">My Shops</h1>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg animation-div hidden sm:block"
        >
          <span className="text-white dark:text-black font-medium text-sm">
            New Shop
          </span>
        </button>
      </div>
      <div className="flex-center w-full mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
          {shops.map((data, index) => (
            //70
            <Link key={index} href={`dashboard/${data.id}`}>
              <div
                className={`flex flex-col justify-between  ${styleDashboard.card}`}
              >
                <h2 className={styleDashboard.h2}>{data.name}</h2>
                <p className={`sm:text-base  ${styleDashboard.p}`}>
                  {data.about}
                </p>
                <div className="flex justify-between">
                  <h3 className="text-xs text-gray-400">{data.email}</h3>
                  <h3 className="text-xs text-gray-300">
                    {data.location},{data.country}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
          <div
            className={`flex-center flex-col  ${styleDashboard.card}`}
            onClick={() => setIsOpen(true)}
          >
            <SquaresPlusIcon className="h-8 text-color" />
            <h2 className={styleDashboard.h2}>Add new shop</h2>
            <p className={`text-center ${styleDashboard.p}`}>
              Add a new restaurant to your digital menu
            </p>
          </div>
        </div>
      </div>
      <ShopModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Shop"
        btnLabel="save"
        handleBtn={handleCreate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashBoard;
