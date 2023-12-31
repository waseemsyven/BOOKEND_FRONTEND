import React from "react";
import Image from "next/image";
import { CustomButton } from ".";

function QuestionAnswering({ task }: any) {
  return (
    <div className="bg-white rounded-lg mx-6 my-4 p-4 border flex flex-col justify-start items-start">
      <h2 className="w-full border-b border-[#808080] pb-2 flex gap-2 text-[15px] font-medium">
        Test Model{" "}
        <Image
          src="/bolt.svg"
          alt="logo_bookend"
          width={17}
          height={17}
          className="object-contain "
        />
      </h2>
      <div className="flex w-full gap-6 pt-4">
        <div className="w-[75%] my-2">
          {" "}
          <div className="flex justify-between pt-4  pb-2 border-b border-[#E8E7E7]">
            <h2 className="flex items-center gap-2 text-sm font-normal">
              QuestionAnswering
              <Image
                src="/info.svg"
                alt="logo_bookend"
                width={14}
                height={14}
                className="object-contain "
              />
            </h2>{" "}
            <h2 className="flex gap-2 text-[13px] font-medium">
              Get End-Point{" "}
              <Image
                src="/expand_circle.svg"
                alt="logo_bookend"
                width={20}
                height={20}
                className="object-contain"
              />
            </h2>
          </div>
          <div className="flex mt-6 gap-2 pb-2 items-start w-full">
            <input
              className="w-full border border-[#E8E7E7] rounded-[4px] text-sm font-normal p-2"
              placeholder="Enter the prompt here"
            />
            <CustomButton
              title="Compute"
              containerStyles="bg-dark-blue rounded-[6px] gap-2 hover-blue py-2 px-4"
              textStyles="text-[16px] font-medium text-white"
            />
          </div>
          <h2 className="text-sm font-normal text-[#666] ml-2 mb-2">Context</h2>
          <textarea className="w-full border border-[#E8E7E7]"></textarea>
          <input className="w-full bg-[#F5F9FF] h-40 border rounded-sm" />
        </div>
        <div className="bg-[#F7FAFB] flex flex-col w-[324px] my-2 gap-2 p-4 rounded-lg h-[400px]">
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
        containerStyles="bg-light-grey rounded-[8px] py-[8px] px-6 gap-2 mb-4"
        textStyles="text-[15px] text-[#C0C0C0] font-medium"
        rightIcon="/history.svg"
      />
    </div>
  );
}

export default QuestionAnswering;
