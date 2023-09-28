import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ModelOverview, QuestionAnswering, Summarization } from ".";

function ModelMetrics({ filteredModel }: any) {
  // const getMetrics = async () => {
  //   try {
  //     const queryParams = new URLSearchParams({
  //       epoch_start: "1694449800",
  //       epoch_end: "1694462100",
  //       metric_filters: "",
  //       endpoint_filters: "2603856839829356544",
  //     });

  //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/metrics/get-metrics?${queryParams}`;

  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const data = await response.json();

  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   getMetrics();
  // }, []);

  const [currentTab, setcurrentTab] = useState("overview");
  return (
    <>
      <div className="flex justify-between items-center my-4 px-6">
        {filteredModel && filteredModel.model_name ? (
          <div className="flex justify-start items-center gap-6">
            <div
              className={`text-black  cursor-pointer ${
                currentTab == "overview"
                  ? "font-semibold text-lg"
                  : "font-medium text-lg"
              }`}
              onClick={() => setcurrentTab("overview")}
            >
              Overview
            </div>
            <div
              className={`text-black cursor-pointer ${
                currentTab == "history"
                  ? "font-semibold text-lg"
                  : "font-medium text-lg"
              }`}
              onClick={() => setcurrentTab("history")}
            >
              History
            </div>
          </div>
        ) : (
          <div className="h-12 w-[300px] bg-gray-200 rounded animate-pulse"></div>
        )}
        {filteredModel && filteredModel.model_name ? (
          <div className="border rounded-[4px] cursor-pointer">
            <Image
              src="/more_vert_color.svg"
              alt="more"
              width={28}
              height={28}
              className="object-contain py-2"
            />
          </div>
        ) : (
          <div className="h-12 w-[100px] bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>
      {currentTab === "overview" && (
        <>
          {filteredModel && filteredModel.model_name ? (
            <>
              <ModelOverview />
              {filteredModel.task === "summarization" ? (
                <Summarization filteredModel={filteredModel} />
              ) : (
                <QuestionAnswering filteredModel={filteredModel} />
              )}
            </>
          ) : (
            <div className="flex flex-col gap-4">
              {" "}
              <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
              <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
            </div>
          )}
        </>
      )}

      {currentTab === "history" && (
        <>
          {filteredModel && filteredModel.model_name ? (
            <div className="flex justify-start items-start gap-12 mx-6 bg-white rounded-sm shadow h-80 p-4">
              <div
                className={`text-black  cursor-pointer font-semibold text-base flex`}
                onClick={() => setcurrentTab("overview")}
              >
                Deployment History
                <Image
                  src="/rocket_filled.svg"
                  alt="more"
                  width={17}
                  height={17}
                  className="object-contain ml-2"
                />
              </div>
              <div
                className={`text-[#464646] cursor-pointer ${
                  currentTab === "history"
                    ? "font-semibold text-base flex"
                    : "font-medium text-base"
                }`}
                onClick={() => setcurrentTab("history")}
              >
                Training History
                <Image
                  src="/bolt_filled.svg"
                  alt="more"
                  width={17}
                  height={17}
                  className="object-contain ml-2"
                />
              </div>
              <div
                className={`text-[#464646] cursor-pointer ${
                  currentTab === "history"
                    ? "font-semibold text-base flex"
                    : "font-medium text-base"
                }`}
                onClick={() => setcurrentTab("history")}
              >
                Request History{" "}
                <Image
                  src="/history.svg"
                  alt="more"
                  width={17}
                  height={17}
                  className="object-contain ml-2"
                />
              </div>
            </div>
          ) : (
            <div className="h-80 w-full bg-gray-200 rounded animate-pulse mx-6"></div>
          )}
        </>
      )}
    </>
  );
}

export default ModelMetrics;
