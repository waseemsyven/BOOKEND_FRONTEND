import React from "react";
import Image from "next/image";

function ModelOverview() {
  return (
    <div className="grid grid-cols-2 mx-6 my-4 gap-4">
      <div className="bg-white rounded-lg shadow flex justify-between items-start p-4 h-[200px] relative">
        <h2 className="text-[15px] font-medium flex items-center gap-2 blur-[2px]">
          {" "}
          Response/Second
          <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
        </h2>
        <p className="tex-[#808080] text-xs font-normal blur-[2px]">
          Last 6 hr
        </p>

        {true && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-center gap-2">
            {" "}
            <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
            <h2 className="text-[13px] font-light">
              Model Performance metrics will be available once it<br></br> will
              be deployed
            </h2>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow flex justify-between items-start p-4 h-[200px] relative">
        <h2 className="text-[15px] font-medium flex items-center gap-2 blur-[2px]">
          {" "}
          Predictions/Second
          <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
        </h2>
        <p className="tex-[#808080] text-xs font-normal blur-[2px]">
          Last 6 hr
        </p>
        {true && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-center gap-2">
            {" "}
            <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
            <h2 className="text-[13px] font-light">
              Model Performance metrics will be available once it<br></br> will
              be deployed
            </h2>
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow flex justify-between items-start p-4 h-[200px] relative">
        <h2 className="text-[15px] font-medium flex items-center gap-2 blur-[2px]">
          {" "}
          Request/Second
          <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
        </h2>
        <p className="tex-[#808080] text-xs font-normal blur-[2px]">
          Last 6 hr
        </p>
        {true && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-center gap-2">
            {" "}
            <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
            <h2 className="text-[13px] font-light">
              Model Performance metrics will be available once it<br></br> will
              be deployed
            </h2>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-4 h-[200px]">
        {" "}
        <div className="bg-white rounded-lg shadow flex justify-between items-start p-4 w-[60%] relative">
          <h2 className="text-[15px] font-medium blur-[2px]">
            {" "}
            Hardware Utilization
          </h2>
          {true && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-center gap-2">
              {" "}
              <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
              <h2 className="text-[13px] font-light">
                Model Performance metrics will <br></br>be available once it
                will be deployed
              </h2>
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow flex justify-between items-start p-4 w-[40%]  relative">
          <h2 className="text-[15px] font-medium blur-[2px]">Model Latency</h2>
          {true && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col text-center gap-2">
              {" "}
              <Image src="/info.svg" alt="arrow_left" width={16} height={16} />
              <h2 className="text-[13px] font-light">
                Model Performance <br></br>metrics will be available <br></br>
                once it will be deployed
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModelOverview;
