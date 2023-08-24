"use client";

import { BarChart, CustomButton, DatasetDropdown } from "@/components";
import React, { useEffect, useState } from "react";

function page() {
  const [inputValue, setInputValue] = useState("");
  const [response, setresponse] = useState<any>();
  const [datasets, setdatasets] = useState();

  async function query(data: any) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/albert-base-v1",
      {
        headers: {
          Authorization: `Bearer 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`,
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  async function queryDatasets() {
    const response = await fetch(
      "https://datasets-server.huggingface.co/valid",
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result.viewer;
  }

  const getDataSets = () => {
    queryDatasets().then((response) => {
      setdatasets(response.slice(0, 300));
    });
  };

  useEffect(() => {
    getDataSets();
  }, []);

  const callModel = () => {
    query({ inputs: inputValue }).then((response) => {
      setresponse(response);
    });
  };

  return (
    <div className="h-screen bg-white flex flex-col justify-start items-center">
      <h2>albert-base-v1</h2>{" "}
      <h2 className="my-6 px-16">
        ALBERT is a transformers model pretrained on a large corpus of English
        data in a self-supervised fashion. This means it was pretrained on the
        raw texts only, with no humans labelling them in any way (which is why
        it can use lots of publicly available data) with an automatic process to
        generate inputs and labels from those texts. More precisely, it was
        pretrained with two objectives:
      </h2>
      <input
        placeholder="Enter text to get summary"
        className="input_primary mb-4"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex gap-8">
        <CustomButton
          title="Compute"
          containerStyles="bg-[#C0C0C0] rounded-[4px] py-[4px] px-4 hover-blue"
          textStyles="text-sm font-medium text-white"
          handleClick={callModel}
        />
        <DatasetDropdown datasets={datasets} />
      </div>
      <BarChart data={response} />
    </div>
  );
}

export default page;
