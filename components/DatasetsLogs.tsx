"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

function DatasetLogs() {
  const { data: session } = useSession();
  const user: any = session?.user;
  const [datasetsLogs, setdatasetsLogs] = useState<any>();

  const getModelLogs = async () => {
    console.log("datasetLogs");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/logs/dataset?start_time=2023-05-31T14:30:00Z`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setdatasetsLogs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getModelLogs();
  }, [session]);

  if (!datasetsLogs) {
    return (
      <div className="h-60 w-full bg-gray-200 rounded animate-pulse p-4"></div>
    );
  }

  return (
    <div className="w-full bg-white shadow rounded-[8px] p-4 my-4 overflow-y-scroll max-h-full">
      <h2 className="font-semibold text-base mb-2 border-b pb-2">
        Dataset Logs
      </h2>
      <div className="my-6">
        {datasetsLogs &&
          datasetsLogs.map((log: any, index: any) => {
            return (
              <div
                className={`flex ml-2 items-center gap-10 rounded-[4px] ${
                  index % 2 === 0 ? "bg-[#F7FAFB]" : "bg-[#FFFF]"
                }`}
                key={index}
              >
                {" "}
                {log.lifecycle_event == "DELETED" ? (
                  <Image
                    src="/log_delete_left.svg"
                    alt="logo_bookend"
                    width={28}
                    height={78}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/log_left_tick.svg"
                    alt="logo_bookend"
                    width={28}
                    height={78}
                    className="object-contain"
                  />
                )}
                <div className="flex flex-col">
                  <div className="flex items-center justify-start gap-2 text-sm font-medium rounded-[4px] py-1">
                    <Image
                      src="/log_clock.svg"
                      alt="logo_bookend"
                      width={16}
                      height={16}
                      className="object-contain py-2"
                    />
                    {log.timestamp}
                    <h2 className="font-semibold	text-base capitalize">
                      {log.dataset.dataset_name}
                      <span className="text-xs font-medium">
                        ({log.dataset.task})
                      </span>
                    </h2>
                  </div>
                  <div className="flex gap-6 text-sm font-medium">
                    {" "}
                    <div className="capitalize flex">
                      Status :{" "}
                      <span className="font-semibold mx-2">
                        {log.lifecycle_event == "DELETED" ? (
                          <div className="flex ">
                            {" "}
                            <div className="bg-[#D71E28] text-white px-2 rounded-[4px]">
                              {log.lifecycle_event.toLowerCase()}
                            </div>
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
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DatasetLogs;
