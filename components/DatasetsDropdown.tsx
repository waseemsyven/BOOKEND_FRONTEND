"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function DatasetsDropdown({
  setSelectedOption,
  selectedOption,
  task,
}: any) {
  const { data: session, status } = useSession();
  const user: any = session?.user;
  const [dataSetsList, setdataSetsList] = useState<any>([]);
  const getDataSets = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/datasets/list`,
      {
        method: "GET",
        headers: {
          Authorization: `basic ${user.token}`,
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
  }, [user]);

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
      <div className="dropdown-content w-full max-h-60 rounded-sm overflow-y-scroll">
        {dataSetsList &&
          filteredDataSets.map((item: any, index: any) => {
            return (
              <a
                onClick={() => handleOptionClick(item.dataset_name)}
                key={index}
              >
                {item?.dataset_name}
              </a>
            );
          })}
      </div>
    </div>
  );
}
