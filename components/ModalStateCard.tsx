"use client";
import React, { useState } from "react";
import { CustomButton, TrainModelPopup } from ".";
import { toast } from "react-toastify";

function ModalStateCard({ model }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const isTrained = model && model.status && model.status == "TRAINED";
  const isTraining = model && model.status && model.status == "TRAINING";
  const isDeploying = model && model.status && model.status == "DEPLOYING";
  const isDeployed = model && model.status && model.status == "DEPLOYED";

  const deployModelFunction = async () => {
    if (isDeployed) {
      toast.success("Model is Already Deployed!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (isDeploying) {
      toast.success("Deployment Already in Process!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        model_id: model.model_id,
        task: model.task,
        tier: "silver",
        sync: "false",
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/models/deploy?${queryParams}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const status = response.status;
      if (status == 200) {
        toast.success("Deployment in process!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      } else {
        throw new Error(`something went wrong`);
      }
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
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 bg-white pt-6 pb-2">
      <div className=" flex justify-between items-center">
        <div className="">
          {model && model.model_name ? (
            <h2 className="text-[22px] text-dark-blue font-bold capitalize">
              {model.model_name} Model Card
            </h2>
          ) : (
            <div className="h-8 w-[200px] bg-gray-200 rounded animate-pulse"></div>
          )}
        </div>
        {model && model.model_name ? (
          <div className="flex gap-4">
            {isTraining ? (
              <CustomButton
                title="Training in Progress..."
                containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
                textStyles="text-[15px] font-medium text-white"
                // rightIcon="/bolt_white.svg"
              />
            ) : (
              <CustomButton
                title="Train Model"
                containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
                textStyles="text-[15px] font-medium text-white"
                rightIcon="/bolt_white.svg"
                handleClick={() => setIsOpen(true)}
              />
            )}

            {!isDeploying ? (
              <CustomButton
                title="Deploy"
                containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[12px] gap-2 hover-blue"
                textStyles="text-[15px] font-medium text-white"
                leftIcon="/rocket.svg"
                rightIcon="/arrow_down.svg"
                isDisabled={loading || !isTrained}
                handleClick={() => deployModelFunction()}
              />
            ) : (
              <CustomButton
                title="Deploying"
                containerStyles="bg-dark-blue rounded-[4px] py-[4px] px-[12px] gap-2 hover-blue"
                textStyles="text-[15px] font-medium text-white"
                leftIcon="/rocket.svg"
                rightIcon="/arrow_down.svg"
                isDisabled={loading}
                handleClick={() => deployModelFunction()}
              />
            )}
          </div>
        ) : (
          <div className="h-12 w-[300px] bg-gray-200 rounded animate-pulse"></div>
        )}
      </div>
      {!!model ? (
        <div className="flex py-4">
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-normal text-xs text-[#666] border-r-2 border-[#C0C0C0] w-full pr-8">
              Model Type
            </h2>
            <p className="font-medium text-xs text-black pr-8 capitalize">
              {model.source}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-normal border-r-2 px-8 border-[#C0C0C0] text-xs text-[#666]">
              Status
            </h2>
            <p className="font-medium	px-8 text-xs text-black capitalize">
              {model.status ? model.status.toLowerCase() : "available"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-normal border-r-2 w-full text-center border-[#C0C0C0] text-xs text-[#666] px-8">
              Added-on
            </h2>
            <p className="font-medium text-xs text-black px-8">NA</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <h2 className="font-normal border-r-2 px-8  border-[#C0C0C0] text-xs text-[#666]">
              Tier
            </h2>
            <p className="font-medium	px-8 text-xs text-black capitalize">
              {model.tier ? model.tier : "NA"}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h2 className="font-normal text-xs text-[#666] px-6">Task</h2>
            <p className="font-medium text-xs text-black capitalize px-8">
              {model.task}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 rounded animate-pulse w-[600px] h-[60px]"></div>
      )}

      {isOpen && (
        <TrainModelPopup
          handleClose={handleClose}
          modelName={model.model_name}
          task={model.task}
        />
      )}
    </div>
  );
}

export default ModalStateCard;
