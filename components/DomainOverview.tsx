import React from "react";
import { CustomButton } from ".";
import { formatCountWithLeadingZeros } from "@/utils";
import Image from "next/image";

function DomainOverview({ modelsList }: any) {
  const trainedModels = modelsList.filter(
    (model: any) => model.status === "TRAINED"
  );
  const trainingModels = modelsList.filter(
    (model: any) => model.status === "TRAINING"
  );

  const deployingModels = modelsList.filter(
    (model: any) => model.status === "DEPLOYING"
  );

  const deployedModels = modelsList.filter(
    (model: any) => model.status === "DEPLOYED"
  );

  const baseModels = modelsList.filter(
    (model: any) => model.source === "public"
  );

  const trainedCount = trainedModels.length;
  const trainingCount = trainingModels.length;
  const deployingCount = deployingModels.length;
  const deployedCount = deployedModels.length;
  const baseModelsCount = baseModels.length;

  return (
    <div className="py-2 px-6 flex flex-col justify-start items-start">
      <h2 className="text-lg font-semibold">Domain Overview</h2>
      <div className="flex justify-between items-center mt-2 gap-4">
        <div className="w-[232px]  h-[160px] rounded-lg bg-white shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              {" "}
              <h2 className="text-[15px] font-medium">Total Models</h2>{" "}
              <Image
                src="/info.svg"
                alt="info logo"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <Image
              src="/deployed_code.svg"
              alt="info logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div className="flex justify-end items-start relative pr-4">
            {" "}
            {modelsList.length > 0 ? (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-14px] left-[14px]">
                {formatCountWithLeadingZeros(modelsList.length)}
              </h2>
            ) : (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-16px] left-[12px] opacity-[0.5]">
                00
              </h2>
            )}
            <div className="flex flex-col items-center justify-start">
              <h2 className="text-[36px] text-[#727383] font-medium">
                {" "}
                {formatCountWithLeadingZeros(baseModelsCount)}
              </h2>
              <h2 className="font-normal text-[11px]">Base Models</h2>
            </div>
          </div>
        </div>
        <div className="w-[232px] h-[160px] rounded-lg bg-white shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              {" "}
              <h2 className="text-[15px] font-medium">Total Trained</h2>{" "}
              <Image
                src="/info.svg"
                alt="info logo"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <Image
              src="/bolt_color.svg"
              alt="info logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div className="flex justify-end items-start relative pr-4">
            {" "}
            {modelsList.length > 0 ? (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-14px] left-[14px]">
                {formatCountWithLeadingZeros(trainedCount)}
              </h2>
            ) : (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-16px] left-[12px] opacity-[0.5]">
                00
              </h2>
            )}
            <div className="flex flex-col items-center justify-start">
              <h2 className="text-[36px] text-[#727383] font-medium">
                {formatCountWithLeadingZeros(trainingCount)}
              </h2>
              <h2 className="font-normal text-[11px]">InProgress</h2>
            </div>
          </div>
        </div>
        <div className="w-[232px] h-[160px] rounded-lg bg-white shadow p-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
              {" "}
              <h2 className="text-[15px] font-medium">Total Deployed</h2>{" "}
              <Image
                src="/info.svg"
                alt="info logo"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <Image
              src="/rocket_launch.svg"
              alt="info logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>

          <div className="flex justify-end items-start relative pr-4">
            {" "}
            {modelsList.length > 0 ? (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-14px] left-[14px]">
                {formatCountWithLeadingZeros(deployedCount)}
              </h2>
            ) : (
              <h2 className="text-[64px] font-bold text-[#47454F] absolute top-[-16px] left-[12px] opacity-[0.5]">
                00
              </h2>
            )}
            <div className="flex flex-col items-center justify-start">
              <h2 className="text-[36px] text-[#727383] font-medium">
                {formatCountWithLeadingZeros(deployingCount)}
              </h2>
              <h2 className="font-normal text-[11px]">In Progress</h2>
            </div>
          </div>
        </div>
        <div className="w-[272px] h-[160px] rounded-[8px] bg-[#131A44] shadow flex flex-col items-start justify-center py-2 px-4">
          <h2 className="font-semibold text-lg text-white">
            Explore Bookedn.ai <br></br>Models
          </h2>
          <p className="text-white font-normal	text-xs">
            Explore implementing Generative AI for businesses. Learn enterprise
          </p>
          <button className="py-2 px-6 rounded-[6px] text-base font-medium border-2 border-white text-white my-2 flex gap-2">
            Explore Now
            <Image
              src="/arrow_right.svg"
              alt="info logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DomainOverview;
