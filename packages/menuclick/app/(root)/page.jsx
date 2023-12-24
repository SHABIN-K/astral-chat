import { Background } from "@/public/assets";
import Footer from "@/components/web/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-10 sm:mt-28">
      <svg
        className="absolute pointer-events-none inset-0 h-full w-full stroke-gray-200 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
        aria-hidden
      >
        <defs>
          <pattern
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
        />
      </svg>
      <div
        aria-hidden
        className="absolute top-10 w-[1000px] z-10 h-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#A4A4A3, transparent 50%)" }}
      />
      <div className="absolute right-0 top-0 mr-10">
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
