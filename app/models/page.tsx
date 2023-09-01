import { CustomButton, ModelsTabWrapper } from "@/components";
import React, { useEffect } from "react";

function page() {
  // const headers = {
  //   Authorization: `basic cmFqZW5kcmEubmF5YWxAc3l2ZW4uY29tOjY0TlU5UDVtdDJ3`,
  // };

  // const getModels = async () => {
  //   const response = await fetch(
  //     "https://control-plane-gateway-44gp1iu3.uc.gateway.dev/syven-pdp/models/list",
  //     {
  //       method: "GET",
  //       headers: headers,
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };
  // getModels();

  return (
    <div className="h-full w-full bg-[#F7FAFB] rounded-bl-2xl">
      <div className="flex gap-4 p-6 pl-8 pt-10 bg-white border">
        <h2 className="text-[22px] font-bold text-dark-blue">Models</h2>
        <CustomButton
          title="Add"
          containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[8px] gap-2 hover-blue"
          textStyles="text-[14px] font-medium text-white"
          rightIcon="/plus.svg"
        />
      </div>
      <ModelsTabWrapper />
    </div>
  );
}

export default page;
