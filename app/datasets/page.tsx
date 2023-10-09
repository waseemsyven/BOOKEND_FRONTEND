"use client";
import { DatasetUploader, DatasetsLogs, DatasetsTable } from "@/components";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatCountWithLeadingZeros } from "@/utils";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });
  const user: any = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [datasetsList, setdatasetsList] = useState<any>([]);
  const [currentTab, setcurrentTab] = useState("All Datasets");
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [datasetsLogs, setdatasetsLogs] = useState<any>();

  const getModelLogs = async () => {
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

  const getDataSetsList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/datasets/list`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${user.token}`,
          },
        }
      );
      const datasetsList = await response.json();
      setdatasetsList(datasetsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataSetsList();
  }, [user]);

  return (
    <div className="h-full w-full bg-[#F7FAFB] rounded-bl-2xl overflow-y-scroll max-h-screen">
      <div className="flex gap-4 p-6 pl-8 pt-10 bg-white">
        <h2 className="text-[22px] font-bold text-dark-blue">Datasets</h2>
        <div
          className="border bg-dark-blue text-white font-medium text-[14px] py-4 flex justify-center items-center rounded-[4px] h-[28px] px-2 gap-2 hover-blue"
          onClick={() => setIsOpen(true)}
        >
          <button>Upload New</button>
          <Image
            src="/upload.svg"
            alt="upload"
            width={20}
            height={20}
            className="object-contain py-4"
          />
        </div>
      </div>

      <div className="px-6">
        <div className="flex justify-start items-center gap-6">
          {datasetsList.length > 0 ? (
            <h2
              className={`text-[#666] text-base px-4 my-2 cursor-pointer ${
                currentTab == "All Datasets"
                  ? "text-black font-semibold"
                  : "font-medium"
              }`}
              onClick={() => setcurrentTab("All Datasets")}
            >
              All Datasets (
              {datasetsList.length
                ? formatCountWithLeadingZeros(datasetsList.length)
                : "00"}
              )
            </h2>
          ) : (
            <h2
              className="text-base font-semibold px-4 animate-pulse my-2"
              onClick={() => setcurrentTab("All Datasets")}
            >
              All Datasets ({datasetsList.length ? datasetsList.length : "0"})
            </h2>
          )}
          <div
            className={`text-[#666] cursor-pointer ${
              currentTab == "History"
                ? "font-semibold text-black"
                : "font-medium"
            }`}
            onClick={() => setcurrentTab("History")}
          >
            History
          </div>
        </div>
        {currentTab == "All Datasets" && (
          <div>
            {" "}
            {datasetsList.length > 0 ? (
              <DatasetsTable
                datasetsList={datasetsList}
                getDataSetsList={getDataSetsList}
              />
            ) : (
              <div className="animate-pulse px-4 mt-4 space-y-2">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            )}
          </div>
        )}

        {currentTab == "History" && (
          <DatasetsLogs datasetsLogs={datasetsLogs} />
        )}
      </div>

      {isOpen && (
        <DatasetUploader
          handleClose={handleClose}
          getDataSetsList={getDataSetsList}
        />
      )}
    </div>
  );
}

export default Page;
