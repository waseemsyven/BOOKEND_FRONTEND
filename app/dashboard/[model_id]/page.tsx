"use client";
import {
  ModalStateCard,
  ModelOverview,
  QuestionAnswering,
  TrainModelPopup,
} from "@/components";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Summarization from "@/components/Summarization";

function page({ params }: any) {
  const [modelList, setmodelList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setcurrentTab] = useState("overview");
  const { model_id } = params;

  const getModelsList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/models/list`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setmodelList(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getModelsList();
  }, []);

  const filteredModel = modelList.find(
    (model: any) => model.model_id === model_id
  );

  return (
    <div className="h-full w-full bg-fill overflow-y-scroll max-h-screen">
      <ModalStateCard model={filteredModel} />
      <div className="flex justify-between items-center my-4 px-6">
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
        <div className="border rounded-[4px] cursor-pointer">
          <Image
            src="/more_vert.svg"
            alt="more"
            width={28}
            height={28}
            className="object-contain py-2"
          />
        </div>
      </div>
      {currentTab == "overview" && (
        <>
          <ModelOverview />
          {!filteredModel ? (
            <div className="w-full h-40 bg-gray-200 rounded animate-pulse mx-6"></div>
          ) : filteredModel.task === "summarization" ? (
            <Summarization />
          ) : (
            <QuestionAnswering />
          )}
        </>
      )}
      {currentTab == "history" && (
        <div className="flex justify-start items-start gap-12 mx-6 bg-white rounded-sm shadow-lg h-80 p-4 ">
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
              currentTab == "history"
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
              currentTab == "history"
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
      )}
    </div>
  );
}

export default page;
