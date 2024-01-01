import axios from "axios";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { ShopValidation } from "../validations/shop";

const onSignOut = (setIsLoading) => {
  setIsLoading(true);
  try {
    signOut({ callbackUrl: "/" });
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
    toast.success("You are successfully signed out");
  }
};

const onUpdate = async (
  currentData,
  IsLoading,
  shop,
  shopData,
  setShopData,
  close,
  userShop
) => {
  IsLoading(true);

  const userInput = {
    name: currentData.name,
    about: currentData.about,
    email: currentData.email,
    phoneNumber: currentData.phonenumber,
    location: currentData.location,
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
        shopId: shop.id,
        name: currentData.name,
        about: currentData.about,
        email: currentData.email,
        phoneNumber: currentData.phonenumber,
        location: currentData.location,
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
      close(false);
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  } finally {
    userShop(null);
    IsLoading(false);
  }
};

const onDelete = async (IsLoading, currenShop, ShopData, close, userShop) => {
  IsLoading(true);
  try {
    const response = await axios.delete("/api/shop", {
      data: {
        id: currenShop.id,
      },
    });
    if (response.statusText === "FAILED") {
      toast.error(response.data);
    } else {
      ShopData((data) => data.filter((post) => post.id !== currenShop.id));
      toast("Hooray! The Shop has been removed successfully.");
    }
    close(false);
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  } finally {
    userShop(null);
    IsLoading(false);
  }
};

export { onSignOut, onUpdate, onDelete };
