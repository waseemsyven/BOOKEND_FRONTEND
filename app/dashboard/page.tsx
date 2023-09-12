"use client";

import {
  CarauselCard,
  DomainDashboardHeader,
  DomainDashboardTable,
  DomainOverview,
  HeroCard,
  Navbar,
} from "@/components";
import AddDomainCard from "@/components/AddDomainCard";
import { useEffect, useState } from "react";

const page = () => {
  const [modelList, setmodelList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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

  if (false) {
    return (
      <div className="h-full w-full bg-white rounded-bl-2xl">
        <Navbar />
        <HeroCard />
        <div className="flex items-stretch">
          <AddDomainCard />
          <CarauselCard />
        </div>
      </div>
    );
  } else {
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
            <DomainDashboardTable modelsList={modelList} />
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
  }
};

export default page;
