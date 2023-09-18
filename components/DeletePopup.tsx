"use client";
import React from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { CustomButton } from ".";

function DeletePopup({
  getModelsList,
  modelId,
  handleClose,
  modelName,
  type,
  getDataSetsList,
}: any) {
  const deleteDatasetFunction = async () => {
    try {
      const queryParams = new URLSearchParams({
        dataset_id: modelId,
      });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/datasets/delete?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      if (status == 200) {
        getDataSetsList();
        toast.success("Dataset deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleClose();
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    } finally {
      handleClose();
    }
  };

  const deleteFunction = async () => {
    handleClose();
    try {
      const queryParams = new URLSearchParams({
        model_id: modelId,
      });

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/models/delete?${queryParams}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BOOKEND_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const status = response.status;
      if (status == 200) {
        toast.success("Deleting the model. This may take a moment...", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getModelsList();
      } else {
        throw new Error(`something went wrong`);
      }
    } catch (error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal w-[428px] h-[200px] rounded-[8px] flex justify-center items-center flex-col gap-8">
        {" "}
        <Image
          src="/close.svg"
          alt="close"
          width={24}
          height={24}
          className="close hover-white"
          onClick={handleClose}
        />
        {type == "dataset" ? (
          <h2 className="text-lg text-bold">Delete Dataset ({modelName})?</h2>
        ) : (
          <h2 className="text-lg text-bold">
            Confirm Delete Model ({modelName}) ?
          </h2>
        )}
        <div className="flex justify-center items-center gap-6">
          {type == "dataset" ? (
            <CustomButton
              title="Confirm"
              containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
              textStyles="text-[15px] font-medium text-white"
              handleClick={() => deleteDatasetFunction()}
            />
          ) : (
            <CustomButton
              title="Confirm"
              containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
              textStyles="text-[15px] font-medium text-white"
              handleClick={() => deleteFunction()}
            />
          )}

          <CustomButton
            title="Cancel"
            containerStyles="bg-dark-blue rounded-[8px] py-[8px] px-6 gap-2 hover-blue"
            textStyles="text-[15px] font-medium text-white"
            handleClick={() => handleClose(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
