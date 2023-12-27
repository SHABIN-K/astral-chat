"use client";

import { shops } from "@/utils/constants";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DashBoard = () => {
  const styleDashboard = {
    card: "rounded-xl border-2 border-color p-4 max-w-sm min-h-32 max-h-32 animation-div",
    h2: "font-semibold text-base sm:text-lg text-color",
    p: "sm:mt-1 block text-color text-sm",
  };

  const handleCreate = () => {
    toast("successfully created new shop");
  };

  return (
    <div className="sm:mx-4 flex flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">My Shops</h1>
        <button
          onClick={handleCreate}
          type="button"
          className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg animation-div hidden sm:block"
        >
          <span className="text-white dark:text-black font-medium text-sm">
            New Shop
          </span>
        </button>
      </div>
      <div className="flex-start w-full mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
            onClick={handleCreate}
          >
            <SquaresPlusIcon className="h-8 text-color" />
            <h2 className={styleDashboard.h2}>Add new shop</h2>
            <p className={`text-center ${styleDashboard.p}`}>
              Start creating a new digital menu by adding a new restaurant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
