import React from "react";
import { CustomButton } from ".";
import Image from "next/image";

function DomainOverview({ modelsList }: any) {
  return (
    <div className="py-2 px-6 flex flex-col justify-start items-start">
      <h2 className="text-lg font-semibold">Domain Overview</h2>
      <div className="flex justify-between items-center mt-2 gap-4">
        <div className="w-[232px] h-[160px] rounded-lg bg-white shadow-md border p-4">
          <div className="flex gap-2">
            {" "}
            <h2 className="text-sm font-medium">Total Available</h2>{" "}
            <Image
              src="/info.svg"
              alt="info logo"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <div className="flex gap-8 justify-center items-center mt-2 h-[75%]">
            {" "}
            <Image
              src="/cube_icon.svg"
              alt="info logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="pr-4 flex flex-col">
              <h2 className="text-[64px] font-semibold">
                0{modelsList.length}
              </h2>
              <p className="text-xs	font-normal tex-grey">No Data Available</p>
            </div>
          </div>
        </div>
        <div className="w-[232px] h-[160px] rounded-lg bg-white shadow-md border p-3">
          <div className="flex gap-2">
            {" "}
            <h2 className="text-sm font-medium">Training Models</h2>{" "}
            <Image
              src="/info.svg"
              alt="info logo"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <div className="flex gap-8 justify-center items-center mt-2 h-[75%]">
            {" "}
            <Image
              src="/bolt_color.svg"
              alt="info logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="pr-4 flex flex-col">
              <h2 className="text-[64px] font-semibold">00</h2>
              <p className="text-xs	font-normal tex-grey">No Data Available</p>
            </div>
          </div>
        </div>
        <div className="w-[232px] h-[160px] rounded-lg bg-white shadow-md border p-3">
          <div className="flex gap-2">
            {" "}
            <h2 className="text-sm font-medium">Total Deployed</h2>{" "}
            <Image
              src="/info.svg"
              alt="info logo"
              width={18}
              height={18}
              className="object-contain"
            />
          </div>
          <div className="flex gap-8 justify-center items-center mt-2 h-[75%]">
            {" "}
            <Image
              src="/rocket_launch.svg"
              alt="info logo"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="pr-4 flex flex-col">
              <h2 className="text-[64px] font-semibolds">00</h2>
              <p className="text-xs	font-normal tex-grey">No Data Available</p>
            </div>
          </div>
        </div>
        <div className="w-[232px] h-[160px] rounded-lg shadow-md border bg-dark-blue py-2 px-4">
          <h2 className="text-lg font-semibold text-white">
            Explore Bookedn.ai Models
          </h2>
          <p className="text-xs	font-normal text-white">
            Explore implementing Generative AI for businesses.
          </p>
          <CustomButton
            title="Explore Now"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue border border-white mt-2"
            textStyles="text-[15px] font-medium text-white"
            rightIcon="/arrow_right.svg"
            // handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default DomainOverview;
