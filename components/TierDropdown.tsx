"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function TierDropdown({ setselectedTier, selectedTier }: any) {
  const [tierList, settierList] = useState(["bronze", "silver", "gold"]);

  const handleOptionClick = (option: any) => {
    console.log(option);
    setselectedTier(option);
  };

  return (
    <div className="dropdown">
      <button className="dropbtn flex justify-between items-center w-[350px] capitalize">
        {selectedTier || "Select Tier"}
        <Image
          src="/arrow_dropdown.svg"
          alt="logo_bookend"
          width={24}
          height={24}
          className="object-contain py-2"
        />
      </button>
      <div className="dropdown-content w-full max-h-60 rounded-sm overflow-y-scroll">
        {tierList &&
          tierList.map((item: any, index: any) => {
            return (
              <a
                onClick={() => handleOptionClick(item)}
                key={index}
                className="capitalize"
              >
                {item}
              </a>
            );
          })}
      </div>
    </div>
  );
}
