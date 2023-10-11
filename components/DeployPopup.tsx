"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import TierDropdown from "./TierDropdown";

function DeployPopup({
  handleClose,
  baseModel,
  modelName,
  datasetName,
  deployModelFunction,
}: any) {
  const [selectedTier, setselectedTier] = useState("");
  
  const isDisabled = !selectedTier;

  return (
    <div className="modal-overlay">
      <div className="modal w-[884px] h-[560px] rounded-[8px] flex justify-start flex-col items-center px-6 pb-4">
        {" "}
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <div className="w-full py-4 text-lg font-semibold text-text-secondary capitalize">
          Deploy Model ({modelName})
        </div>
        <div className="h-8 border py-4 my-2 border-[#E8E7E7] rounded-[8px] text-[13px] font-light w-full flex justify-center items-center">
          <Image
            src="/info_black.svg"
            alt="info"
            width={16}
            height={16}
            className="object-contain mr-2"
          />
          In order to Deploy a model, user needs to set a Tier
        </div>
        <div className="w-full h-[200px] grid grid-cols-2 gap-2 justify-items-center items-center">
          <div className="input-secondary-container">
            <h3>Model Name</h3>
            <input
              placeholder={`${modelName}`}
              className="input-secondary"
              disabled
            />
          </div>
          <div className="input-secondary-container">
            <h3>Base Model</h3>
            <input
              placeholder={`${baseModel}`}
              disabled
              className="input-secondary"
            />
          </div>
          <div className="input-secondary-container">
            <h3>Dataset Name</h3>
            <input
              placeholder={`${datasetName}`}
              disabled
              className="input-secondary"
            />
          </div>
          <div className="input-secondary-container">
            <h3 className="z-10">Tier</h3>
            <TierDropdown
              setselectedTier={setselectedTier}
              selectedTier={selectedTier}
            />
          </div>
        </div>
        <div className="justify-center flex py-4 w-full h-[230px] items-end">
          <CustomButton
            title="Deploy"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-2 hover-blue w-[153px]"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => deployModelFunction(selectedTier)}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default DeployPopup;
