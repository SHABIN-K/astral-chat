"use client";

import { ShopValidation } from "@/utils/validations/shop";
import SkeletonLoading from "@/components/skeleton/SkeletonCard";
import { ConfirmModal, ShopAddEditModal } from "@/components/modal";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import {
  EllipsisVerticalIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useUserShop } from "@/utils/hooks/useShop";
import { Menu, Transition, Popover } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";

const DashBoard = () => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteShop, setDeleteShop] = useState(false);

  const [shop, setShop] = useState("");
  const [newShop, setNewShop] = useState("");

  const handleCreateBtn = async () => {
    setIsLoading(true);

    const userInput = {
      name: newShop.name,
      about: newShop.about,
      email: newShop.email,
      phoneNumber: newShop.phonenumber,
      location: newShop.location,
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
        const response = await axios.post("/api/shop", {
          userID: session.user.id,
          name: newShop.name,
          about: newShop.about,
          email: newShop.email,
          phoneNumber: newShop.phonenumber,
          location: newShop.location,
        });
        if (response.statusText === "FAILED") {
          toast.error(response.data);
        } else {
          toast.success("Successfully created");
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBtn = () => {
    setIsLoading(true);
    try {
      toast.success("You are successfully edited");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBtn = () => {
    setIsLoading(true);
    try {
      toast.success("You are successfully Deleted");
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
          onClick={() => setAddIsOpen(true)}
          type="button"
          className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg animation-div hidden sm:block"
        >
          <span className="text-white dark:text-black font-medium text-sm">
            New Shop
          </span>
        </button>
      </div>
      <div className="flex-center w-full mt-3">
        <ShopCard
          userID={session?.user?.id}
          setAddIsOpen={setAddIsOpen}
          setEditIsOpen={setEditIsOpen}
          setDeleteShop={setDeleteShop}
        />
      </div>
      <ShopAddEditModal
        isOpen={addIsOpen}
        setIsOpen={setAddIsOpen}
        title="Add Shop"
        btnLabel="save"
        handleBtn={handleCreateBtn}
        isLoading={isLoading}
        setData={setNewShop}
      />

      <ShopAddEditModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        title="Edit Shop"
        btnLabel="save"
        handleBtn={handleUpdateBtn}
        isLoading={isLoading}
        data={shop}
        setData={setShop}
      />
      <ConfirmModal
        isOpen={deleteShop}
        setIsOpen={setDeleteShop}
        title="Delete Shop"
        btnLabel="Confirm"
        handleConfirmBtn={handleDeleteBtn}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashBoard;

const ShopCard = ({ userID, setAddIsOpen, setEditIsOpen, setDeleteShop }) => {
  const [shop, setShop] = useState([]);

  const {
    data: fetchedData,
    error,
    isLoading: loading,
  } = useUserShop({ userId: userID });

  useEffect(() => {
    if (fetchedData) {
      setShop(fetchedData);
    }

    if (error) {
      console.error("Error :", error);
      toast("Uh-oh! There was an issue fetching shop details");
    }
  }, [error, fetchedData]);

  const styleShopCard = {
    card: "rounded-xl border-2 border-color p-4 w-full h-full animation-div overflow-hidden",
    h2: "font-semibold text-base sm:text-lg text-color",
    h3: "text-xs text-gray-400",
    p: "sm:mt-1 block text-color text-sm",
    menu: "hover:bg-gray-200 dark:hover:bg-gray-500 p-1 text-sm rounded-lg",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
      {loading ? (
        <SkeletonLoading />
      ) : (
        shop.map((data, index) => (
          <Link key={index} href={`dashboard/${data.id}`}>
            <div
              className={`flex flex-col justify-between  ${styleShopCard.card}`}
            >
              <div className="flex justify-between items-center">
                <h2 className={styleShopCard.h2}>{data.name}</h2>
                <PopOver
                  setEditIsOpen={setEditIsOpen}
                  setDeleteShop={setDeleteShop}
                  styleShopCard={styleShopCard}
                />
              </div>
              <p className={`sm:text-base  ${styleShopCard.p}`}>{data.about}</p>
              <div className="flex justify-between">
                <h3 className={styleShopCard.h3}>{data.email}</h3>
                <h3 className={styleShopCard.h3}>{data.location}</h3>
              </div>
            </div>
          </Link>
        ))
      )}
      <div
        className={`flex-center flex-col  ${styleShopCard.card}`}
        onClick={() => setAddIsOpen(true)}
      >
        <SquaresPlusIcon className="h-8 text-color" />
        <h2 className={styleShopCard.h2}>Add new shop</h2>
        <p className={`text-center ${styleShopCard.p}`}>
          Add a new restaurant to your digital menu
        </p>
      </div>
    </div>
  );
};

const PopOver = ({ setEditIsOpen, setDeleteShop, styleShopCard }) => {
  return (
    <Popover as="div" className="relative">
      <Popover.Button className="relative flex rounded-full outline-none">
        <EllipsisVerticalIcon className="icon" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="flex flex-col absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
          <p className={styleShopCard.menu} onClick={() => setEditIsOpen(true)}>
            Edit
          </p>
          <p className={styleShopCard.menu} onClick={() => setDeleteShop(true)}>
            Delete
          </p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
