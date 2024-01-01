"use client";

import { useTheme } from "next-themes";
import { PuffLoader, ClipLoader } from "react-spinners";

const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className="flex-center h-[100vh] ">
      <PuffLoader
        size={65}
        color={`${theme == "dark" ? "#ffffff" : "#000000"}`}
      />
    </div>
  );
};

export default Loader;

const WaitingLoader = ({ size, color }) => {
  return <ClipLoader size={size} color={color} />;
};

export { WaitingLoader };
