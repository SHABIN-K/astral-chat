"use client";
import { Loader } from "@/components/ui";
import { useShopStore } from "@/utils/state/use-Post";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const UserShop = ({ params }) => {
  const router = useRouter();
  const { shops } = useShopStore();

  const [isEffect, setIsEffect] = React.useState(false);
  const [currentShop, setCurrentShop] = React.useState(null);

  useEffect(() => {
    // Check if the provided shop ID is not in the array of shop IDs
    if (!shops.map((shop) => shop.id).includes(params.shopId)) {
      // If the ID is not in the array, log an error message and redirect to the dashboard
      console.log("Wrong shop Please check again");
      router.push("/dashboard");
    } else {
      // If the ID is in the array, set the state variable to true
      const foundShop = shops.find((shop) => shop.id === params.shopId);
      setCurrentShop(foundShop);
      setIsEffect(true);
    }
  }, [params.shopId, router, shops]);

  return (
    <>
      {isEffect ? (
        <div className="sm:mx-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between w-full">
            <h1 className="text-xl font-semibold">{currentShop.name}</h1>
            <button
              type="button"
              className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg animation-div hidden sm:block"
            >
              <span className="text-white dark:text-black font-medium text-sm">
                New Shop
              </span>
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserShop;
