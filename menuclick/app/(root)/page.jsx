"use client";

import Footer from "@/components/web/Footer";
import Background from "@/components/ui/Background";
//import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center space-y-10 ">
      <Background size={0} />
      {/* <div className="absolute right-0 top-0 mr-10">
        <ThemeSwitcher />
  </div> */}

      <div>
        <div className="flex flex-col items-center space-y-6 mt-20">
          <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
            Welcome to MenuCLick <br /> Digital Food Menus for Restaurants
          </h1>

          <p className="text-lg font-medium text-gray-500 dark:text-gray-300 items-center text-center">
            Create, update, and easily manage your restaurant menu online.
          </p>
          <button
            type="button"
            className="w-[180px] bg-black dark:bg-white rounded-lg  py-[10px] px-4 
      hover:shadow-lg hover:scale-105 transition duration-500"
            onClick={() => router.push("/dashboard")}
          >
            <span className="text-white dark:text-black font-semibold text-lg ">
              {session ? "Go to Dashboard" : "Get Started"}
            </span>
          </button>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
