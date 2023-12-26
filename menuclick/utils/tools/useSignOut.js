import { toast } from "sonner";
import { signOut } from "next-auth/react";

export const handleSignOutButton = (setIsLoading, setIsOpen) => {
  setIsLoading(true);
  try {
    signOut({ callbackUrl: "/" });
    toast.success("You are successfully signed out");
  } catch (error) {
    console.log(error.message);
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
    setIsOpen(false);
  }
};
