"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CustomButton } from ".";
import CreateDomainModal from "./CreateDomainModal";

function AddDomainCard() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex grow flex-col mx-auto p-4 px-6 ">
      <div className="flex flex-col items-center shadow rounded-[8px] p-4 bg-white">
        <h2 className="text-[#2D2E34] text-base font-medium pt-2 pb-4 w-full">
          Domains
        </h2>{" "}
        <Image
          src="/placeholder.svg"
          alt="placeholder"
          width={176}
          height={176}
          className="py-4"
        />
        <p className="text-dark-blue text-[18px] font-medium py-4 text-center">
          A domain must be created in order to train and<br></br> test the
          models
        </p>
        <CustomButton
          title="Create Domain"
          containerStyles="bg-dark-blue rounded-[8px] gap-2 hover-blue px-4 py-2"
          textStyles="text-[15px] font-medium text-white"
          rightIcon="/arrow_right.svg"
          handleClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && <CreateDomainModal handleClose={handleClose} />}
    </div>
  );
}

export default AddDomainCard;
