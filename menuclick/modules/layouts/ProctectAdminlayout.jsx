"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Loader from "@/components/ui/Loader";

export const ProtectedAdminLayout = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    // if the user is not authorized, redirect to the login page
    if (status === "unauthenticated") router.replace("/auth");
  }, [status, router]);
  // if the user is authorized, render the page
  if (status === "authenticated") return <div>{children}</div>;

  // if the user refreshed the page or somehow navigated to the protected page
  return <Loader />;
};
