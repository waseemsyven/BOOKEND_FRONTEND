import React from "react";

function ModelOverview() {
  return (
    <div className="grid grid-cols-2 mx-6 my-4 gap-5">
      <div className="p-4 h-[250px] bg-white border rounded-lg border-grey flex justify-between">
        <h2 className=" text-base font-medium"> Response/Second</h2>
        <p className="tex-grey text-xs font-normal">Last 6 hr</p>
      </div>
      <div className="p-4 h-[250px] bg-white border rounded-lg border-grey flex justify-between">
        <h2 className=" text-base font-medium"> Predictions/Second</h2>
        <p className="tex-grey text-xs font-normal">Last 6 hr</p>
      </div>
      <div className="p-4 h-[250px] bg-white border rounded-lg border-grey flex justify-between">
        <h2 className=" text-base font-medium"> Request/Second</h2>
        <p className="tex-grey text-xs font-normal">Last 6 hr</p>
      </div>
      <div className="flex justify-between gap-4">
        {" "}
        <div className="p-4 h-[250px] bg-white border rounded-lg border-grey w-[60%]">
          <h2 className=" text-base font-medium"> Hardware Utilization</h2>
        </div>
        <div className="p-4 h-[250px] bg-white border rounded-lg border-grey flex justify-between w-[40%]">
          <h2 className="text-base font-medium">Model Latency</h2>
        </div>
      </div>
    </div>
  );
}

export default ModelOverview;
