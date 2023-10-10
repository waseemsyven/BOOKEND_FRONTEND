"use client";
import React from "react";
import Image from "next/image";
import { CustomButton } from ".";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

function UndeployPopup({ handleClose, modelName, modelId }: any) {
  const { data: session } = useSession();
  const user: any = session?.user;

  const undeployFunction = async () => {
    try {
      const queryParams = new URLSearchParams({
        model_id: modelId,
      });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${user.domain}/models/undeploy?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      handleClose();
      toast.success("Model undeployed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(data);
    } catch (error) {
      toast.error("something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
      console.error("Error fetching data:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal w-[484px] h-[160px] rounded-[8px] flex justify-center flex-col items-center">
        {" "}
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        <div className="text-lg font-semibold text-text-secondary capitalize mb-6">
          Confirm Undeploy Model ({modelName})?
        </div>
        <div className="flex gap-4">
          <CustomButton
            title="Confirm"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-2 hover-blue w-[153px]"
            textStyles="text-[15px] font-medium text-white"
            handleClick={undeployFunction}
          />
          <CustomButton
            title="Cancel"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-2 hover-blue w-[153px]"
            textStyles="text-[15px] font-medium text-white"
            handleClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}

export default UndeployPopup;
