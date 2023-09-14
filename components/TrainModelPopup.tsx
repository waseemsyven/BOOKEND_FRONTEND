"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CustomButton, DatasetsDropdown } from ".";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function TrainModelPopup({ handleClose, modelName, task }: any) {
  const router = useRouter();
  const [modelNameInputValue, setmodelNameInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = !modelNameInputValue || !selectedOption || loading;

  const trainModelFunction = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        model_name: modelNameInputValue,
        base_model: modelName,
        dataset_name: selectedOption,
        task: task,
        tier: "silver",
        sync: "false",
      });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/models/train?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      handleClose();
      toast.success("Training in Progress", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push(`/dashboard/${data.model_id}`);
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
      setLoading(false);
      handleClose();
    }
  };

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
          Train Model ({modelName})
        </div>
        <div className="h-8 border py-4 my-2 border-[#E8E7E7] rounded-[8px] text-[13px] font-light w-full flex justify-center items-center">
          <Image
            src="/info_black.svg"
            alt="info"
            width={16}
            height={16}
            className="object-contain mr-2"
          />
          In order to train a model, user need to set a name and then select
          dataset accordingly.
        </div>
        <div className="w-full flex justify-around items-center h-full">
          <div className="flex flex-col justify-center items-center gap-6 my-8">
            <div className="flex justify-center items-center">
              Step
              <Image
                src="/counter.svg"
                alt="info"
                width={16}
                height={16}
                className="object-contain ml-2"
              />
            </div>
            <input
              placeholder="Enter a Model name"
              className="input_primary"
              value={modelNameInputValue}
              onChange={(e) => setmodelNameInputValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-6 my-8">
            <div className="flex justify-center items-center">
              Step
              <Image
                src="/counter_two.svg"
                alt="info"
                width={16}
                height={16}
                className="object-contain ml-2"
              />
            </div>
            <DatasetsDropdown
              setSelectedOption={setSelectedOption}
              selectedOption={selectedOption}
              task={task}
            />
          </div>
        </div>
        <div className="justify-center flex py-4 w-full">
          <CustomButton
            title="Train Now"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-2 hover-blue w-[153px]"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => trainModelFunction()}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default TrainModelPopup;
