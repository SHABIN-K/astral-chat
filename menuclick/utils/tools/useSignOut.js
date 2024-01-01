import { toast } from "sonner";
import { signOut } from "next-auth/react";

export const handleSignOutButton = (setIsLoading, setIsOpen) => {
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
