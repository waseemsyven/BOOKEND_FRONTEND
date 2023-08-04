import React from "react";
import Image from "next/image";
import { CustomButton } from ".";

function HeroCard() {
  return (
    <div className="flex flex-col items-start justify-start mt-2 w-full mx-auto p-4">
      <h2 className="text-primary text-base font-semibold pb-2">Dashboard</h2>
      <div className="flex items-center w-full border rounded-[8px] p-4">
        {" "}
        <Image
          src="/placeholder.svg"
          alt="placeholder"
          width={200}
          height={200}
        />
        <div className="flex flex-col items-start justify-between px-4">
          <h2 className="text-dark-blue text-[32px] font-semibold pb-2">
            Explore Bookend.ai Models
          </h2>
          <p className="text-base text-grey font-light pb-4">
            Learn how enterprises can effectively implement and utilize
            Generative AI in their operations. This content explores strategies
            to operationalize and leverage the power of AI models, empowering
            businesses to harness creativity, enhance productivity, and drive
            innovation. Discover the transformative potential of Generative AI
            for your organization's success.
          </p>
          <div className="flex justify-start items-center gap-4">
            <CustomButton
              title="Learn More"
              containerStyles="bg-[#8080800D] rounded-[8px] py-[8px] px-6 hover-white"
              textStyles="text-[15px] font-medium text-dark-blue"
              // handleClick={() => setIsOpen(true)}
            />
            <CustomButton
              title="Explore Models"
              containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
              textStyles="text-[15px] font-medium text-white"
              rightIcon="/arrow_right.svg"
              // handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
