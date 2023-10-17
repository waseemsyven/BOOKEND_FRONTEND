"use client";
import React, { useState } from "react";
import Image from "next/image";
function TaskDropdown({ setselectedTask, selectedTask }: any) {
  const [tierList, settierList] = useState([
    "Summarization",
    "Question Answering",
  ]);

  const handleOptionClick = (option: any) => {
    setselectedTask(option);
  };

  /* <button className="dropbtn flex justify-between items-center w-[150px] capitalize">
        {selectedTask || "Select Tier"}
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
      </div> */

  return (
    <div className="dropdown input-secondary-container mb-6 cursor-pointer">
      <h3>Dataset Task</h3>
      <input
        type="text"
        className="input-secondary max-w-[238px]"
        placeholder="Select Task"
        value={selectedTask || "Select Task"}
      ></input>
      <Image
        src="/arrow_dropdown.svg"
        alt="logo_bookend"
        width={24}
        height={24}
        className="object-contain absolute top-[35%] right-2"
      />
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

export default TaskDropdown;
