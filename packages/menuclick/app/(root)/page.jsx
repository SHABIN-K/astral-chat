import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 mt-28">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="max-w-3xl text-center font-bold text-gray-900 dark:text-white text-5xl leading-tight">
          Welcome to MenuCLick <br /> Digital Food Menus for Restaurants
        </h1>

        <p className="text-lg font-medium  text-gray-900 dark:text-white pl-5">
          Create, update, and easily manage your restaurant menu online.
        </p>
        <ThemeSwitcher />
      </div>
      <button className="text-lg w-[180px] bg-black dark:bg-white rounded-lg text-white dark:text-black font-semibold py-[10px] px-4">
        Get Started
      </button>
    </div>
  );
}
