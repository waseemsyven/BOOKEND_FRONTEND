import React from "react";
import { CustomButton } from ".";

function ModalStateCard() {
  return (
    <div className="px-6 bg-white pt-6 pb-2">
      <div className=" flex justify-between items-center">
        <div className="">
          <h2 className="text-[22px] text-dark-blue font-bold">
            SD-XL 1.0-base Model Card
          </h2>
        </div>
        <div className="flex gap-4">
          <CustomButton
            title="Train Model"
            containerStyles="bg-white border-2 border-dark-blue rounded-[4px] py-[4px] px-[12px] gap-2 hover-white"
            textStyles="text-[15px] font-medium text-dark-blue"
            rightIcon="/bolt.svg"
            // handleClick={() => setIsOpen(true)}
          />
          <CustomButton
            title="Deploy"
            containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[12px] gap-2 hover-blue"
            textStyles="text-[15px] font-medium text-white"
            rightIcon="/rocket.svg"
            // handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className="flex gap-6 py-4">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-normal border-r-2 pr-6  border-[#C0C0C0] text-xs text-[#666]">
            Model Type
          </h2>
          <p className="font-medium	pr-6  text-xs text-black">Public</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-normal border-r-2 pr-6  border-[#C0C0C0] text-xs text-[#666]">
            Status
          </h2>
          <p className="font-medium	pr-6  text-xs text-black">Deployed</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-normal border-r-2 w-full text-center border-[#C0C0C0] text-xs text-[#666]">
            Added-on
          </h2>
          <p className="font-medium text-xs text-black px-4">
            MM DD YYYY, HH:MM
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-normal border-r-2 pr-6  border-[#C0C0C0] text-xs text-[#666]">
            Training Method
          </h2>
          <p className="font-medium	pr-6  text-xs text-black">Fine-tuned</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-normal border-r-2 pr-6  border-[#C0C0C0] text-xs text-[#666]">
            Tier
          </h2>
          <p className="font-medium	pr-6  text-xs text-black">Diamond</p>
        </div>
      </div>
    </div>
  );
}

export default ModalStateCard;
