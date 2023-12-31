"use client";

import {
  DomainDashboardHeader,
  DomainDashboardTable,
  DomainOverview,
} from "@/components";
import { useEffect, useState } from "react";

const Page = () => {
  const [modelList, setmodelList] = useState<any>([]);

  const getModelsList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/models/list`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          },
        }
      );
      const data = await response.json();

      const filteredModelList = data.filter(
        (model: any) => model.status !== "DELETED"
      );

      setmodelList(filteredModelList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getModelsList();
  }, []);

  return (
    <div className="bg-[#F7FAFB] h-full w-full rounded-bl-2xl overflow-y-scroll max-h-screen">
      <DomainDashboardHeader />
      <DomainOverview modelsList={modelList} />
      <div className="text-base font-medium mx-6 px-2 py-4 rounded-lg shadow-lg my-4 bg-white">
        {modelList.length > 0 ? (
          <h2 className="text-base font-medium px-4">
            Models ({modelList.length ? modelList.length : 0})
          </h2>
        ) : (
          <h2 className="text-base font-medium px-4 animate-pulse">
            Models ({modelList.length ? modelList.length : 0})
          </h2>
        )}

        {modelList.length > 0 ? (
          <DomainDashboardTable
            modelsList={modelList}
            getModelsList={getModelsList}
          />
        ) : (
          <div className="animate-pulse px-4 mt-4 space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
