"use client";
import { ModalStateCard } from "@/components";
import React, { useEffect, useState } from "react";
import ModelMetrics from "@/components/ModelMetrics";

function page({ params }: any) {
  const [modelList, setmodelList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
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
      <ModelMetrics filteredModel={filteredModel} />
    </div>
  );
}

export default page;
