import React from "react";
import Image from "next/image";
import { CustomButton } from ".";

function TestModel() {
  return (
    <div className="bg-white rounded-lg mx-6 my-4 p-4 border flex flex-col justify-start items-start">
      <h2 className="w-full border-b border-grey pb-2 flex gap-2 text-[15px] font-medium">
        Test Model{" "}
        <Image
          src="/bolt.svg"
          alt="logo_bookend"
          width={24}
          height={24}
          className="object-contain "
        />
      </h2>
      <div className="flex w-full gap-6 pt-4">
        <div className="w-[75%] h-40 my-2">
          {" "}
          <div className="flex justify-between pt-4 ml-4 pb-2 border-b">
            <h2 className="flex gap-2 text-sm font-normal	">
              Text to Image{" "}
              <Image
                src="/info.svg"
                alt="logo_bookend"
                width={14}
                height={14}
                className="object-contain "
              />
            </h2>{" "}
            <h2 className="flex gap-2 text-sm font-normal">
              Get End-Point{" "}
              <Image
                src="/arrow_right.svg"
                alt="logo_bookend"
                width={20}
                height={20}
                className="object-contain"
              />
            </h2>
          </div>
          <div className="flex mt-6 ml-4">
            <input
              className="w-full py-[4px] px-4 rounded-[4px] border border-light-grey text-sm"
              placeholder="Enter the prompt here"
            />
            <CustomButton
              title="Compute"
              containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
              textStyles="text-[15px] font-medium text-white"
              rightIcon="/arrow_right.svg"
              // handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        <div className="bg-light-grey flex flex-col w-[324px] border my-2 gap-2 p-4 rounded-lg h-[400px]">
          <h3 className="text-[#444445] font-medium text-base">
            Instructions and Prompt Help
          </h3>
          <p className="text-xs my-2">
            Morem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per.
          </p>
        </div>
      </div>
      <CustomButton
        title="Deployment History"
        containerStyles="bg-light-grey rounded-[8px] py-[8px] px-6 gap-2 ml-6"
        textStyles="text-[15px] text-[#C0C0C0] font-medium text-white"
        rightIcon="/history.svg"
        // handleClick={() => setIsOpen(true)}
      />
    </div>
  );
}

export default TestModel;
