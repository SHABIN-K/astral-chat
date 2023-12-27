const DashBoard = () => {
  return (
    <div className="sm:mx-4 flex flex-col">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-semibold">My Restaurants</h1>
        <button
          type="button"
          className="bg-black dark:bg-white rounded-md px-2 hover:shadow-lg hover:scale-105 transition duration-500 hidden sm:block"
        >
          <span className="text-white dark:text-black font-medium text-sm">
            New Restaurant
          </span>
        </button>
      </div>
      <div className="flex-start w-full mt-3">

      </div>
    </div>
  );
};

export default DashBoard;
