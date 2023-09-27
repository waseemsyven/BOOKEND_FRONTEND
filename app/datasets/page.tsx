"use client";
import { DatasetUploader, DatasetsTable } from "@/components";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatCountWithLeadingZeros } from "@/utils";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [datasetsList, setdatasetsList] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const getDataSetsList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/syven-pdp/datasets/list`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
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
  }, []);

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
        {datasetsList.length > 0 ? (
          <h2 className="text-base font-semibold px-4 my-2">
            Datasets (
            {datasetsList.length
              ? formatCountWithLeadingZeros(datasetsList.length)
              : "00"}
            )
          </h2>
        ) : (
          <h2 className="text-base font-semibold px-4 animate-pulse my-2">
            Datasets ({datasetsList.length ? datasetsList.length : "0"})
          </h2>
        )}
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
