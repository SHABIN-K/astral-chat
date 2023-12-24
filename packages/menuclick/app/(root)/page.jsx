import { Background } from "@/public/assets";
import Footer from "@/components/web/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 ">
      <Background />
      <div
        aria-hidden
        className="absolute top-10 w-full z-10 h-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#A4A4A3, transparent 50%)" }}
      />
      <div className="absolute right-0 top-0 mr-10">
        <ThemeSwitcher />
      </div>
      <div>
        <div className="flex flex-col items-center space-y-6 mt-20">
          <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
            Welcome to MenuCLick <br /> Digital Food Menus for Restaurants
          </h1>

          <p className="text-lg font-medium text-gray-900 dark:text-white items-center text-center">
            Create, update, and easily manage your restaurant menu online.
          </p>
          <button
            className="w-[180px] bg-black dark:bg-white rounded-lg  py-[10px] px-4 
      hover:shadow-lg hover:scale-105 transition duration-500"
          >
            <span className="text-white dark:text-black font-semibold text-lg ">
              Comming Soon !
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
