import {
  ModalStateCard,
  ModelDescription,
  ModelOverview,
  TestModel,
} from "@/components";
import React from "react";

function page({ params }: any) {
  const { model } = params;
  return (
    <div className="h-full w-full bg-fill">
      <ModalStateCard modelName={model} />
      <div className="flex justify-between items-center my-4">
        <div className="flex justify-start items-center gap-6 px-6">
          <div className="text-black text-lg font-semibold cursor-pointer">
            Overview
          </div>
          <div className="text-dark-blue text-lg font-semibold cursor-pointer">
            History
          </div>
        </div>
      </div>

      <ModelOverview />
      <ModelDescription />
      <TestModel />
      {/* <TrainModelPopup /> */}
    </div>
  );
}

export default page;
