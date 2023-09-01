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

const page = () => {
  const modelsList = [
    {
      base_model: "t5-base",
      dataset_name: "NA",
      model_id: "06793fd6-e176-442d-9776-8e97e3668661",
      model_name: "t5-base",
      source: "public",
      status: "available",
      task: "summarization",
      tier: "NA",
    },
    {
      base_model: "t5-base",
      dataset_name: "NA",
      model_id: "26e09843-91e7-4e6c-a205-af77b86f73c1",
      model_name: "t5-base",
      source: "public",
      status: "available",
      task: "question-answering",
      tier: "NA",
    },
    {
      base_model: "bart-base",
      dataset_name: "NA",
      model_id: "36007f06-0a69-487a-9325-33036d680b36",
      model_name: "bart-base",
      source: "public",
      status: "available",
      task: "summarization",
      tier: "NA",
    },
    {
      base_model: "t5-large",
      dataset_name: "NA",
      model_id: "93ba0dd8-8e53-4653-895d-b12f5f4c5567",
      model_name: "t5-large",
      source: "public",
      status: "available",
      task: "summarization",
      tier: "NA",
    },
    {
      base_model: "bert-large-uncased",
      dataset_name: "NA",
      model_id: "ccf63f4d-e87f-4b22-b7d4-ec02f6755829",
      model_name: "bert-large-uncased",
      source: "public",
      status: "available",
      task: "question-answering",
      tier: "NA",
    },
    {
      base_model: "t5-large",
      dataset_name: "NA",
      model_id: "d4d149c6-f4ac-4796-9e8c-1a5acc538328",
      model_name: "t5-large",
      source: "public",
      status: "available",
      task: "question-answering",
      tier: "NA",
    },
    {
      base_model: "bart-large",
      dataset_name: "NA",
      model_id: "d89e9185-5bae-44af-b1be-9a4026c6306c",
      model_name: "bart-large",
      source: "public",
      status: "available",
      task: "summarization",
      tier: "NA",
    },
    {
      base_model: "bert-base-uncased",
      dataset_name: "NA",
      model_id: "dfd4c338-a467-4293-a073-b9448fcd0f53",
      model_name: "bert-base-uncased",
      source: "public",
      status: "available",
      task: "question-answering",
      tier: "NA",
    },
  ];
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
      <div className="bg-[#F7FAFB] h-full w-full rounded-bl-2xl">
        <DomainDashboardHeader />
        <DomainOverview modelsList={modelsList} />
        <div className="text-base font-medium mx-6 px-2 py-4 rounded-lg shadow-lg my-4 bg-white">
          <h2 className="text-base font-medium px-4">
            Models ({modelsList.length})
          </h2>
          <DomainDashboardTable modelsList={modelsList} />
        </div>
      </div>
    );
  }
};

export default page;
