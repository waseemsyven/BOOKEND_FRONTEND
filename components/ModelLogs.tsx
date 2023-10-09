"use client";
import React from "react";
import Image from "next/image";

function ModelLogs({ filteredModel, modelLogs }: any) {
  const { model_name, model_id, task, base_model, tier, dataset_name, source } =
    filteredModel;

  const firstLog = modelLogs && modelLogs[0];
  //@ts-ignore
  const addedOn = firstLog && firstLog.timestamp;

  if (!filteredModel.status) {
    return (
      <h2 className="text-sm font-semibold h-40">
        No Logs available for this model!
      </h2>
    );
  }

  if (!modelLogs || modelLogs.length == 0) {
    return (
      <div className="h-60 w-full bg-gray-200 rounded animate-pulse p-4"></div>
    );
  }

  return (
    <div className="h-full w-full p-4 rounded-[8px]">
      <div className="flex justify-start items-center gap-6 mb-2">
        <Image
          src="/account_tree.svg"
          alt="logo_bookend"
          width={24}
          height={24}
          className="object-contain py-2"
        />
        <div className="flex flex-col items-start justify-start rounded-[8px] border border-[#E8E7E7] p-4 gap-2 w-full">
          <div className="flex gap-2 items-center">
            <h3 className="capitalize font-semibold	text-sm">{model_name}</h3>
            <p className="text-sm font-medium">({model_id})</p>
          </div>
          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-medium">Task</h3>:
            <h3 className="text-sm font-medium text-[#6490F7]">{task}</h3>
          </div>
          <div className="flex gap-8 border-t border-[#E8E7E7] w-full pt-2">
            {" "}
            <div className="flex items-center gap-1">
              {" "}
              <h3 className="text-sm font-medium">Base Model</h3>
              <h3 className="text-sm font-medium">:</h3>
              <h3 className="text-sm font-semibold">{base_model}</h3>
            </div>
            <div className="flex items-center gap-1">
              {" "}
              <h3 className="text-sm font-medium">Base Model Tier</h3>
              <h3 className="text-sm font-medium">:</h3>
              <h3 className="text-sm font-semibold">{tier}</h3>
            </div>
            <div className="flex items-center gap-1">
              {" "}
              <h3 className="text-sm font-medium">Dataset Name</h3>
              <h3 className="text-sm font-medium">:</h3>
              <h3 className="text-sm font-semibold">{dataset_name}</h3>
            </div>
            <div className="flex items-center gap-1">
              {" "}
              <h3 className="text-sm font-medium">Source</h3>
              <h3 className="text-sm font-medium">:</h3>
              <h3 className="text-sm font-semibold">{source}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 mt-4">
        {" "}
        <Image
          src="/log_side_icon.svg"
          alt="logo_bookend"
          width={24}
          height={94}
          className="object-contain"
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start gap-2 text-sm font-medium rounded-[4px] py-1">
            {addedOn}
            <Image
              src="/log_clock.svg"
              alt="logo_bookend"
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
          <div className="text-sm font-medium">
            Status : <span className="font-semibold">Added</span>
          </div>
        </div>
      </div>
      {modelLogs &&
        modelLogs.map((log: any, index: any) => {
          return (
            <div
              className={`flex items-center gap-10 rounded-[4px] ${
                index % 2 === 0 ? "bg-[#F7FAFB]" : "bg-[#FFFF]"
              }`}
              key={index}
            >
              {" "}
              <Image
                src="/log_side_icon.svg"
                alt="logo_bookend"
                width={24}
                height={94}
                className="object-contain"
              />
              <div className="flex flex-col">
                <div className="flex items-center justify-start gap-2 text-sm font-medium rounded-[4px] py-1">
                  {log.timestamp}
                  <Image
                    src="/log_clock.svg"
                    alt="logo_bookend"
                    width={16}
                    height={16}
                    className="object-contain py-2"
                  />
                </div>
                <div className="flex gap-6 text-sm font-medium">
                  {" "}
                  <div className="capitalize flex">
                    Status :{" "}
                    <span className="font-semibold mx-2">
                      {log.lifecycle_event == "TRAINED" ? (
                        <div className="flex ">
                          {" "}
                          <div className="bg-[#008558] text-white px-2 rounded-[4px]">
                            {log.lifecycle_event.toLowerCase()}
                          </div>
                          <Image
                            src="/check.svg"
                            alt="logo_bookend"
                            width={16}
                            height={16}
                            className="object-contain ml-2"
                          />
                        </div>
                      ) : log.lifecycle_event == "DEPLOYED" ? (
                        <div className="flex ">
                          {" "}
                          <div className="bg-[#008558] text-white px-2 rounded-[4px]">
                            {log.lifecycle_event.toLowerCase()}
                          </div>
                          <Image
                            src="/check.svg"
                            alt="logo_bookend"
                            width={16}
                            height={16}
                            className="object-contain ml-2"
                          />
                        </div>
                      ) : (
                        log.lifecycle_event.toLowerCase()
                      )}
                    </span>
                  </div>
                  <div>
                    User ID :{" "}
                    <span className="font-semibold">({log.user_id})</span>
                  </div>
                  <div className="capitalize">
                    Tier :{" "}
                    <span className="font-semibold">{log.model.tier}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ModelLogs;
