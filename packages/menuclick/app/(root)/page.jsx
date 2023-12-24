import ThemeSwitcher from "@/components/ThemeSwitcher";
import Footer from "@/components/web/Footer";
import { Background } from "@/public/assets";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-10 sm:mt-28">
      <Background />
      <div className="absolute right-0 top-0 mr-6">
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col items-center space-y-6">
        <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
          Welcome to MenuCLick <br /> Digital Food Menus for Restaurants
        </h1>

        <p className="text-lg font-medium text-gray-900 dark:text-white items-center text-center">
          Create, update, and easily manage your restaurant menu online.
        </p>
      </div>
      <button
        className="w-[180px] bg-black dark:bg-white rounded-lg  py-[10px] px-4 
      hover:shadow-lg hover:scale-105 transition duration-500"
      >
        <span className="text-white dark:text-black font-semibold text-lg ">
          Get Started
        </span>
      </button>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
