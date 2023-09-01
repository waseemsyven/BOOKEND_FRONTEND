import { CustomButton, DatasetsTable } from "@/components";
import React from "react";

function page() {
  const datasetsList = [
    {
      dataset_id: "33ccb33f-66f6-4e43-acb7-23d156bf7d5a",
      dataset_name: "squad",
      source: "public",
      task: "question-answering",
    },
    {
      dataset_id: "6a928ae2-fbf7-4d54-b8c3-4b654cbb02d3",
      dataset_name: "cnn_dailymail",
      source: "public",
      task: "summarization",
    },
    {
      dataset_id: "6b5536fc-41db-4259-98fd-f7a4fe9df33b",
      dataset_name: "xsum",
      source: "public",
      task: "summarization",
    },
    {
      dataset_id: "af958f0c-6f8d-4ec6-819f-99022f6b349f",
      dataset_name: "squad_v2",
      source: "public",
      task: "question-answering",
    },
  ];
  return (
    <div className="h-full w-full bg-[#F7FAFB] rounded-bl-2xl">
      <div className="flex gap-4 p-6 pl-8 pt-10 bg-white">
        <h2 className="text-[22px] font-bold text-dark-blue">Datasets</h2>
        <CustomButton
          title="Upload New"
          containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[8px] gap-2 hover-blue"
          textStyles="text-[14px] font-medium text-white"
          rightIcon="/upload.svg"
          // handleClick={() => setIsOpen(true)}
        />
      </div>
      <div className="px-6">
        <h2 className=" py-4 text-base font-semibold">
          All Datasets(0{datasetsList.length})
        </h2>
        <DatasetsTable datasetsList={datasetsList} />
      </div>
    </div>
  );
}

export default page;
