import React from "react";
import Image from "next/image";

function CarauselCard() {
  return (
    <div className="w-[380px] mx-auto p-4">
      <div className="flex flex-col items-center border rounded-[8px] p-4">
        <h2 className="text-primary text-base font-semibold pt-2 pb-4 w-full">
          Blogs /Articles
        </h2>{" "}
        <div className="border py-4 flex justify-center items-center w-full rounded-[8px] bg-white">
          <Image
            src="/placeholder.svg"
            alt="placeholder"
            width={88}
            height={88}
            className="py-2"
          />
        </div>
        <h2 className="text-xl font-medium text-grey py-2  w-full text-left">
          Explore Bookend.ai Models
        </h2>
        <p className="text-grey text-sm font-light w-full text-left">
          Explore implementing Generative AI for businesses. Learn enterprise
          applications, challenges, and benefits. Enhance innovation and
          decision-making processes.
        </p>
        {/* <button className="border px-4 py-2 my-4 rounded">
          Explore Models
        </button> */}
      </div>
    </div>
  );
}

export default CarauselCard;
