import React from "react";
import Image from "next/image";

function DomainDashboardHeader() {
  return (
    <div className="h-[72px] px-6 flex justify-start items-center gap-2 bg-white">
      {" "}
      <Image
        src="/domain.svg"
        alt="domain logo"
        width={20}
        height={20}
        className="object-contain"
      />
      <h2 className="text-[22px] font-bold flex justify-center items-center">
        Dev Workspace{" "}
        <Image
          src="/arrow_dropdown.svg"
          alt="dropdown logo"
          width={24}
          height={24}
          className="object-contain"
        />
      </h2>
    </div>
  );
}

export default DomainDashboardHeader;
