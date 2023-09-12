"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

export default function DatasetsDropdown({
  setSelectedOption,
  selectedOption,
  task,
}: any) {
  const [dataSetsList, setdataSetsList] = useState<any>([]);
  const getDataSets = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/datasets/list`,
      {
        method: "GET",
        headers: {
          Authorization: `basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    setdataSetsList(data);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
  };

  const filteredDataSets = dataSetsList.filter((item: any) => {
    return item.task === task;
  });

  useEffect(() => {
    getDataSets();
  }, []);
  console.log(filteredDataSets);
  return (
    <div className="dropdown">
      <button className="dropbtn flex justify-between items-center w-[350px]">
        {selectedOption || "Click here to see the available dataset"}
        <Image
          src="/arrow_dropdown.svg"
          alt="logo_bookend"
          width={24}
          height={24}
          className="object-contain py-2"
        />
      </button>
      <div className="dropdown-content w-full h-60 rounded-sm overflow-y-scroll">
        {dataSetsList &&
          filteredDataSets.map((item: any) => {
            return (
              <a onClick={() => handleOptionClick(item.dataset_name)}>
                {item?.dataset_name}
              </a>
            );
          })}
      </div>
    </div>
  );
}
