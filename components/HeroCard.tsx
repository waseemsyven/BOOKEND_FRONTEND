import React from "react";
import Image from "next/image";
import { CustomButton } from ".";

function HeroCard() {
  return (
    <div className="flex flex-col items-start justify-start mt-2 w-full mx-auto p-4 px-6">
      <h2 className="text-dark-blue text-lg font-semibold pb-2">Dashboard</h2>
      <div className="flex items-center w-full rounded-[8px] p-4 px-6 gap-4 shadow bg-white">
        {" "}
        <Image
          src="/placeholder.svg"
          alt="placeholder"
          width={80}
          height={80}
        />
        <div className="flex flex-col items-start justify-between px-4">
          <h2 className="text-dark-blue text-[24px] font-semibold pb-2">
            Explore Bookend.ai Models
          </h2>
          <p className="text-sm text-[#808080] font-normal	 pb-4">
            Learn how enterprises can effectively implement and utilize
            Generative AI in their operations. This content explores strategies
            to operationalize and leverage the power of AI models, empowering
            businesses to harness creativity, enhance productivity
          </p>
        </div>
        <CustomButton
          title="Explore Models"
          containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue p-2 w-[400px]"
          textStyles="text-[15px] font-medium text-white"
          rightIcon="/arrow_right.svg"
        />
      </div>
    </div>
  );
}

export default HeroCard;
