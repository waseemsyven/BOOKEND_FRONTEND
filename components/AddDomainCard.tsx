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
    <div className="flex grow flex-col mx-auto p-4">
      <div className="flex flex-col items-center border rounded-[8px] p-4">
        <h2 className="text-primary text-base font-semibold pt-2 pb-4 w-full">
          Domains
        </h2>{" "}
        <Image
          src="/placeholder.svg"
          alt="placeholder"
          width={120}
          height={120}
          className="py-4"
        />
        <p className="text-dark-blue text-[22px] font-light py-4 text-center">
          A domain must be created in order to train and<br></br> test the
          models
        </p>
        <CustomButton
          title="Add Domain +"
          containerStyles="bg-[#8080800D] rounded-[8px] py-[11px] px-8 border border-grey hover-white"
          textStyles="text-[15px] font-medium text-dark-blue"
          handleClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && <CreateDomainModal handleClose={handleClose} />}
    </div>
  );
}

export default AddDomainCard;
