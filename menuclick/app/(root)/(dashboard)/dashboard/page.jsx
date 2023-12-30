"use client";

import axios from "axios";
import { shops } from "@/utils/constants";
import { ShopAddEditModal } from "@/components/modal";
import { ShopValidation } from "@/utils/validations/shop";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

const DashBoard = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [addIsOpen, setAddIsOpen] = useState(false);
  //const [editIsOpen, setEditIsOpen] = useState(false);
  //const [deleteShop, setDeleteShop] = useState(false);

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
  /*
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
  */
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
          setAddIsOpen={setAddIsOpen}
          //setEditIsOpen={setEditIsOpen}
          //setDeleteShop={setDeleteShop}
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
      {/* 
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
      */}
    </div>
  );
};

export default DashBoard;

const ShopCard = ({ setAddIsOpen }) => {
  const styleShopCard = {
    card: "rounded-xl border-2 border-color p-4 w-full h-full animation-div overflow-hidden",
    h2: "font-semibold text-base sm:text-lg text-color",
    p: "sm:mt-1 block text-color text-sm",
    menu: (active) =>
      `${
        active ? "bg-gray-200 dark:bg-gray-500  " : ""
      } p-1 text-sm rounded-lg`,
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
      {shops.map((data, index) => (
        //70
        <Link key={index} href={`dashboard/${data.id}`}>
          <div
            className={`flex flex-col justify-between  ${styleShopCard.card}`}
          >
            <div className="flex justify-between items-center">
              <h2 className={styleShopCard.h2}>{data.name}</h2>
            </div>
            <p className={`sm:text-base  ${styleShopCard.p}`}>{data.about}</p>
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
