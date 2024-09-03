import Logo from "@/components/logo";
import Tab from "@/components/tabs";
import React from "react";

function Inout() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1">
        <Tab />
      </div>
    </div>
  );
}

export default Inout;
