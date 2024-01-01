"use client";

import { Loader, PopOver } from "@/components/ui";
import { useShopStore } from "@/utils/state/use-Post";
import { ConfirmModal, ShopAddEditModal } from "@/components/modal";
import { useDeleteModalStore, useEditModalStore } from "@/utils/state";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const UserShop = ({ params }) => {
  const router = useRouter();
  const { shops } = useShopStore();

  useEffect(() => {
    // Check if the provided shop ID is not in the array of shop IDs
    if (!shops.map((shop) => shop.id).includes(params.shopId)) {
      // If the ID is not in the array, log an error message and redirect to the dashboard
      console.error("Wrong shop Please check again");
      router.push("/dashboard");
    } else {
      // If the ID is in the array, set the state variable to true
      const foundShop = shops.find((shop) => shop.id === params.shopId);
      setCurrentShop(foundShop);
      setIsEffect(true);
    }
  }, [params.shopId, router, shops]);

  const { isOpen: editOpen, onClose: editClose } = useEditModalStore();
  const { isOpen: deleteOpen, onClose: deleteClose } = useDeleteModalStore();

  const [isLoading, setIsLoading] = useState(false);

  const [isEffect, setIsEffect] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);

  return (
    <>
      {isEffect ? (
        <div className="sm:mx-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-medium">{currentShop.name}</h1>
            <div className="flex">
              <PopOver post={currentShop} setShop={setCurrentShop} />
              <button
                type="button"
                className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg animation-div"
              >
                <span className="text-white dark:text-black">
                  <EllipsisHorizontalIcon className="h-6 w-6" />
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <ShopAddEditModal
        isOpen={editOpen}
        onClose={editClose}
        onSave={handleUpdateBtn}
        isLoading={isLoading}
        title="Edit Shop"
        btnLabel="save"
        data={currentShop}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={deleteClose}
        onConfirm={handleDeleteBtn}
        isLoading={isLoading}
        title="Delete Shop"
        btnLabel="Confirm"
      />
    </>
  );
};

export default UserShop;
