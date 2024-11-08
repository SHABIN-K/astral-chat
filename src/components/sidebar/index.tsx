import { cn } from "@/lib/utils";
import React from "react";

const SideBar = () => {
  const expand = false;
  return (
    <div
      className={cn(
        "bg-cream dark:bg-neutral-950 h-full w-[60px] fill-mode-forwards fixed md:relative",
        expand == undefined && "",
        // expand == true
        //   ? "animate-open-sidebar"
        //   : expand == false && "animate-close-sidebar"
      )}
    >
      
    </div>
  );
};

export default SideBar;
