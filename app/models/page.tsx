import { CustomButton, ModelsTabWrapper } from "@/components";
import React from "react";

function page() {
  return (
    <div className="h-full w-full bg-white rounded-bl-2xl">
      <div className="flex gap-4 px-8 mb-8">
        <h2 className="text-[22px] font-bold text-dark-blue">Models</h2>
        <CustomButton
          title="Add"
          containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[8px] gap-2 hover-blue"
          textStyles="text-[14px] font-medium text-white"
          rightIcon="/plus.svg"
          // handleClick={() => setIsOpen(true)}
        />
      </div>
      <ModelsTabWrapper />
    </div>
  );
}

export default page;
