"use client";

import { DashItems } from "@/utils/constants";
import { Loader, PopOver } from "@/components/ui";
import { useShopStore } from "@/utils/state/use-Post";
import { ShopValidation } from "@/utils/validations/shop";
import { ConfirmModal, ShopAddEditModal } from "@/components/modal";
import { useDeleteModalStore, useEditModalStore } from "@/utils/state";

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const DashCard = ({ shopId, router }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
      {DashItems.map((item, index) => (
        <div
          key={index}
          className={`rounded-xl border-2 border-color p-4 w-full h-full overflow-hidden flex flex-col justify-center items-center min-h-40 ${
            item.active === false
              ? "cursor-not-allowed hover:opacity-50"
              : "animation-div cursor-pointer"
          }`}
          onClick={() => {
            if (item.active) {
              router.push(`/dashboard/${shopId}${item.link}`);
            }
          }}
          aria-disabled={!item.active}
        >
          {item.icon}
          <h2 className="font-semibold text-base sm:text-lg text-color">
            {item.name}
          </h2>
          <p className="sm:mt-1 block text-color text-sm text-center">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
};

const UserShop = ({ params }) => {
  const router = useRouter();
  const { shops } = useShopStore();
  const { isOpen: editOpen, onClose: editClose } = useEditModalStore();
  const { isOpen: deleteOpen, onClose: deleteClose } = useDeleteModalStore();

  useEffect(() => {
    // Check if the provided shop ID is not in the array of shop IDs
    if (!shops.map((shop) => shop.id).includes(params.shopId)) {
      // If the ID is not in the array, log an error message and redirect to the dashboard
      console.error("oops!.Wrong shop url, Please try again");
      router.push("/dashboard");
    } else {
      // If the ID is in the array, set the state variable to true
      const foundShop = shops.find((shop) => shop.id === params.shopId);
      setCurrentShop(foundShop);
      setIsEffect(true);
    }
  }, [params.shopId, router, shops]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEffect, setIsEffect] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);

  const onUpdate = async (editShop) => {
    setIsLoading(true);

    const userInput = {
      name: editShop.name,
      about: editShop.about,
      email: editShop.email,
      phoneNumber: editShop.phonenumber,
      location: editShop.location,
    };
    try {
      // Validate the user input
      const validation = ShopValidation.addShop.safeParse(userInput);
      //if validation is failure, return error message
      if (validation.success === false) {
        const { issues } = validation.error;
        issues.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        // If validation is successful, make the API request
        const response = await axios.patch("/api/shop", {
          shopId: currentShop.id,
          name: editShop.name,
          about: editShop.about,
          email: editShop.email,
          phoneNumber: editShop.phonenumber,
          location: editShop.location,
        });
        if (response.statusText === "FAILED") {
          toast.error(response.data);
        } else {
          setCurrentShop(response.data);
          toast("Success! Your changes have been saved.");
        }
        editClose(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/shop", {
        data: {
          id: currentShop.id,
        },
      });
      if (response.statusText === "FAILED") {
        toast.error(response.data);
      } else {
        toast("Hooray! The Shop has been removed successfully.");
        router.push("/dashboard");
      }
      deleteClose(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {isEffect ? (
        <div className="sm:mx-4 flex flex-col">
          {/* Header */}
          <div className="flex justify-between w-full">
            <h1 className="text-lg font-medium">{currentShop.name}</h1>

            <div className="rounded-md px-2 hover:shadow-lg animation-div border border-color">
              <PopOver
                post={currentShop}
                setShop={setCurrentShop}
                button={<EllipsisHorizontalIcon className="icon" />}
                buttonStyle="flex outline-none"
              />
            </div>
          </div>
          <div className="flex-center w-full mt-5">
            <DashCard shopId={currentShop.id} router={router} />
          </div>
        </div>
      ) : (
        <Loader />
      )}

      <ShopAddEditModal
        isOpen={editOpen}
        onClose={editClose}
        onSave={onUpdate}
        isLoading={isLoading}
        title="Edit Shop"
        btnLabel="save"
        data={currentShop}
      />
      <ConfirmModal
        isOpen={deleteOpen}
        onClose={deleteClose}
        onConfirm={onDelete}
        isLoading={isLoading}
        title="Delete Shop"
        btnLabel="Confirm"
      />
    </>
  );
};

export default UserShop;
