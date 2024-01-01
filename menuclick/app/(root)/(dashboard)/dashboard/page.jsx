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
import { useEffect, useState, Fragment } from "react";
import { Transition, Popover } from "@headlessui/react";

const DashBoard = () => {
  const { data: session } = useSession();
  const {
    data: fetchedData,
    error,
    isLoading: loading,
  } = useUserShop({ userId: session?.user?.id });

  const [isLoading, setIsLoading] = useState(false);

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteShop, setDeleteShop] = useState(false);

  const [userShop, setUserShop] = useState(null);
  const [shopData, setShopData] = useState([]);

  useEffect(() => {
    if (fetchedData) {
      setShopData(fetchedData);
    }

    if (error) {
      console.error("Error :", error);
      toast("Uh-oh! There was an issue fetching shop details");
    }
  }, [error, fetchedData]);

  const handleCreateBtn = async (newShop) => {
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
          setShopData((data) => [...data, response.data]);
          toast("Hooray! You've successfully added a new shop ");
          //window.location.href = "/dashboard";
        }
        setAddIsOpen(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBtn = async (editShop) => {
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
          shopId: userShop.id,
          name: editShop.name,
          about: editShop.about,
          email: editShop.email,
          phoneNumber: editShop.phonenumber,
          location: editShop.location,
        });
        if (response.statusText === "FAILED") {
          toast.error(response.data);
        } else {
          let updatedShop = response.data;
          let shopIndex = shopData.findIndex(
            (shopPost) => shopPost.id === updatedShop.id
          );
          if (shopIndex !== -1) {
            setShopData((data) => {
              const updatedShopData = [...data];
              updatedShopData[shopIndex] = updatedShop;
              return updatedShopData;
            });
          }
          toast("Success! Your changes have been saved.");
          //window.location.href = "/dashboard";
        }
        setEditIsOpen(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setUserShop(null);
      setIsLoading(false);
    }
  };

  const handleDeleteBtn = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/shop", {
        data: {
          id: userShop.id,
        },
      });
      if (response.statusText === "FAILED") {
        toast.error(response.data);
      } else {
        setShopData((data) => data.filter((post) => post.id !== userShop.id));
        toast("Hooray! The Shop has been removed successfully.");
      }
      setDeleteShop(false);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    } finally {
      setUserShop(null);
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
          shopData={shopData}
          setAddIsOpen={setAddIsOpen}
          setEditIsOpen={setEditIsOpen}
          setDeleteShop={setDeleteShop}
          setShop={setUserShop}
          isLoading={loading}
        />
      </div>
      <ShopAddEditModal
        isOpen={addIsOpen}
        setIsOpen={setAddIsOpen}
        title="Add Shop"
        btnLabel="save"
        onSave={handleCreateBtn}
        isLoading={isLoading}
      />

      <ShopAddEditModal
        isOpen={editIsOpen}
        setIsOpen={setEditIsOpen}
        title="Edit Shop"
        btnLabel="save"
        onSave={handleUpdateBtn}
        isLoading={isLoading}
        data={userShop}
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

const ShopCard = ({
  shopData,
  setAddIsOpen,
  setEditIsOpen,
  setDeleteShop,
  setShop,
  isLoading,
}) => {
  const styleShopCard = {
    card: "rounded-xl border-2 border-color p-4 w-full h-full animation-div overflow-hidden",
    h2: "font-semibold text-base sm:text-lg text-color",
    h3: "text-xs text-gray-400",
    p: "sm:mt-1 block text-color text-sm",
    menu: "hover:bg-gray-200 dark:hover:bg-gray-500 p-1 text-sm md:text-xs rounded-lg",
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        shopData.map((data, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between  ${styleShopCard.card}`}
          >
            <PopOver
              post={data}
              setEditIsOpen={setEditIsOpen}
              setDeleteShop={setDeleteShop}
              styleShopCard={styleShopCard}
              setShop={setShop}
            />
            <Link href={`dashboard/${data.id}`}>
              <h2 className={styleShopCard.h2}>{data.name}</h2>
              <p className={`sm:text-base ${styleShopCard.p}`}>{data.about}</p>
              <div className="flex justify-between">
                <h3 className={styleShopCard.h3}>{data.email}</h3>
                <h3 className={styleShopCard.h3}>{data.location}</h3>
              </div>
            </Link>
          </div>
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

const PopOver = ({
  post,
  setEditIsOpen,
  setDeleteShop,
  styleShopCard,
  setShop,
}) => {
  const handleEditBtn = (post) => {
    setShop(post);
    setEditIsOpen(true);
  };

  const handleDeleteBtn = (post) => {
    setShop(post);
    setDeleteShop(true);
  };

  return (
    <Popover as="div" className="relative">
      <Popover.Button className="absolute right-0 flex rounded-full outline-none">
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
        <Popover.Panel className="flex flex-col absolute right-0 z-10 mt-4 w-32 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
          <p className={styleShopCard.menu} onClick={() => handleEditBtn(post)}>
            Edit
          </p>
          <p
            className={styleShopCard.menu}
            onClick={() => handleDeleteBtn(post)}
          >
            Delete
          </p>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
