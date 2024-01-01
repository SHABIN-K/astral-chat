import { toast } from "sonner";
import { signOut } from "next-auth/react";

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

export { onSignOut };
