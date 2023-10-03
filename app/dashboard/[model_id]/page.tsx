"use client";
import { ModalStateCard } from "@/components";
import React, { useEffect, useState } from "react";
import ModelMetrics from "@/components/ModelMetrics";
import { useSession } from "next-auth/react";

function Page({ params }: any) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const { model_id } = params;
  const [modelList, setModelList] = useState<any>([]);

  const getModelsList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/models/list`,
        {
          method: "GET",
          headers: {
            Authorization: `basic ${user.token}`,
          },
        }
      );
      const data = await response.json();
      setModelList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getModelsList();
  }, [user]);

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

export default Page;
