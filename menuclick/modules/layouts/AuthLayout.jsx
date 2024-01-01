"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader } from "@/components/ui";

export const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    // if the user is authorized,redirect to the login page
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);
  // if the user is not authorized,render the page
  if (status === "unauthenticated") return <div>{children}</div>;

  // if the user refreshed the page or somehow navigated to the protected page
  return <Loader />;
};
