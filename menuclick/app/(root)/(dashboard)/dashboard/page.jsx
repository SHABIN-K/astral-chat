import { SquaresPlusIcon } from "@heroicons/react/24/outline";

const DashBoard = () => {
  const styleDashboard = {
    card: "rounded-xl border-2 border-color p-4 max-w-sm min-h-32 max-h-32 hover:scale-105 transition duration-500",
    h2: "font-semibold text-base sm:text-lg text-color",
    p: "sm:mt-1 block text-color text-sm",
  };
  return (
    <div className="sm:mx-4 flex flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">My Shops</h1>
        <button
          type="button"
          className="bg-black dark:bg-white rounded-md px-3 hover:shadow-lg hover:scale-105 transition duration-500 hidden sm:block"
        >
          <span className="text-white dark:text-black font-medium text-sm">
            New Shop
          </span>
        </button>
      </div>
      <div className="flex-start w-full mt-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {Array(5)
            .fill(null)
            .map((item, index) => (
              <div className={styleDashboard.card} key={index}>
                <h2 className={styleDashboard.h2}>For Developers</h2>
                <p className={`sm:text-base ${styleDashboard.p}`}>
                  Prototype ideas online, without depending on your local
                  environment.
                </p>
              </div>
            ))}
          <div className={`flex-center flex-col  ${styleDashboard.card}`}>
            <SquaresPlusIcon class="h-8 text-color" />
            <h2 className={styleDashboard.h2}>Add new shop</h2>
            <p className={`text-center ${styleDashboard.p}`}>
              Start creating a new digital menu by adding a new restaurant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
