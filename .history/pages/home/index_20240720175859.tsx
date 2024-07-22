// pages/index.tsx

import React from "react";
import Navbar from "../../Components/Navbar";
import style from "./index.module.scss"; // Ensure this module is imported correctly if used
import { Boxes } from "../../Components/bg"; // Adjust path if necessary
import { cn } from "../../lib/utils"; // Ensure this path is correct

const Index = () => {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20" style={{ maskImage: "radial-gradient(transparent, white)" }} />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-30")}>
        Tailwind is Awesome
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-30">
        Framer Motion is the best animation library ngl
      </p>
      <Boxes className={cn("absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-10")} />
    </div>
  );
};

export default Index;
